import * as HypeLabModule from "@hypelab/sdk-react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../client";

// Безопасно извлекаем Banner из модуля
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
      paddingBottom: '120px',
      position: 'relative'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>NFT Marketplace</h1>
        <p style={{ marginBottom: '20px', color: '#666' }}>Connect to access ERC1155</p>
        <ConnectButton client={client} />
      </div>

      {/* Фиксированный контейнер для баннера */}
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        display: 'flex', 
        justifyContent: 'center',
        width: '100%' 
      }}>
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

