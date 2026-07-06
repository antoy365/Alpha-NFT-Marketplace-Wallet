import { useState, useEffect } from "react";
import { MyNFTs } from "./components/MyNFTs";
import { getContract, defineChain } from "thirdweb"; // ДОБАВИЛИ defineChain
import { polygon, sepolia, abstractTestnet } from "thirdweb/chains"; 
import { useReadContract, useSwitchActiveWalletChain, useActiveAccount } from "thirdweb/react"; 
import { getNFTs } from "thirdweb/extensions/erc1155";
import { client } from "./client";
import { LoginButton } from "./components/LoginButton";
import { NFTCard } from "./components/NFTCard";

export default function Marketplace() {
  const account = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const [copied, setCopied] = useState(false);

  // 1. Главные вкладки магазина
  const [activeTab, setActiveTab] = useState<"main_store" | "abstract_store">("main_store");

  // 2. Стейт для внутренних страниц Abstract (Часть 1, 2 или 3)
  const [abstractPage, setAbstractPage] = useState<1 | 2 | 3>(1);
  const ITEMS_PER_PAGE = 170; // Делим 510 NFT на 3 ровные части по 170 шт.

  // Состояние подсети для главного магазина (Polygon/Sepolia)
  const [selectedNetwork, setSelectedNetwork] = useState<"polygon" | "sepolia">(
    () => (localStorage.getItem("alpha_store_network") as "polygon" | "sepolia") || "polygon"
  );

  const isAbstract = activeTab === "abstract_store";
  
  const baseChain = isAbstract 
    ? abstractTestnet 
    : (selectedNetwork === "polygon" ? polygon : sepolia);

  // ИСПРАВЛЕНО НАВСЕГДА: Больше никакой ручной склейки строк, опечаток с регистрами букв и знаками $.
  // Функция defineChain сама соберет правильный приватный RPC-шлюз через ваш clientId.
  // Это полностью уберет CORS блокировки и на localhost, и на Vercel!
  const currentChain = defineChain(baseChain.id);

  const contractAddress = isAbstract
    ? "0x1d23f41509eCDf9B0e4537564833E07deAEE2805" 
    : "0x8c70A206A5595f7d82B70F552D53BD65463D5891"; 

  const contract = getContract({
    client,
    chain: currentChain, 
    address: contractAddress,
  });

  // 3. Динамический расчет диапазона токенов для блокчейна
  const startId = isAbstract ? (abstractPage - 1) * ITEMS_PER_PAGE : 0;
  const totalNftsToFetch = isAbstract ? ITEMS_PER_PAGE : 114;

  const { data: nfts, isLoading } = useReadContract(getNFTs, { 
    contract: contract,
    start: BigInt(startId) as any, // Указываем блокчейну точку старта
    count: BigInt(totalNftsToFetch) as any, // Запрашиваем выбранную пачку
  });

  const handleCopyContract = () => {
    navigator.clipboard.writeText(contractAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleNetworkChange = async (network: "polygon" | "sepolia") => {
    setSelectedNetwork(network);
    localStorage.setItem("alpha_store_network", network);
    if (!account) return;

    const targetChainId = network === "polygon" ? 137 : 11155111;

    try {
      // ИСПРАВЛЕНО: Безопасное переключение сети в кошельке через defineChain
      await switchChain(defineChain(targetChainId));
    } catch (e) {
      console.error("The wallet rejected the network switch.:", e);
    }
  };

  useEffect(() => {
    if (!account) return;

    // ИСПРАВЛЕНО: Синк сетей через автоматический метод defineChain
    if (activeTab === "abstract_store") {
      switchChain(defineChain(11124)).catch((e) => console.error("Error switching to Abstract:", e));
    } else {
      if (selectedNetwork === "polygon") {
        switchChain(defineChain(137)).catch((e) => console.error("Error switching to Polygon:", e));
      } else {
        switchChain(defineChain(11155111)).catch((e) => console.error("Error switching to Sepolia:", e));
      }
    }
  }, [activeTab, selectedNetwork, account, switchChain]);

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
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-1 text-xs font-mono font-medium rounded border bg-zinc-900 border-zinc-800 text-zinc-400"
            >
              <span>{copied ? "✓ copied!" : "address-contract"}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-zinc-500 uppercase tracking-wider font-bold">store chain:</label>
              {isAbstract ? (
                <div className="bg-zinc-950 text-emerald-400 border border-purple-900/40 rounded px-3 py-2 text-sm font-medium font-mono">
                  🤖 Abstract Testnet
                </div>
              ) : (
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

        {/* ИНТЕРФЕЙС ПОДВКЛАДОК */}
        {isAbstract && (
          <div className="flex flex-wrap items-center gap-2 mb-6 bg-zinc-950 p-1.5 rounded-lg border border-zinc-900 w-fit">
            <span className="text-xs text-zinc-500 uppercase px-2 font-bold font-mono tracking-wider">Collection:</span>
            <button onClick={() => setAbstractPage(1)} className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-200 ${abstractPage === 1 ? "bg-purple-950/60 text-purple-400" : "text-zinc-500"}`}>Part 1 (NFT 1-170)</button>
            <button onClick={() => setAbstractPage(2)} className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-200 ${abstractPage === 2 ? "bg-purple-950/60 text-purple-400" : "text-zinc-500"}`}>Part 2 (NFT 171-340)</button>
            <button onClick={() => setAbstractPage(3)} className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-200 ${abstractPage === 3 ? "bg-purple-950/60 text-purple-400" : "text-zinc-500"}`}>Part 3 (NFT 341-510)</button>
          </div>
        )}

        {/* Сетка NFT */}
        {isLoading ? (
          <div className="text-center py-20 text-zinc-500">Loading blockchain assets...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nfts?.map((nft: any) => (
              <NFTCard key={nft.id.toString()} nft={nft} contract={contract} />
            ))}
          </div>
        )}

        {/* Блок купленных NFT */}
        <MyNFTs contract={contract} />

      </div>
    </div>
  );
}

