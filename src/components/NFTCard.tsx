import { TransactionButton, MediaRenderer, useActiveAccount } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc1155";
import { client } from "../client";
import { type NFT } from "thirdweb";
import { useChainMetadata } from "thirdweb/react";
import { useReadContract } from "thirdweb/react";
import { getActiveClaimCondition } from "thirdweb/extensions/erc1155";
import { toEther } from "thirdweb/utils";


interface Props {
  nft: NFT;
  contract: any;
}

export const NFTCard = ({ nft, contract }: Props) => {
  const account = useActiveAccount();

  // Получаем актуальную цену из контракта
  const { data: claimCondition } = useReadContract(getActiveClaimCondition, {
    contract,
    tokenId: nft.id,
  });

  return (
    <div className="flex flex-col bg-zinc-900 border border-zinc-800 rounded-3xl p-5 hover:border-zinc-700 hover:scale-[1.02] transition-all duration-300 shadow-2xl group">
      
      {/* Контейнер для изображения */}
      <div className="relative aspect-square rounded-2xl overflow-hidden mb-5">
        <MediaRenderer 
          client={client} 
          src={nft.metadata.image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      
      {/* Информация об NFT */}
      <div className="flex flex-col gap-1 mb-6">
        <h3 className="text-xl font-bold tracking-tight text-white truncate">
          {nft.metadata.name}
        </h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-zinc-500 text-sm font-medium">Price</span>
          <span className="text-emerald-400 font-bold text-lg">
            {claimCondition ? `${toEther(claimCondition.pricePerToken)} ETH Sepolia` : "Загрузка..."}
          </span>
        </div>
      </div>
      
      {/* Кнопка покупки */}
      <TransactionButton
        className="!w-full !rounded-xl !py-3 !font-bold !text-sm !transition-all !border-none 
                   !bg-white !text-black hover:!bg-zinc-200 disabled:!bg-zinc-800 disabled:!text-zinc-500"
        transaction={() => claimTo({
          contract,
          to: account?.address as string,
          tokenId: nft.id,
          quantity: 1n,
        })}
        onTransactionConfirmed={() => alert("Successfully purchased!")}
      >
        {account ? "Buy now" : "Need a wallet"}
      </TransactionButton>
    </div>
  );
};
