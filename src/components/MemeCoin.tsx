
import { FC, CSSProperties } from 'react';

type MemeCoinType = 'sol' | 'eth' | 'btc' | 'bonk' | 'jto' | 'doge';

interface MemeCoinProps {
  type: MemeCoinType;
  price?: number;
  className?: string;
  style?: CSSProperties;
}

const MemeCoin: FC<MemeCoinProps> = ({ type, price = 10, className = '', style }) => {
  // Calculate size based on price (logarithmic scale to accommodate large price differences)
  const baseSize = 3.5; // Base size in rem
  const minSize = 2.5; // Minimum size in rem
  const sizeMultiplier = price > 10 ? Math.log10(price) / 2 : price / 20;
  const size = Math.max(minSize, baseSize * sizeMultiplier);
  
  // CSS for consistent coin style
  const coinStyle = {
    width: `${size}rem`,
    height: `${size}rem`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '50%',
    boxShadow: '0 0 15px rgba(255, 216, 100, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...style
  };
  
  // Map coin types to their image URLs
  const coinImageMap: Record<MemeCoinType, string> = {
    sol: 'https://s2.coinmarketcap.com/static/img/coins/128x128/5426.png',   // Solana
    eth: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1027.png',   // Ethereum
    // btc: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1.png',      // Bitcoin
    bonk: 'https://s2.coinmarketcap.com/static/img/coins/128x128/23095.png', // Bonk
    jto: 'https://s2.coinmarketcap.com/static/img/coins/128x128/28752.png',  // Jito (JTO)
    doge: 'https://s2.coinmarketcap.com/static/img/coins/128x128/74.png',    // Dogecoin
    btc: 'https://s2.coinmarketcap.com/static/img/coins/128x128/5994.png'   // Shiba Inu
  };
  
  // Prices for demonstration (simulated market prices)
  const priceLabels: Record<MemeCoinType, string> = {
    sol: '$200',
    eth: '$3,500',
    btc: '$0.000012',
    bonk: '$0.00002',
    jto: '$2.5',
    doge: '$0.15'
    // shib: '$0.000012'
  };
  
  return (
    <div 
      className={`relative transition-transform coin-element ${className}`}
      style={coinStyle}
      data-coin-type={type}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-300/30 to-yellow-600/30"></div>
      <img 
        src={coinImageMap[type]} 
        alt={`${type.toUpperCase()} coin`}
        className="w-[80%] h-[80%] object-contain z-10 rounded-full"
      />
     
    </div>
  );
};

export default MemeCoin;
