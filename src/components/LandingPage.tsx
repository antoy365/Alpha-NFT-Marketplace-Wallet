import * as HypeLabModule from "@hypelab/sdk-react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../client";
// Проверьте, что в LandingPage.tsx импорт выглядит строго с одной точкой:
import { PrivacyLink } from "./PrivacyLink"; 
// Для кнопки OKX (если она осталась в корне src) используем две точки:
import { OKXButton } from "../OKXButton"; 

// ТЕХНИЧЕСКИЕ ИМПОРТЫ ДЛЯ ПРЕДЗАГРУЗКИ КАРТИНОК ИЗ БЛОКЧЕЙНА
import { getContract } from "thirdweb";
import { sepolia, abstractTestnet } from "thirdweb/chains"; // встроенные пресеты сетей
import { useNftPrefetch } from "../useNftPrefetch"; // Импортируем хук из корня src/

const Banner = (HypeLabModule as any).Banner || (HypeLabModule as any).default?.Banner;

export const LandingPage = ({ children }: { children: React.ReactNode }) => {
  const account = useActiveAccount();

  // 1. Инициализируем ссылки на контракты для прелоадера (работают публично без авторизации)
  const prefetchSepoliaContract = getContract({
    client,
    chain: sepolia,
    address: "0x8c70A206A5595f7d82B70F552D53BD65463D5891",
  });

  const prefetchAbstractContract = getContract({
    client,
    chain: {
      ...abstractTestnet,
      rpc: "https://api.testnet.abs.xyz" // Используем официальный свободный узел сети
    },
    address: "0x1d23f41509eCDf9B0e4537564833E07deAEE2805",
  });

  // 2. Активируем скрытое фоновое кэширование картинок в ОЗУ.
  // Пока пользователь смотрит на баннер и тянется к кнопке Connect Wallet, картинки уже скачиваются.
  useNftPrefetch(prefetchSepoliaContract, prefetchAbstractContract);

  // 3. Если кошелек подключен, мгновенно открываем маркетплейс с уже готовой графикой в кэше
  if (account) return <>{children}</>;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      paddingBottom: '160px', 
      position: 'relative'
    }}>
      
      <div style={{ 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px' 
      }}>
        <ConnectButton 
          client={client} 
          connectButton={{
            label: "Connect Wallet"
          }}
        />
        <OKXButton />
      </div>

      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '10px', 
        width: '100%' 
      }}>
        
        {/* Компонент из текущей папки */}
        <PrivacyLink />

        {/* Контейнер для баннера */}
        <div style={{ 
          width: '320px', 
          height: '50px', 
          backgroundColor: 'rgba(0,0,0,0.05)', 
          borderRadius: '4px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {Banner ? (
            <Banner placement="5b418b604e" />
          ) : (
            <div style={{ fontSize: '10px', color: 'gray' }}>The ad is loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

