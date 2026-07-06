import { ConnectButton } from "thirdweb/react";
import { client } from "../client"; 
import { polygon, sepolia } from "thirdweb/chains";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";

// Конфигурируем поддерживаемые кошельки
const wallets = [
  createWallet("io.metamask"), // MetaMask (автоматически определит: расширение или мобильное приложение)
  createWallet("com.trustwallet.app"), // Trust Wallet
  walletConnect(), // Универсальный QR-код для всех мобильных кошельков
  inAppWallet({
    auth: {
      options: ["google", "email", "apple"],
    },
  }),
];

export const LoginButton = () => {
  return (
    <ConnectButton
      client={client}
      // ИЗМЕНЕНО: Вместо chain={polygon} указываем массив поддерживаемых сетей
      chains={[polygon, sepolia]} 
      theme={"dark"}
      wallets={wallets}
      locale="en_US" 
      connectButton={{
        label: "Enter the store",
      }}
      connectModal={{
        size: "compact", 
        title: "Select a wallet",
      }}
    />
  );
};

