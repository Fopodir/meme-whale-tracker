
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ExternalLink, TrendingUp, TrendingDown, Shield, AlertTriangle, Copy, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { TokenLaunch } from '@/types';

interface KOLTokenTableProps {
  tokens: TokenLaunch[];
}

const KOLTokenTable: React.FC<KOLTokenTableProps> = ({ tokens }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileView, setShowMobileView] = useState(false);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(tokens.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTokens = tokens.slice(startIndex, startIndex + itemsPerPage);

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
    console.log('Copied to clipboard:', text);
  };

  const getSignalBadge = (strength: number) => {
    if (strength >= 80) return <Badge className="bg-crypto-green/20 text-crypto-green border-crypto-green/30 text-xs">🚀 Strong</Badge>;
    if (strength >= 60) return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-xs">⚡ Good</Badge>;
    if (strength >= 40) return <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30 text-xs">⚠️ Weak</Badge>;
    return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30 text-xs">📉 None</Badge>;
  };

  const getRiskBadge = (risk: number) => {
    if (risk <= 30) return <Badge className="bg-crypto-green/20 text-crypto-green border-crypto-green/30 text-xs"><Shield className="w-3 h-3 mr-1" />Low</Badge>;
    if (risk <= 60) return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-xs"><AlertTriangle className="w-3 h-3 mr-1" />Med</Badge>;
    return <Badge className="bg-crypto-red/20 text-crypto-red border-crypto-red/30 text-xs"><AlertTriangle className="w-3 h-3 mr-1" />High</Badge>;
  };

  const getPlatformBadge = (platform: string) => {
    const colors = {
      'PumpFun': 'bg-orange-500/20 text-orange-500 border-orange-500/30',
      'PumpSwap': 'bg-blue-500/20 text-blue-500 border-blue-500/30',
      'Raydium': 'bg-purple-500/20 text-purple-500 border-purple-500/30'
    };
    return <Badge className={`${colors[platform as keyof typeof colors]} text-xs`}>{platform}</Badge>;
  };

  const getKOLTierBadge = (tier: string) => {
    const colors = {
      'S': 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs',
      'A': 'bg-gradient-to-r from-gray-300 to-gray-500 text-black text-xs',
      'B': 'bg-gradient-to-r from-amber-600 to-amber-800 text-white text-xs',
      'C': 'bg-gradient-to-r from-gray-600 to-gray-800 text-white text-xs'
    };
    return <Badge className={colors[tier as keyof typeof colors]}>{tier}</Badge>;
  };

  const MobileTokenCard = ({ token }: { token: TokenLaunch }) => (
    <div className="p-4 border-b border-border/20 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-crypto-purple to-crypto-blue flex items-center justify-center text-xs font-bold">
            {token.symbol.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-sm flex items-center gap-1">
              {token.name}
              {token.priceChange > 0 ? 
                <TrendingUp className="w-3 h-3 text-crypto-green" /> : 
                <TrendingDown className="w-3 h-3 text-crypto-red" />
              }
            </div>
            <div className="text-xs text-muted-foreground">{token.symbol}</div>
          </div>
        </div>
        {getPlatformBadge(token.platform)}
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted-foreground">Price: </span>
          <span className="font-mono">{formatPrice(token.price)}</span>
        </div>
        <div>
          <span className="text-muted-foreground">MCap: </span>
          <span className="font-mono">{formatNumber(token.marketCap)}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {getSignalBadge(token.signalStrength)}
          {getRiskBadge(token.riskScore)}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          {formatTimeAgo(token.launchTime)}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-xs">
          <span className="text-muted-foreground">KOLs: </span>
          <span className="font-semibold">{token.kolInteractions.length}</span>
          <div className="flex gap-1 mt-1">
            {token.kolInteractions.slice(0, 2).map((interaction, i) => (
              <div key={i}>
                {getKOLTierBadge(interaction.kolWallet.tier)}
              </div>
            ))}
            {token.kolInteractions.length > 2 && (
              <Badge variant="outline" className="text-xs">+{token.kolInteractions.length - 2}</Badge>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={() => copyToClipboard(token.fullAddress)}
          >
            <Copy className="w-3 h-3" />
          </Button>
          <a
            href={`https://solscan.io/token/${token.fullAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-xs flex items-center"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="glass-effect neon-border overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold crypto-gradient">🎯 KOL-Tracked New Launches</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {tokens.length} tokens launched in the last 30 minutes with KOL signals
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowMobileView(!showMobileView)}
              className="lg:hidden"
            >
              {showMobileView ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile View */}
      <div className="lg:hidden">
        {paginatedTokens.map((token) => (
          <MobileTokenCard key={token.id} token={token} />
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 text-xs">
              <th className="text-left p-3 text-muted-foreground font-medium">Token</th>
              <th className="text-center p-3 text-muted-foreground font-medium">Platform</th>
              <th className="text-right p-3 text-muted-foreground font-medium">Price</th>
              <th className="text-right p-3 text-muted-foreground font-medium">MCap</th>
              <th className="text-center p-3 text-muted-foreground font-medium">Signal</th>
              <th className="text-center p-3 text-muted-foreground font-medium">Risk</th>
              <th className="text-center p-3 text-muted-foreground font-medium">KOLs</th>
              <th className="text-center p-3 text-muted-foreground font-medium">Age</th>
              <th className="text-center p-3 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTokens.map((token) => (
              <tr 
                key={token.id} 
                className="border-b border-border/20 hover:bg-white/5 transition-colors"
              >
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-crypto-purple to-crypto-blue flex items-center justify-center text-xs font-bold">
                      {token.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-1">
                        {token.name}
                        {token.priceChange > 0 ? 
                          <TrendingUp className="w-3 h-3 text-crypto-green" /> : 
                          <TrendingDown className="w-3 h-3 text-crypto-red" />
                        }
                      </div>
                      <div className="text-xs text-muted-foreground">{token.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-center">
                  {getPlatformBadge(token.platform)}
                </td>
                <td className="p-3 text-right">
                  <div className="font-mono font-semibold text-sm">{formatPrice(token.price)}</div>
                  <div className={`text-xs font-mono ${token.priceChange >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                    {token.priceChange >= 0 ? '+' : ''}{token.priceChange.toFixed(1)}%
                  </div>
                </td>
                <td className="p-3 text-right font-mono text-muted-foreground text-sm">
                  {formatNumber(token.marketCap)}
                </td>
                <td className="p-3 text-center">
                  {getSignalBadge(token.signalStrength)}
                  <div className="text-xs text-muted-foreground mt-1">{token.signalStrength}</div>
                </td>
                <td className="p-3 text-center">
                  {getRiskBadge(token.riskScore)}
                  <div className="text-xs text-muted-foreground mt-1">{token.riskScore}</div>
                </td>
                <td className="p-3 text-center">
                  <div className="space-y-1">
                    <div className="text-sm font-semibold">{token.kolInteractions.length}</div>
                    <div className="flex justify-center gap-1">
                      {token.kolInteractions.slice(0, 2).map((interaction, i) => (
                        <div key={i}>
                          {getKOLTierBadge(interaction.kolWallet.tier)}
                        </div>
                      ))}
                      {token.kolInteractions.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{token.kolInteractions.length - 2}</Badge>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(token.launchTime)}
                  </div>
                </td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => copyToClipboard(token.fullAddress)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <a
                      href={`https://solscan.io/token/${token.fullAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xs"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border/50 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, tokens.length)} of {tokens.length} tokens
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <span className="text-sm font-medium px-2">
              {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default KOLTokenTable;
