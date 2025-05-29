
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WhaleTransaction {
  id: string;
  wallet: string;
  token: string;
  type: 'buy' | 'sell';
  amount: number;
  value: number;
  timestamp: string;
  impact: 'high' | 'medium' | 'low';
}

interface WhaleTrackerProps {
  transactions: WhaleTransaction[];
}

const WhaleTracker: React.FC<WhaleTrackerProps> = ({ transactions }) => {
  const formatWallet = (wallet: string) => {
    return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const getTypeColor = (type: 'buy' | 'sell') => {
    return type === 'buy' ? 'text-crypto-green' : 'text-crypto-red';
  };

  const getImpactBadge = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return <Badge className="bg-crypto-red/20 text-crypto-red border-crypto-red/30">🔥 High Impact</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">⚡ Medium Impact</Badge>;
      case 'low':
        return <Badge className="bg-crypto-blue/20 text-crypto-blue border-crypto-blue/30">💧 Low Impact</Badge>;
    }
  };

  return (
    <Card className="glass-effect neon-border">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold crypto-gradient flex items-center gap-2">
          🐋 Whale Activity Tracker
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time tracking of large transactions from whale wallets
        </p>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {transactions.map((tx) => (
          <div 
            key={tx.id} 
            className="p-4 border-b border-border/20 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${getTypeColor(tx.type)}`}>
                  {tx.type.toUpperCase()}
                </span>
                <span className="text-sm font-mono text-muted-foreground">
                  {formatWallet(tx.wallet)}
                </span>
              </div>
              {getImpactBadge(tx.impact)}
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-semibold">{tx.token}</span>
                <div className="text-sm text-muted-foreground">
                  {tx.amount.toLocaleString()} tokens
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{formatNumber(tx.value)}</div>
                <div className="text-xs text-muted-foreground">{tx.timestamp}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WhaleTracker;
