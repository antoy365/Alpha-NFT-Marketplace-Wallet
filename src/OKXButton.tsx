import React from "react";

export const OKXButton: React.FC = () => {
  
  const handleOpenOKX = () => {
    // Ваша точная deeplink ссылка для OKX Wallet
    const deeplink = "okx://wallet/dapp/details?dappUrl=https%3A%2F%2Falpha-nft-marketplace-wallet-ss5z.vercel.app%2F";
    
    window.location.href = deeplink;
  };

  // Проверяем, зашел ли пользователь с мобильного телефона
  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Если пользователь сидит с компьютера, кнопку OKX скрываем (она ему не нужна)
  if (!isMobile) return null;

  return (
    <button
      onClick={handleOpenOKX}
      style={{
        padding: '12px 24px',
        backgroundColor: '#000000', // Черный цвет в стиле OKX
        color: '#FFFFFF',
        border: '1px solid #333333',
        borderRadius: '10px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '15px',
        marginTop: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        transition: 'background-color 0.2s',
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#000000'}
    >
      Open in OKX Wallet
    </button>
  );
};
