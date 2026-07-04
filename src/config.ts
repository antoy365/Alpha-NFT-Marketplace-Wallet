// src/config.ts
export interface NFTItem {
  id: number;
  name: string;
  image: string;
}

// Ваш один кросс-чейн адрес контракта
export const COMP_CONTRACT_ADDRESS = "0x8c70A206A5595f7d82B70F552D53BD65463D5891"; 

const IMAGES_FOLDER_CID = "QmWdQT7qN3RFc9Kb99kaEoa77iMZFChv4rtYtr47ap6veK";
const TOTAL_NFTS = 114;

export const NFT_COLLECTION: NFTItem[] = Array.from({ length: TOTAL_NFTS }, (_, index): NFTItem => ({
  id: index,
  name: `NFT #${index}`,
  image: `ipfs://${IMAGES_FOLDER_CID}/${index}.png`
}));
