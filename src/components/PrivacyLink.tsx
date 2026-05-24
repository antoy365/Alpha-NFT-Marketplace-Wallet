import React from "react";

interface PrivacyLinkProps {
  url?: string;
}

export const PrivacyLink: React.FC<PrivacyLinkProps> = ({
  url = "https://antoy365.github.io/privacy-policy/" 
}) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{
        // Стилизация под кнопку
        display: 'inline-block',
        padding: '8px 16px',
        backgroundColor: 'rgba(255, 255, 255, 0.08)', // Полупрозрачный фон
        color: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.2)', // Тонкая рамка
        borderRadius: '20px', // Закругленные края (капсула)
        fontSize: '12px',
        textDecoration: 'none', // Убираем подчеркивание ссылки
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        backdropFilter: 'blur(4px)', // Легкое размытие фона под кнопкой
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        e.currentTarget.style.color = '#ffffff';
      }} 
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
      }}
    >
      Privacy Policy
    </a>
  );
};

