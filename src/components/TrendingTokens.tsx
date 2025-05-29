
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TrendingToken {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  rank: number;
  trend: 'up' | 'down' | 'stable';
}

interface TrendingTokensProps {
  tokens: TrendingToken[];
}

const TrendingTokens: React.FC<TrendingTokensProps> = ({ tokens }) => {
  const formatNumber = (num: number) => {
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    if (price < 0.001) return `$${price.toExponential(2)}`;
    return `$${price.toFixed(6)}`;
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '🚀';
      case 'down':
        return '📉';
      case 'stable':
        return '📊';
    }
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-crypto-green' : 'text-crypto-red';
  };

  return (
    <Card className="glass-effect neon-border">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold crypto-gradient flex items-center gap-2">
          🔥 Trending Meme Coins
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Top 10 trending Solana meme coins by social activity
        </p>
      </div>
      
      <div className="p-4 space-y-3">
        {tokens.map((token) => (
          <div 
            key={token.id} 
            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border border-border/20"
          >
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center text-xs">
                #{token.rank}
              </Badge>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-crypto-purple to-crypto-blue flex items-center justify-center text-sm font-bold">
                {token.symbol.charAt(0)}
              </div>
              <div>
                <div className="font-semibold flex items-center gap-1">
                  {token.name} <span className="text-lg">{getTrendIcon(token.trend)}</span>
                </div>
                <div className="text-sm text-muted-foreground">{token.symbol}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-mono font-semibold">{formatPrice(token.price)}</div>
              <div className={`text-sm font-mono ${getChangeColor(token.priceChange24h)}`}>
                {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
              </div>
              <div className="text-xs text-muted-foreground">
                Vol: {formatNumber(token.volume24h)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TrendingTokens;
