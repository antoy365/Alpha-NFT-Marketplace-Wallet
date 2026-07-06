import { useEffect } from "react";
import { useReadContract } from "thirdweb/react";
import { getNFTs } from "thirdweb/extensions/erc1155"; // Используем erc1155, так как у вас этот стандарт

// Функция, которая принудительно скачивает картинку в кэш ОЗУ браузера
const preloadImageInBrowser = (url: string) => {
  if (!url) return;
  const img = new Image();
  
  // ИСПРАВЛЕНО: Конвертируем ipfs:// в шлюз Cloudflare, чтобы обойти блокировку ORB/CORS браузера на Vercel
  if (url.startsWith("ipfs://")) {
    const cleanPath = url.replace("ipfs://", "");
    img.src = `https://cloudflare-ipfs.com{cleanPath}`;
  } else {
    img.src = url;
  }
};

export function useNftPrefetch(contractSepolia: any, contractAbstract: any) {
  // 1. ИСПРАВЛЕНО: Передаем 0n и 114n как BigInt, чтобы хук v5 успешно прочитал блокчейн Polygon/Sepolia
  // Выставили count: 114n, чтобы кэш совпал с витриной магазина
  const { data: nftsSepolia } = useReadContract(getNFTs, {
    contract: contractSepolia,
    start: BigInt(0) as any,
    count: BigInt(114) as any,
  });

  // 2. ИСПРАВЛЕНО: Передаем 0n и 170n как BigInt для пагинации Abstract (Part 1)
  const { data: nftsAbstract } = useReadContract(getNFTs, {
    contract: contractAbstract,
    start: BigInt(0) as any,
    count: BigInt(170) as any,
  });

  // 3. Запускаем фоновое скачивание картинок в кэш, как только пришли метаданные
  useEffect(() => {
    if (nftsSepolia) {
      nftsSepolia.forEach((nft) => {
        if (nft.metadata?.image) preloadImageInBrowser(nft.metadata.image);
      });
    }
  }, [nftsSepolia]);

  useEffect(() => {
    if (nftsAbstract) {
      nftsAbstract.forEach((nft) => {
        if (nft.metadata?.image) preloadImageInBrowser(nft.metadata.image);
      });
    }
  }, [nftsAbstract]);
}
