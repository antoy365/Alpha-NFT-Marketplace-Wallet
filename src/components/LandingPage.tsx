import * as HypeLabModule from "@hypelab/sdk-react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../client";
// Проверьте, что в LandingPage.tsx импорт выглядит строго с одной точкой:
import { PrivacyLink } from "./PrivacyLink"; 
// Для кнопки OKX (если она осталась в корне src) используем две точки:
import { OKXButton } from "../OKXButton"; 

const Banner = (HypeLabModule as any).Banner || (HypeLabModule as any).default?.Banner;

export const LandingPage = ({ children }: { children: React.ReactNode }) => {
  const account = useActiveAccount();

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

