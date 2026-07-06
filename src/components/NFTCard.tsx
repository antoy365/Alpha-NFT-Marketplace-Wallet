import { TransactionButton, MediaRenderer, useActiveAccount } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc1155";
import { client } from "../client";
import { type NFT } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { getActiveClaimCondition } from "thirdweb/extensions/erc1155";
import { toEther } from "thirdweb/utils";

interface Props {
  nft: NFT;
  contract: any; 
}

export const NFTCard = ({ nft, contract }: Props) => {
  const account = useActiveAccount();
  const chainId = contract.chain?.id;

  const isPolygon = chainId === 137;
  const isSepolia = chainId === 11155111;
  const isAbstract = chainId === 11124; 

  let currencyName = "ETH";
  let networkName = "Unknown Network";

  if (isPolygon) {
    currencyName = "POL";
    networkName = "Polygon";
  } else if (isSepolia) {
    currencyName = "Sepolia ETH";
    networkName = "Sepolia";
  } else if (isAbstract) {
    currencyName = "ETH";
    networkName = "Abstract Testnet";
  }

  const { data: claimCondition } = useReadContract(getActiveClaimCondition, {
    contract,
    tokenId: nft.id as any,
  });

  return (
    <div className="flex flex-col bg-zinc-900 border border-zinc-800 rounded-3xl p-5 hover:border-zinc-700 hover:scale-[1.02] transition-all duration-300 shadow-2xl group">
      <div className="relative aspect-square rounded-2xl overflow-hidden mb-5">
        <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md text-zinc-300 text-xs font-mono font-bold px-2 py-0.5 rounded-md z-10 border border-zinc-800/40">
          #{nft.id.toString()}
        </div>

        {/* Снова используем стандартный MediaRenderer от Thirdweb */}
        <MediaRenderer 
          client={client} 
          src={nft.metadata.image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      
      <div className="flex flex-col gap-1 mb-6">
        <h3 className="text-xl font-bold tracking-tight text-white truncate">{nft.metadata.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-zinc-500 text-sm">Price</span>
          <span className="text-emerald-400 font-bold text-lg">
            {claimCondition 
              ? `${toEther(claimCondition.pricePerToken)} ${currencyName}` 
              : "Loading..."}
          </span>
        </div>
      </div>
      
      <TransactionButton
        className="!w-full !rounded-xl !py-3 !font-bold !text-sm !bg-white !text-black hover:!bg-zinc-200"
        transaction={() => claimTo({
          contract,
          to: account?.address as string,
          tokenId: nft.id,
          quantity: 1n,
        })}
        onTransactionConfirmed={() => alert(`Successfully purchased on ${networkName}!`)}
      >
        {account ? "Buy now" : "Need a wallet"}
      </TransactionButton>
    </div>
  );
};

