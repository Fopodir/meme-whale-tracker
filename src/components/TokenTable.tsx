
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  liquidity: number;
  volume24h: number;
  priceChange24h: number;
  age: string;
  whaleActivity: number;
  logo?: string;
}

interface TokenTableProps {
  tokens: Token[];
}

const TokenTable: React.FC<TokenTableProps> = ({ tokens }) => {
  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    if (price < 0.001) return `$${price.toExponential(2)}`;
    return `$${price.toFixed(6)}`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-crypto-green' : 'text-crypto-red';
  };

  const getWhaleActivityBadge = (activity: number) => {
    if (activity >= 80) return <Badge className="bg-crypto-red/20 text-crypto-red border-crypto-red/30">🐋 High</Badge>;
    if (activity >= 50) return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">📈 Medium</Badge>;
    return <Badge className="bg-crypto-green/20 text-crypto-green border-crypto-green/30">✅ Low</Badge>;
  };

  return (
    <Card className="glass-effect neon-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left p-4 text-muted-foreground font-medium">Token</th>
              <th className="text-right p-4 text-muted-foreground font-medium">Price</th>
              <th className="text-right p-4 text-muted-foreground font-medium">24h Change</th>
              <th className="text-right p-4 text-muted-foreground font-medium">Market Cap</th>
              <th className="text-right p-4 text-muted-foreground font-medium">Liquidity</th>
              <th className="text-right p-4 text-muted-foreground font-medium">24h Volume</th>
              <th className="text-center p-4 text-muted-foreground font-medium">Age</th>
              <th className="text-center p-4 text-muted-foreground font-medium">Whale Activity</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <tr 
                key={token.id} 
                className="border-b border-border/20 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-crypto-purple to-crypto-blue flex items-center justify-center text-sm font-bold">
                      {token.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{token.name}</div>
                      <div className="text-sm text-muted-foreground">{token.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right font-mono">
                  {formatPrice(token.price)}
                </td>
                <td className={`p-4 text-right font-mono ${getChangeColor(token.priceChange24h)}`}>
                  {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                </td>
                <td className="p-4 text-right font-mono text-muted-foreground">
                  {formatNumber(token.marketCap)}
                </td>
                <td className="p-4 text-right font-mono text-muted-foreground">
                  {formatNumber(token.liquidity)}
                </td>
                <td className="p-4 text-right font-mono text-muted-foreground">
                  {formatNumber(token.volume24h)}
                </td>
                <td className="p-4 text-center text-sm text-muted-foreground">
                  {token.age}
                </td>
                <td className="p-4 text-center">
                  {getWhaleActivityBadge(token.whaleActivity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TokenTable;
