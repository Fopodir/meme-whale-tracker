
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { KOLWallet } from '@/types';
import { Shield, TrendingUp, Users, Star } from 'lucide-react';

interface KOLDashboardProps {
  kolWallets: KOLWallet[];
}

const KOLDashboard: React.FC<KOLDashboardProps> = ({ kolWallets }) => {
  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'S': return '👑';
      case 'A': return '⭐';
      case 'B': return '🔹';
      case 'C': return '🔸';
      default: return '📊';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S': return 'from-yellow-400 to-yellow-600';
      case 'A': return 'from-gray-300 to-gray-500';
      case 'B': return 'from-amber-600 to-amber-800';
      case 'C': return 'from-gray-600 to-gray-800';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  const topKOLs = kolWallets
    .sort((a, b) => b.successRate - a.successRate)
    .slice(0, 6);

  return (
    <Card className="glass-effect neon-border">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold crypto-gradient flex items-center gap-2">
          <Shield className="w-5 h-5" />
          KOL Tracker Dashboard
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Top performing KOL wallets and their recent activity
        </p>
      </div>
      
      <div className="p-6 space-y-4">
        {topKOLs.map((kol) => (
          <div 
            key={kol.id}
            className="p-4 rounded-lg border border-border/20 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getTierColor(kol.tier)} flex items-center justify-center text-lg`}>
                  {getTierIcon(kol.tier)}
                </div>
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    {kol.name}
                    {kol.verified && <Shield className="w-4 h-4 text-crypto-blue" />}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">{kol.address}</div>
                </div>
              </div>
              <Badge className={`bg-gradient-to-r ${getTierColor(kol.tier)} text-white border-0`}>
                Tier {kol.tier}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
              <div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
                <div className="font-semibold text-crypto-green">{kol.successRate}%</div>
                <Progress value={kol.successRate} className="h-1 mt-1" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Followers
                </div>
                <div className="font-semibold">{formatNumber(kol.followers)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Avg ROI</div>
                <div className="font-semibold text-crypto-purple">{kol.avgROI}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total Trades</div>
                <div className="font-semibold">{kol.totalTrades}</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {kol.specialization.map((spec, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default KOLDashboard;
