import { ConnectButton } from "thirdweb/react";
import { client } from "../client"; 
import { polygon, sepolia } from "thirdweb/chains"; // ИЗМЕНЕНО: Импортируем обе сети
// Импортируем функции кошельков
import { createWallet, walletConnect } from "thirdweb/wallets";

// Конфигурируем поддерживаемые кошельки
const wallets = [
  createWallet("io.metamask"), // MetaMask (автоматически определит: расширение или мобильное приложение)
  createWallet("com.trustwallet.app"), // Trust Wallet
  walletConnect(), // Универсальный QR-код для всех мобильных кошельков
];

export const LoginButton = () => {
  return (
    <ConnectButton
      client={client}
      // ИЗМЕНЕНО: Вместо chain={polygon} указываем массив поддерживаемых сетей
      chains={[polygon, sepolia]} 
      theme={"dark"}
      wallets={wallets} 
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

