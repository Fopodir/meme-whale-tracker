export interface TokenLaunch {
  id: string;
  name: string;
  symbol: string;
  address: string; // Truncated for display
  fullAddress: string; // Full address for copying and links
  price: number;
  marketCap: number;
  liquidity: number;
  volume24h: number;
  launchTime: Date;
  platform: 'PumpFun' | 'PumpSwap' | 'Raydium';
  creator: string;
  initialMcap: number;
  priceChange: number;
  kolInteractions: KOLInteraction[];
  signalStrength: number;
  riskScore: number;
  socialMetrics: {
    telegram: number;
    twitter: number;
    discord: number;
  };
}

export interface KOLWallet {
  id: string;
  address: string;
  name: string;
  tier: 'S' | 'A' | 'B' | 'C';
  followers: number;
  successRate: number;
  totalTrades: number;
  avgROI: number;
  verified: boolean;
  specialization: string[];
}

export interface KOLInteraction {
  id: string;
  kolWallet: KOLWallet;
  tokenAddress: string;
  type: 'buy' | 'sell' | 'hold';
  amount: number;
  value: number;
  timestamp: Date;
  txHash: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
}
