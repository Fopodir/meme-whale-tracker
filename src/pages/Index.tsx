
import React, { useState, useMemo } from 'react';
import StatsCards from '@/components/StatsCards';
import TokenFilter, { FilterState } from '@/components/TokenFilter';
import TokenTable from '@/components/TokenTable';
import WhaleTracker from '@/components/WhaleTracker';
import TrendingTokens from '@/components/TrendingTokens';
import NewLaunches from '@/components/NewLaunches';
import { useMoralisAPI } from '@/hooks/useMoralisAPI';
import { Card } from '@/components/ui/card';

const Index = () => {
  const { tokens, newLaunches, whaleTransactions, trendingTokens, isLoading } = useMoralisAPI();
  const [filters, setFilters] = useState<FilterState>({
    minMarketCap: '',
    maxMarketCap: '',
    minLiquidity: '',
    maxLiquidity: '',
    minVolume24h: '',
    maxVolume24h: '',
    minTraders: '',
    maxTraders: '',
    maxAge: '',
    sortBy: 'marketCap',
    sortOrder: 'desc'
  });

  const convertAgeToMinutes = (age: string) => {
    if (age.includes('m')) return parseInt(age);
    if (age.includes('h')) return parseInt(age) * 60;
    if (age.includes('d')) return parseInt(age) * 60 * 24;
    return 0;
  };

  const filteredAndSortedTokens = useMemo(() => {
    let filtered = tokens.filter(token => {
      const mcMin = filters.minMarketCap ? parseFloat(filters.minMarketCap) : 0;
      const mcMax = filters.maxMarketCap ? parseFloat(filters.maxMarketCap) : Infinity;
      const liqMin = filters.minLiquidity ? parseFloat(filters.minLiquidity) : 0;
      const liqMax = filters.maxLiquidity ? parseFloat(filters.maxLiquidity) : Infinity;
      const volMin = filters.minVolume24h ? parseFloat(filters.minVolume24h) : 0;
      const volMax = filters.maxVolume24h ? parseFloat(filters.maxVolume24h) : Infinity;
      const tradersMin = filters.minTraders ? parseFloat(filters.minTraders) : 0;
      const tradersMax = filters.maxTraders ? parseFloat(filters.maxTraders) : Infinity;

      // Age filtering
      let ageMatch = true;
      if (filters.maxAge) {
        const tokenAgeMinutes = convertAgeToMinutes(token.age);
        const maxAgeMinutes = convertAgeToMinutes(filters.maxAge);
        ageMatch = tokenAgeMinutes <= maxAgeMinutes;
      }

      return token.marketCap >= mcMin && token.marketCap <= mcMax &&
             token.liquidity >= liqMin && token.liquidity <= liqMax &&
             token.volume24h >= volMin && token.volume24h <= volMax &&
             token.tradersCount >= tradersMin && token.tradersCount <= tradersMax &&
             ageMatch;
    });

    // Sort tokens
    filtered.sort((a, b) => {
      const aVal = a[filters.sortBy as keyof typeof a] as number;
      const bVal = b[filters.sortBy as keyof typeof b] as number;
      return filters.sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });

    return filtered;
  }, [tokens, filters]);

  const stats = useMemo(() => ({
    totalTokens: tokens.length,
    totalMarketCap: tokens.reduce((sum, token) => sum + token.marketCap, 0),
    activeWhales: 1247,
    avgDailyVolume: tokens.reduce((sum, token) => sum + token.volume24h, 0) / tokens.length
  }), [tokens]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 glass-effect neon-border animate-pulse-neon">
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold crypto-gradient mb-2">Loading Meme Coins...</h2>
            <p className="text-muted-foreground">Fetching data from Moralis API</p>
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
          🚀 SolMeme Tracker
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced Solana meme coin tracker with whale monitoring, liquidity analysis, and real-time market data
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards {...stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Table */}
        <div className="lg:col-span-2 space-y-6">
          <TokenFilter onFilterChange={setFilters} />
          <TokenTable tokens={filteredAndSortedTokens} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <NewLaunches tokens={newLaunches} />
          <TrendingTokens tokens={trendingTokens} />
          <WhaleTracker transactions={whaleTransactions} />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-border/20">
        <p className="text-muted-foreground">
          Powered by Moralis API • Real-time Solana blockchain data
        </p>
      </div>
    </div>
  );
};

export default Index;
