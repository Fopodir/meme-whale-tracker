
import { useState, useEffect } from 'react';
import { TokenLaunch, KOLWallet, KOLInteraction } from '@/types';

// Mock KOL wallets database
const generateKOLWallets = (): KOLWallet[] => {
  const kolData = [
    { name: 'CryptoWhale1', tier: 'S' as const, followers: 150000, successRate: 87, specialization: ['DeFi', 'Memecoins'] },
    { name: 'SolanaGems', tier: 'S' as const, followers: 120000, successRate: 82, specialization: ['New Launches', 'Gaming'] },
    { name: 'MemeKing', tier: 'A' as const, followers: 85000, successRate: 75, specialization: ['Memecoins', 'Viral Tokens'] },
    { name: 'DeFiAlpha', tier: 'A' as const, followers: 95000, successRate: 78, specialization: ['DeFi', 'Yield Farming'] },
    { name: 'PumpDetector', tier: 'B' as const, followers: 45000, successRate: 68, specialization: ['PumpFun', 'Early Calls'] },
    { name: 'SmartMoney', tier: 'S' as const, followers: 200000, successRate: 91, specialization: ['Infrastructure', 'Blue Chips'] },
    { name: 'RetailSlayer', tier: 'A' as const, followers: 78000, successRate: 73, specialization: ['Scalping', 'Day Trading'] },
    { name: 'GemHunter', tier: 'B' as const, followers: 32000, successRate: 65, specialization: ['Micro Caps', 'Research'] }
  ];

  return kolData.map((kol, i) => ({
    id: `kol-${i}`,
    address: `${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 6)}`,
    name: kol.name,
    tier: kol.tier,
    followers: kol.followers,
    successRate: kol.successRate,
    totalTrades: Math.floor(Math.random() * 500) + 100,
    avgROI: Math.floor(Math.random() * 300) + 50,
    verified: kol.tier === 'S' || Math.random() > 0.3,
    specialization: kol.specialization
  }));
};

const generateRecentLaunches = (kolWallets: KOLWallet[]): TokenLaunch[] => {
  const memeNames = [
    'PepeMoon', 'DogeRocket', 'ShibaGiga', 'FlokiAlpha', 'BonkMax',
    'WIFGod', 'MEWSuper', 'POPCATHype', 'MOGUltra', 'RETARDIOPro'
  ];
  
  const symbols = ['PMOON', 'DROCK', 'SGIGA', 'FALPHA', 'BMAX', 'WGOD', 'MSUPER', 'PHYPE', 'MULTRA', 'RPRO'];
  const platforms = ['PumpFun', 'PumpSwap', 'Raydium'] as const;
  
  return Array.from({ length: 25 }, (_, i) => {
    const launchTime = new Date(Date.now() - Math.random() * 30 * 60 * 1000); // Last 30 minutes
    const hasKOLInteraction = Math.random() > 0.7;
    const numKOLs = hasKOLInteraction ? Math.floor(Math.random() * 5) + 1 : 0;
    
    const kolInteractions: KOLInteraction[] = hasKOLInteraction ? 
      Array.from({ length: numKOLs }, (_, j) => {
        const kol = kolWallets[Math.floor(Math.random() * kolWallets.length)];
        const impacts = ['high', 'medium', 'low'] as const;
        const types = ['buy', 'sell', 'hold'] as const;
        return {
          id: `interaction-${i}-${j}`,
          kolWallet: kol,
          tokenAddress: `token-${i}`,
          type: Math.random() > 0.8 ? types[1] : types[0],
          amount: Math.floor(Math.random() * 1000000),
          value: Math.random() * 50000,
          timestamp: new Date(launchTime.getTime() + Math.random() * 20 * 60 * 1000),
          txHash: `0x${Math.random().toString(36).substring(2, 15)}`,
          impact: impacts[Math.floor(Math.random() * 3)],
          confidence: Math.random() * 40 + 60
        };
      }) : [];

    const signalStrength = calculateSignalStrength(kolInteractions);
    const riskScore = calculateRiskScore(launchTime, kolInteractions);

    return {
      id: `token-${i}`,
      name: memeNames[i % memeNames.length] + (i > 9 ? ` v${Math.floor(i/10) + 1}` : ''),
      symbol: symbols[i % symbols.length] + (i > 9 ? Math.floor(i/10) + 1 : ''),
      address: `${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 6)}`,
      price: Math.random() * 0.1,
      marketCap: Math.random() * 5000000,
      liquidity: Math.random() * 2000000,
      volume24h: Math.random() * 1000000,
      launchTime,
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      creator: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 4)}`,
      initialMcap: Math.random() * 100000,
      priceChange: (Math.random() - 0.3) * 1000,
      kolInteractions,
      signalStrength,
      riskScore,
      socialMetrics: {
        telegram: Math.floor(Math.random() * 10000),
        twitter: Math.floor(Math.random() * 5000),
        discord: Math.floor(Math.random() * 3000)
      }
    };
  });
};

const calculateSignalStrength = (interactions: KOLInteraction[]): number => {
  if (interactions.length === 0) return 0;
  
  let score = 0;
  interactions.forEach(interaction => {
    let baseScore = 20;
    
    // Tier bonus
    switch (interaction.kolWallet.tier) {
      case 'S': baseScore += 40; break;
      case 'A': baseScore += 25; break;
      case 'B': baseScore += 15; break;
      case 'C': baseScore += 5; break;
    }
    
    // Type bonus
    if (interaction.type === 'buy') baseScore += 20;
    
    // Impact bonus
    switch (interaction.impact) {
      case 'high': baseScore += 15; break;
      case 'medium': baseScore += 10; break;
      case 'low': baseScore += 5; break;
    }
    
    score += baseScore;
  });
  
  return Math.min(100, score);
};

const calculateRiskScore = (launchTime: Date, interactions: KOLInteraction[]): number => {
  const age = (Date.now() - launchTime.getTime()) / (1000 * 60); // age in minutes
  let risk = 50; // base risk
  
  // Age factor (newer = riskier)
  if (age < 5) risk += 30;
  else if (age < 15) risk += 20;
  else if (age < 30) risk += 10;
  
  // KOL interaction reduces risk
  if (interactions.length > 0) {
    const avgTier = interactions.reduce((sum, int) => {
      const tierValue = { S: 4, A: 3, B: 2, C: 1 }[int.kolWallet.tier];
      return sum + tierValue;
    }, 0) / interactions.length;
    
    risk -= avgTier * 10;
  }
  
  return Math.max(0, Math.min(100, risk));
};

export const useKOLTracking = () => {
  const [kolWallets] = useState<KOLWallet[]>(generateKOLWallets());
  const [recentLaunches, setRecentLaunches] = useState<TokenLaunch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setRecentLaunches(generateRecentLaunches(kolWallets));
      setIsLoading(false);
    }, 2000);

    // Real-time updates every 10 seconds
    const interval = setInterval(() => {
      setRecentLaunches(prev => {
        const updated = prev.map(token => ({
          ...token,
          price: token.price + (Math.random() - 0.5) * 0.01,
          priceChange: token.priceChange + (Math.random() - 0.5) * 50,
          volume24h: token.volume24h + (Math.random() - 0.5) * 100000
        }));
        
        // Occasionally add new launches
        if (Math.random() > 0.8) {
          const newToken = generateRecentLaunches(kolWallets)[0];
          return [newToken, ...updated.slice(0, 24)];
        }
        
        return updated;
      });
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [kolWallets]);

  return {
    kolWallets,
    recentLaunches,
    isLoading
  };
};
