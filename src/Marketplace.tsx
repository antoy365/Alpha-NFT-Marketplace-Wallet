import { useState } from "react";
import { MyNFTs } from "./components/MyNFTs";
import { getContract } from "thirdweb";
import { polygon, sepolia } from "thirdweb/chains"; // 1. Импортируем обе сети
import { useReadContract } from "thirdweb/react";
import { getNFTs } from "thirdweb/extensions/erc1155";
import { client } from "./client";
import { LoginButton } from "./components/LoginButton";
import { NFTCard } from "./components/NFTCard";

export default function Marketplace() {
  // 2. Создаем состояние для выбора сети. По умолчанию — polygon
  const [selectedNetwork, setSelectedNetwork] = useState<"polygon" | "sepolia">("polygon");

  // 3. Динамически определяем объект сети и создаем контракт внутри компонента
  const currentChain = selectedNetwork === "polygon" ? polygon : sepolia;

  const contract = getContract({
    client,
    chain: currentChain, // Сеть меняется на лету!
    address: "0x8c70A206A5595f7d82B70F552D53BD65463D5891", // Ваш кросс-чейн адрес
  });

  // 4. Получение списка NFT для выбранной сети (перезапустится автоматически при смене сети)
  const { data: nfts, isLoading, error } = useReadContract(getNFTs, { 
    contract: contract 
  });

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

          {/* Блок управления сетями и логином */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            
            {/* Наш переключатель сети, оформленный под ваш темный стиль */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-zinc-500 uppercase tracking-wider font-bold">store chain:</label>
              <select 
                value={selectedNetwork} 
                onChange={(e) => setSelectedNetwork(e.target.value as "polygon" | "sepolia")}
                className="bg-zinc-950 text-white border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-zinc-500 cursor-pointer font-medium"
              >
                <option value="polygon">🟣 Polygon Mainnet</option>
                <option value="sepolia">🟡 Sepolia Testnet</option>
              </select>
            </div>

            <LoginButton />
          </div>
        </header>

        {/* Сетка товаров */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {nfts?.map((nft) => (
              /* Передаем динамический контракт внутрь карточки */
              <NFTCard key={nft.id.toString()} nft={nft} contract={contract} />
            ))}
          </div>
        )}

        <div className="mt-20 pt-10 border-t border-zinc-900">
          {/* Мои NFT тоже будут обновляться в зависимости от выбранной сети */}
          <MyNFTs contract={contract} />
        </div>
      </div>
    </div>
  );
}

