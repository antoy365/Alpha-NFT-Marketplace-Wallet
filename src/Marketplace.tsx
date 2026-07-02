import { useState, useEffect } from "react";
import { MyNFTs } from "./components/MyNFTs";
import { getContract } from "thirdweb";
import { polygon, sepolia, abstractTestnet } from "thirdweb/chains"; // Добавили abstractTestnet
import { useReadContract, useSwitchActiveWalletChain, useActiveAccount } from "thirdweb/react"; 
import { getNFTs } from "thirdweb/extensions/erc1155";
import { client } from "./client";
import { LoginButton } from "./components/LoginButton";
import { NFTCard } from "./components/NFTCard";

export default function Marketplace() {
  const account = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const [copied, setCopied] = useState(false);

  // 1. Добавляем стейт для переключения между основным магазином и Abstract
  const [activeTab, setActiveTab] = useState<"main_store" | "abstract_store">("main_store");

  // Состояние подсети для главного магазина (Polygon/Sepolia)
  const [selectedNetwork, setSelectedNetwork] = useState<"polygon" | "sepolia">(
    () => (localStorage.getItem("alpha_store_network") as "polygon" | "sepolia") || "polygon"
  );

  // 2. Динамически определяем СЕТЬ и АДРЕС контракта в зависимости от вкладки
  const isAbstract = activeTab === "abstract_store";
  
  const currentChain = isAbstract 
    ? abstractTestnet 
    : (selectedNetwork === "polygon" ? polygon : sepolia);

  const contractAddress = isAbstract
    ? "0x1d23f41509eCDf9B0e4537564833E07deAEE2805" // Ваш контракт для Abstract Testnet
    : "0x8c70A206A5595f7d82B70F552D53BD65463D5891"; // Ваш текущий контракт для Polygon/Sepolia

  // Инициализируем контракт нужной сети
  const contract = getContract({
    client,
    chain: currentChain, 
    address: contractAddress, 
  });

  const { data: nfts, isLoading, error } = useReadContract(getNFTs, { 
    contract: contract 
  });

  const handleCopyContract = () => {
    navigator.clipboard.writeText(contractAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Переключение сетей для главного магазина
  const handleNetworkChange = async (network: "polygon" | "sepolia") => {
    setSelectedNetwork(network);
    localStorage.setItem("alpha_store_network", network);
    if (!account) return;

    try {
      if (network === "polygon") {
        await switchChain(polygon);
      } else {
        await switchChain(sepolia);
      }
    } catch (e) {
      console.error("Кошелек отклонил переключение сети:", e);
    }
  };

  // 3. Автоматическое переключение сети кошелька при смене вкладки
  useEffect(() => {
    if (!account) return;

    if (activeTab === "abstract_store") {
      switchChain(abstractTestnet).catch((e) => console.error("Ошибка переключения на Abstract:", e));
    } else {
      // Возвращаем сеть, которая выбрана в селекте главного магазина
      if (selectedNetwork === "polygon") {
        switchChain(polygon).catch((e) => console.error("Ошибка переключения на Polygon:", e));
      } else {
        switchChain(sepolia).catch((e) => console.error("Ошибка переключения на Sepolia:", e));
      }
    }
  }, [activeTab, selectedNetwork, account, switchChain]);

  if (error) return <div style={{ color: "red", padding: "50px" }}>Ошибка блокчейна: {error.message}</div>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10"> 
      <div className="max-w-7xl mx-auto">
        
        {/* Панель переключения страниц (Вкладки) */}
        <div className="flex gap-2 mb-8 bg-zinc-950 p-1 rounded border border-zinc-900 w-full sm:w-fit">
          <button
            onClick={() => setActiveTab("main_store")}
            className={`px-4 py-2 text-sm font-medium rounded transition-all duration-200 ${
              activeTab === "main_store" 
                ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/50" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Polygon/Sepolia
          </button>
          <button
            onClick={() => setActiveTab("abstract_store")}
            className={`px-4 py-2 text-sm font-medium rounded transition-all duration-200 ${
              activeTab === "abstract_store" 
                ? "bg-purple-950/40 text-purple-400 border border-purple-900/50" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Abstract Testnet
          </button>
        </div>

        {/* Шапка */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-zinc-800 pb-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <h1 className={`text-4xl font-black tracking-tighter uppercase leading-none transition-colors ${
              isAbstract ? "text-emerald-400" : "text-white"
            }`}>
              {isAbstract ? "Abstract Zone" : "Alpha Store"}
            </h1>
            <p className="text-zinc-500 text-sm">
              {isAbstract ? "Exclusive Abstract Testnet Collection" : "Digital Collectibles & Rare Assets"}
            </p>
            
            <button
              onClick={handleCopyContract}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-1 text-xs font-mono font-medium rounded border transition-all duration-200
                ${copied 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                }`}
            >
              <span>{copied ? "✓ copied!" : "address-contract"}</span>
              {!copied && (
                <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            
            {/* Динамическое управление выбором сети в шапке */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-zinc-500 uppercase tracking-wider font-bold">store chain:</label>
              {isAbstract ? (
                // Если выбрана вкладка Abstract, скрываем селект и показываем статичный статус сети
                <div className="bg-zinc-950 text-emerald-400 border border-purple-900/40 rounded px-3 py-2 text-sm font-medium font-mono">
                  🤖 Abstract Testnet
                </div>
              ) : (
                // Если обычная вкладка — показываем ваш привычный селект сетей
                <select 
                  value={selectedNetwork} 
                  onChange={(e) => handleNetworkChange(e.target.value as "polygon" | "sepolia")}
                  className="bg-zinc-950 text-white border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-zinc-500 cursor-pointer font-medium"
                >
                  <option value="polygon">🟣 Polygon Mainnet</option>
                  <option value="sepolia">🟡 Sepolia Testnet</option>
                </select>
              )}
            </div>

            <LoginButton />
          </div>
        </header>

        {/* Сетка товаров (будет автоматически реактивно обновляться) */}
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

