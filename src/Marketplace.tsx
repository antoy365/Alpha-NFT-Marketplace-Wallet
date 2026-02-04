import { MyNFTs } from "./components/MyNFTs";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains"; // Убедитесь, что сеть совпадает с вашим контрактом
import { useReadContract } from "thirdweb/react";
import { getNFTs } from "thirdweb/extensions/erc1155";
import { client } from "./client";
import { LoginButton } from "./components/LoginButton";
import { NFTCard } from "./components/NFTCard";

// 1. Настройка контракта
const contract = getContract({
  client,
  chain: sepolia, 
  address: "0x8c70A206A5595f7d82B70F552D53BD65463D5891", // Вставьте сюда адрес своего контракта
});

export default function Marketplace() {
  // 2. Получение списка всех заминченных NFT
  const { data: nfts, isLoading, error } = useReadContract(getNFTs, { 
    contract: contract 
  });

  // Если произошла ошибка при чтении контракта
  if (error) return <div style={{ color: "red", padding: "50px" }}>Ошибка: {error.message}</div>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10"> 
      <div className="max-w-7xl mx-auto">
        
        {/* Шапка */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              Alpha Store
            </h1>
            <p className="text-zinc-500 text-sm">Digital Collectibles & Rare Assets</p>
          </div>
          <LoginButton />
        </header>

        {/* Сетка товаров */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {nfts?.map((nft) => (
              <NFTCard key={nft.id.toString()} nft={nft} contract={contract} />
            ))}
          </div>
        )}

          <div className="mt-20 pt-10 border-t border-zinc-900">
             <MyNFTs contract={contract} />
            </div>
      </div>
    </div>
  );
}

