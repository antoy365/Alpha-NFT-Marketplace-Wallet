import { ConnectButton } from "thirdweb/react";
import { client } from "../client"; 
import { sepolia } from "thirdweb/chains";
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
      chain={sepolia}
      theme={"dark"}
      wallets={wallets} // Добавляем этот пропс
      connectButton={{
        label: "Enter the store",
      }}
      connectModal={{
        size: "compact", // Компактный вид лучше для мобильных устройств
        title: "Select a wallet",
      }}
    />
  );
};

