
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ExternalLink, TrendingUp, TrendingDown, Shield, AlertTriangle, Copy } from 'lucide-react';
import { TokenLaunch } from '@/types';

interface KOLTokenTableProps {
  tokens: TokenLaunch[];
}

const KOLTokenTable: React.FC<KOLTokenTableProps> = ({ tokens }) => {
  const formatNumber = (num: number) => {
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    if (price < 0.001) return `$${price.toExponential(2)}`;
    return `$${price.toFixed(6)}`;
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 1) return 'Just now';
    return `${minutes}m ago`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
    console.log('Copied to clipboard:', text);
  };

  const getSignalBadge = (strength: number) => {
    if (strength >= 80) return <Badge className="bg-crypto-green/20 text-crypto-green border-crypto-green/30">🚀 Strong Signal</Badge>;
    if (strength >= 60) return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">⚡ Good Signal</Badge>;
    if (strength >= 40) return <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">⚠️ Weak Signal</Badge>;
    return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">📉 No Signal</Badge>;
  };

  const getRiskBadge = (risk: number) => {
    if (risk <= 30) return <Badge className="bg-crypto-green/20 text-crypto-green border-crypto-green/30"><Shield className="w-3 h-3 mr-1" />Low Risk</Badge>;
    if (risk <= 60) return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30"><AlertTriangle className="w-3 h-3 mr-1" />Medium Risk</Badge>;
    return <Badge className="bg-crypto-red/20 text-crypto-red border-crypto-red/30"><AlertTriangle className="w-3 h-3 mr-1" />High Risk</Badge>;
  };

  const getPlatformBadge = (platform: string) => {
    const colors = {
      'PumpFun': 'bg-orange-500/20 text-orange-500 border-orange-500/30',
      'PumpSwap': 'bg-blue-500/20 text-blue-500 border-blue-500/30',
      'Raydium': 'bg-purple-500/20 text-purple-500 border-purple-500/30'
    };
    return <Badge className={colors[platform as keyof typeof colors]}>{platform}</Badge>;
  };

  const getKOLTierBadge = (tier: string) => {
    const colors = {
      'S': 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black',
      'A': 'bg-gradient-to-r from-gray-300 to-gray-500 text-black',
      'B': 'bg-gradient-to-r from-amber-600 to-amber-800 text-white',
      'C': 'bg-gradient-to-r from-gray-600 to-gray-800 text-white'
    };
    return <Badge className={colors[tier as keyof typeof colors]}>{tier}</Badge>;
  };

  return (
    <Card className="glass-effect neon-border overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold crypto-gradient">🎯 KOL-Tracked New Launches</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Tokens launched in the last 30 minutes with KOL interaction signals
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left p-4 text-muted-foreground font-medium">Token</th>
              <th className="text-center p-4 text-muted-foreground font-medium">Platform</th>
              <th className="text-right p-4 text-muted-foreground font-medium">Price</th>
              <th className="text-right p-4 text-muted-foreground font-medium">Market Cap</th>
              <th className="text-center p-4 text-muted-foreground font-medium">KOL Signal</th>
              <th className="text-center p-4 text-muted-foreground font-medium">Risk</th>
              <th className="text-center p-4 text-muted-foreground font-medium">KOL Interactions</th>
              <th className="text-center p-4 text-muted-foreground font-medium">Launch Time</th>
              <th className="text-center p-4 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr 
                key={token.id} 
                className="border-b border-border/20 hover:bg-white/5 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-crypto-purple to-crypto-blue flex items-center justify-center text-sm font-bold">
                      {token.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        {token.name}
                        {token.priceChange > 0 ? 
                          <TrendingUp className="w-4 h-4 text-crypto-green" /> : 
                          <TrendingDown className="w-4 h-4 text-crypto-red" />
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">{token.symbol}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                        <span>{token.address}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-5 w-5 p-0"
                          onClick={() => copyToClipboard(token.fullAddress)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  {getPlatformBadge(token.platform)}
                </td>
                <td className="p-4 text-right">
                  <div className="font-mono font-semibold">{formatPrice(token.price)}</div>
                  <div className={`text-sm font-mono ${token.priceChange >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                    {token.priceChange >= 0 ? '+' : ''}{token.priceChange.toFixed(2)}%
                  </div>
                </td>
                <td className="p-4 text-right font-mono text-muted-foreground">
                  {formatNumber(token.marketCap)}
                </td>
                <td className="p-4 text-center">
                  {getSignalBadge(token.signalStrength)}
                  <div className="text-xs text-muted-foreground mt-1">{token.signalStrength}/100</div>
                </td>
                <td className="p-4 text-center">
                  {getRiskBadge(token.riskScore)}
                  <div className="text-xs text-muted-foreground mt-1">{token.riskScore}/100</div>
                </td>
                <td className="p-4 text-center">
                  <div className="space-y-1">
                    <div className="text-sm font-semibold">{token.kolInteractions.length} KOLs</div>
                    <div className="flex justify-center gap-1">
                      {token.kolInteractions.slice(0, 3).map((interaction, i) => (
                        <div key={i} className="flex items-center gap-1">
                          {getKOLTierBadge(interaction.kolWallet.tier)}
                        </div>
                      ))}
                      {token.kolInteractions.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{token.kolInteractions.length - 3}</Badge>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(token.launchTime)}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex flex-col gap-1">
                    <a
                      href={`https://solscan.io/token/${token.fullAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Solscan <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={`https://gmgn.ai/sol/token/${token.fullAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1"
                    >
                      GMGN <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default KOLTokenTable;
