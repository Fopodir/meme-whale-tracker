
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Rocket, Users } from 'lucide-react';

interface NewLaunchToken {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  platform: 'PumpFun' | 'PumpSwap';
  launchTime: string;
  tradersCount: number;
  volume24h: number;
  priceChange: number;
  liquidity: number;
}

interface NewLaunchesProps {
  tokens: NewLaunchToken[];
}

const NewLaunches: React.FC<NewLaunchesProps> = ({ tokens }) => {
  const formatNumber = (num: number) => {
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    if (price < 0.001) return `$${price.toExponential(2)}`;
    return `$${price.toFixed(6)}`;
  };

  const getPlatformBadge = (platform: 'PumpFun' | 'PumpSwap') => {
    return platform === 'PumpFun' 
      ? <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">🚀 PumpFun</Badge>
      : <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">🔄 PumpSwap</Badge>;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-crypto-green' : 'text-crypto-red';
  };

  return (
    <Card className="glass-effect neon-border">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold crypto-gradient flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          New Launches (Last 30 mins)
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Fresh tokens from PumpFun & PumpSwap
        </p>
      </div>
      
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {tokens.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No new launches in the last 30 minutes</p>
          </div>
        ) : (
          tokens.map((token) => (
            <div 
              key={token.id} 
              className="p-4 rounded-lg border border-border/20 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-crypto-purple to-crypto-blue flex items-center justify-center text-sm font-bold">
                    {token.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{token.name}</div>
                    <div className="text-sm text-muted-foreground">{token.symbol}</div>
                  </div>
                </div>
                {getPlatformBadge(token.platform)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Price</div>
                  <div className="font-mono font-semibold">{formatPrice(token.price)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">24h Change</div>
                  <div className={`font-mono ${getChangeColor(token.priceChange)}`}>
                    {token.priceChange >= 0 ? '+' : ''}{token.priceChange.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Market Cap</div>
                  <div className="font-mono">{formatNumber(token.marketCap)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Liquidity</div>
                  <div className="font-mono">{formatNumber(token.liquidity)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Traders
                  </div>
                  <div className="font-mono">{token.tradersCount}</div>
                </div>
                <div>
                  <div className="text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Launched
                  </div>
                  <div className="font-mono text-crypto-green">{token.launchTime}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default NewLaunches;
