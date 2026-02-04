import { useActiveAccount, useReadContract, MediaRenderer } from "thirdweb/react";
import { getOwnedNFTs } from "thirdweb/extensions/erc1155";
import { client } from "../client";

export const MyNFTs = ({ contract }: { contract: any }) => {
  const account = useActiveAccount();

  // Хук для получения NFT, которыми владеет текущий адрес
  const { data: ownedNFTs, isLoading } = useReadContract(getOwnedNFTs, {
    contract: contract,
    address: account?.address || "",
  });

  if (!account) return (
    <div className="text-center p-10 border border-dashed border-zinc-800 rounded-2xl">
      <p className="text-zinc-500">Connect your wallet to see your NFT</p>
    </div>
  );

  if (isLoading) return <div className="text-center p-10 text-zinc-500">Загрузка ваших активов...</div>;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-purple-400">Your collection</h2>
      
      {ownedNFTs && ownedNFTs.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {ownedNFTs.map((nft) => (
            <div key={nft.id.toString()} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
              <MediaRenderer client={client} src={nft.metadata.image} className="rounded-lg mb-2" />
              <p className="text-xs font-bold truncate">{nft.metadata.name}</p>
              <p className="text-[10px] text-zinc-500">Quantity: {nft.quantityOwned.toString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-600 italic">You don't have any purchased ones yet NFT.</p>
      )}
    </div>
  );
};
