import React, { useState, useMemo } from 'react';
import { useKOLTracking } from '@/hooks/useKOLTracking';
import { AdvancedFilters } from '@/types';
import AdvancedFiltersComponent from '@/components/AdvancedFilters';
import KOLTokenTable from '@/components/KOLTokenTable';
import KOLDashboard from '@/components/KOLDashboard';
import SignalMetrics from '@/components/SignalMetrics';
import { Card } from '@/components/ui/card';
import { ExternalLink, Github, Globe, MessageCircle } from 'lucide-react';

const Index = () => {
  const { kolWallets, recentLaunches, isLoading } = useKOLTracking();
  const [filters, setFilters] = useState<AdvancedFilters>({
    minSignalStrength: 0,
    maxRiskScore: 100,
    minKOLTier: 'C',
    minKOLInteractions: 0,
    maxAge: 'any',
    minLiquidity: 0,
    maxLiquidity: 0,
    minMarketCap: 0,
    maxMarketCap: 0,
    platforms: [],
    kolSpecializations: [],
    sortBy: 'signalStrength',
    sortOrder: 'desc'
  });

  const convertAgeToMinutes = (age: string) => {
    if (age.includes('m')) return parseInt(age);
    if (age.includes('h')) return parseInt(age) * 60;
    return 0;
  };

  const filteredTokens = useMemo(() => {
    let filtered = recentLaunches.filter(token => {
      // Signal strength filter
      if (token.signalStrength < filters.minSignalStrength) return false;
      
      // Risk score filter
      if (token.riskScore > filters.maxRiskScore) return false;
      
      // KOL interactions filter
      if (token.kolInteractions.length < filters.minKOLInteractions) return false;
      
      // KOL tier filter
      const tierValues = { S: 4, A: 3, B: 2, C: 1 };
      const minTierValue = tierValues[filters.minKOLTier];
      const hasQualifyingKOL = token.kolInteractions.some(interaction => 
        tierValues[interaction.kolWallet.tier] >= minTierValue
      );
      if (filters.minKOLInteractions > 0 && !hasQualifyingKOL) return false;
      
      // Age filter
      if (filters.maxAge && filters.maxAge !== 'any') {
        const tokenAgeMinutes = (Date.now() - token.launchTime.getTime()) / (1000 * 60);
        const maxAgeMinutes = convertAgeToMinutes(filters.maxAge);
        if (tokenAgeMinutes > maxAgeMinutes) return false;
      }
      
      // Market cap filter
      if (filters.minMarketCap > 0 && token.marketCap < filters.minMarketCap) return false;
      if (filters.maxMarketCap > 0 && token.marketCap > filters.maxMarketCap) return false;
      
      // Liquidity filter
      if (filters.minLiquidity > 0 && token.liquidity < filters.minLiquidity) return false;
      if (filters.maxLiquidity > 0 && token.liquidity > filters.maxLiquidity) return false;
      
      // Platform filter
      if (filters.platforms.length > 0 && !filters.platforms.includes(token.platform)) return false;
      
      // KOL specialization filter
      if (filters.kolSpecializations.length > 0) {
        const hasMatchingSpecialization = token.kolInteractions.some(interaction =>
          interaction.kolWallet.specialization.some(spec => 
            filters.kolSpecializations.includes(spec)
          )
        );
        if (!hasMatchingSpecialization) return false;
      }
      
      return true;
    });

    // Sort tokens
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (filters.sortBy) {
        case 'signalStrength':
          aVal = a.signalStrength;
          bVal = b.signalStrength;
          break;
        case 'riskScore':
          aVal = a.riskScore;
          bVal = b.riskScore;
          break;
        case 'marketCap':
          aVal = a.marketCap;
          bVal = b.marketCap;
          break;
        case 'launchTime':
          aVal = a.launchTime.getTime();
          bVal = b.launchTime.getTime();
          break;
        case 'priceChange':
          aVal = a.priceChange;
          bVal = b.priceChange;
          break;
        default:
          aVal = a.signalStrength;
          bVal = b.signalStrength;
      }
      
      return filters.sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });

    return filtered;
  }, [recentLaunches, filters]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 glass-effect neon-border animate-pulse-neon">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold crypto-gradient mb-2">Tracking KOL Wallets...</h2>
            <p className="text-muted-foreground">Analyzing recent token launches and KOL interactions</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-5xl font-bold crypto-gradient mb-4 glow-text">
          🎯 KOL Meme Tracker
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Track Key Opinion Leader wallet interactions with newly launched tokens. 
          Identify high-potential meme coins based on early KOL interest and smart money movements.
        </p>
      </div>

      {/* Signal Metrics */}
      <SignalMetrics tokens={filteredTokens} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Main Table */}
        <div className="lg:col-span-3 space-y-6">
          <AdvancedFiltersComponent filters={filters} onFilterChange={setFilters} />
          <KOLTokenTable tokens={filteredTokens} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <KOLDashboard kolWallets={kolWallets} />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/20 mt-16 pt-8">
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-lg font-semibold crypto-gradient mb-4">🐳 Meme Whale Tracker</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-time KOL tracking powered by advanced blockchain analytics. 
              Identify high-potential meme tokens based on early whale interest and smart money movements.
            </p>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a
              href="https://t.me/cryptokingmax"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Telegram
            </a>
            <a
              href="https://github.com/cryptoking-max"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="https://cryptokingmax.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <Globe className="w-5 h-5" />
              Website
            </a>
            <a
              href="https://twitter.com/crytokingmax"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Twitter
            </a>
          </div>

          <div className="pt-4 border-t border-border/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Built by{' '}
                <a 
                  href="https://t.me/cryptokingmax" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  @cryptokingmax
                </a>
              </p>
              <a
                href="https://github.com/cryptoking-max/meme-whale-tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                View Source Code
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
