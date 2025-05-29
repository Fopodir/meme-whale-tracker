
import { useState, useEffect } from 'react';

// Mock data since we don't have actual Moralis API key
const generateMockTokens = () => {
  const memeNames = [
    'DogeCoin Classic', 'ShibaSOL', 'PepeCoin', 'FlokiSOL', 'BabyDoge', 
    'SafeMoon SOL', 'CumRocket', 'ElonSperm', 'ApeCoin SOL', 'CatCoin'
  ];
  
  const symbols = ['DOGC', 'SHIBS', 'PEPE', 'FLOKI', 'BABYD', 'SAFE', 'CUMS', 'ELON', 'APES', 'CAT'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `token-${i}`,
    name: memeNames[i % memeNames.length] + (i > 9 ? ` v${Math.floor(i/10) + 1}` : ''),
    symbol: symbols[i % symbols.length] + (i > 9 ? Math.floor(i/10) + 1 : ''),
    price: Math.random() * 10,
    marketCap: Math.random() * 100000000,
    liquidity: Math.random() * 50000000,
    volume24h: Math.random() * 20000000,
    priceChange24h: (Math.random() - 0.5) * 200,
    age: `${Math.floor(Math.random() * 365)}d`,
    whaleActivity: Math.floor(Math.random() * 100),
    tradersCount: Math.floor(Math.random() * 10000) + 100
  }));
};

const generateNewLaunchTokens = () => {
  const newNames = [
    'MoonRocket', 'GigaChad', 'DiamondHands', 'ToTheMoon', 'StonksCoin',
    'MemeLord', 'YoloToken', 'PumpIt', 'Number9000', 'BasedCoin'
  ];
  
  const symbols = ['MOON', 'GIGA', 'DIAM', 'TTM', 'STONK', 'MEME', 'YOLO', 'PUMP', 'N9K', 'BASED'];
  const platforms = ['PumpFun', 'PumpSwap'] as const;
  const launchTimes = ['5m ago', '12m ago', '18m ago', '25m ago', '28m ago'];
  
  return Array.from({ length: Math.floor(Math.random() * 8) + 2 }, (_, i) => ({
    id: `new-${i}`,
    name: newNames[i % newNames.length],
    symbol: symbols[i % symbols.length],
    price: Math.random() * 0.1,
    marketCap: Math.random() * 1000000,
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    launchTime: launchTimes[i % launchTimes.length],
    tradersCount: Math.floor(Math.random() * 200) + 10,
    volume24h: Math.random() * 100000,
    priceChange: (Math.random() - 0.3) * 500, // New tokens tend to be more volatile
    liquidity: Math.random() * 500000
  }));
};

const generateMockWhaleTransactions = () => {
  const tokens = ['PEPE', 'SHIB', 'DOGE', 'FLOKI', 'BABYD'];
  const wallets = [
    'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0',
    'B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0A1',
    'C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0A1B2'
  ];
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: `tx-${i}`,
    wallet: wallets[i % wallets.length],
    token: tokens[i % tokens.length],
    type: Math.random() > 0.5 ? 'buy' : 'sell' as 'buy' | 'sell',
    amount: Math.floor(Math.random() * 1000000),
    value: Math.random() * 500000,
    timestamp: `${Math.floor(Math.random() * 60)}m ago`,
    impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low'
  }));
};

const generateTrendingTokens = () => {
  const trending = [
    { name: 'PepeCoin', symbol: 'PEPE' },
    { name: 'ShibaSOL', symbol: 'SHIBS' },
    { name: 'FlokiSOL', symbol: 'FLOKI' },
    { name: 'DogeCoin Classic', symbol: 'DOGC' },
    { name: 'BabyDoge', symbol: 'BABYD' },
    { name: 'SafeMoon SOL', symbol: 'SAFE' },
    { name: 'ApeCoin SOL', symbol: 'APES' },
    { name: 'CatCoin', symbol: 'CAT' },
    { name: 'ElonSperm', symbol: 'ELON' },
    { name: 'CumRocket', symbol: 'CUMS' }
  ];
  
  return trending.map((token, i) => ({
    id: `trending-${i}`,
    rank: i + 1,
    name: token.name,
    symbol: token.symbol,
    price: Math.random() * 5,
    priceChange24h: (Math.random() - 0.5) * 100,
    volume24h: Math.random() * 10000000,
    trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
  }));
};

export const useMoralisAPI = () => {
  const [tokens, setTokens] = useState(generateMockTokens());
  const [newLaunches, setNewLaunches] = useState(generateNewLaunchTokens());
  const [whaleTransactions, setWhaleTransactions] = useState(generateMockWhaleTransactions());
  const [trendingTokens, setTrendingTokens] = useState(generateTrendingTokens());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTokens(prev => prev.map(token => ({
        ...token,
        price: token.price + (Math.random() - 0.5) * 0.1,
        priceChange24h: token.priceChange24h + (Math.random() - 0.5) * 5,
        volume24h: token.volume24h + (Math.random() - 0.5) * 1000000,
        tradersCount: token.tradersCount + Math.floor((Math.random() - 0.5) * 100)
      })));
      
      // Add new whale transaction occasionally
      if (Math.random() > 0.7) {
        const newTx = generateMockWhaleTransactions()[0];
        setWhaleTransactions(prev => [newTx, ...prev.slice(0, 19)]);
      }

      // Add new launch token occasionally
      if (Math.random() > 0.85) {
        const newToken = generateNewLaunchTokens()[0];
        setNewLaunches(prev => [newToken, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return {
    tokens,
    newLaunches,
    whaleTransactions,
    trendingTokens,
    isLoading
  };
};
