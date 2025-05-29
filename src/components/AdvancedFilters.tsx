
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import { AdvancedFilters as FilterState } from '@/types';

interface AdvancedFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFilterChange({
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
  };

  const togglePlatform = (platform: string) => {
    const platforms = filters.platforms.includes(platform)
      ? filters.platforms.filter(p => p !== platform)
      : [...filters.platforms, platform];
    handleFilterChange('platforms', platforms);
  };

  const toggleSpecialization = (spec: string) => {
    const specializations = filters.kolSpecializations.includes(spec)
      ? filters.kolSpecializations.filter(s => s !== spec)
      : [...filters.kolSpecializations, spec];
    handleFilterChange('kolSpecializations', specializations);
  };

  return (
    <Card className="p-6 glass-effect neon-border">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-crypto-purple" />
        <h3 className="text-lg font-semibold crypto-gradient">Advanced KOL Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Signal Strength & Risk */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Signal Analysis</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Min Signal Strength</label>
              <Input
                type="number"
                placeholder="0-100"
                value={filters.minSignalStrength}
                onChange={(e) => handleFilterChange('minSignalStrength', Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Max Risk Score</label>
              <Input
                type="number"
                placeholder="0-100"
                value={filters.maxRiskScore}
                onChange={(e) => handleFilterChange('maxRiskScore', Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
          </div>
        </div>

        {/* KOL Criteria */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">KOL Criteria</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Min KOL Tier</label>
              <Select value={filters.minKOLTier} onValueChange={(value) => handleFilterChange('minKOLTier', value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="C">C Tier (All KOLs)</SelectItem>
                  <SelectItem value="B">B Tier & Above</SelectItem>
                  <SelectItem value="A">A Tier & Above</SelectItem>
                  <SelectItem value="S">S Tier Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Min KOL Interactions</label>
              <Input
                type="number"
                placeholder="0+"
                value={filters.minKOLInteractions}
                onChange={(e) => handleFilterChange('minKOLInteractions', Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
          </div>
        </div>

        {/* Market Metrics */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Market Metrics</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Min MC"
                value={filters.minMarketCap}
                onChange={(e) => handleFilterChange('minMarketCap', Number(e.target.value))}
                className="bg-background/50"
              />
              <Input
                placeholder="Max MC"
                value={filters.maxMarketCap}
                onChange={(e) => handleFilterChange('maxMarketCap', Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Min Liq"
                value={filters.minLiquidity}
                onChange={(e) => handleFilterChange('minLiquidity', Number(e.target.value))}
                className="bg-background/50"
              />
              <Input
                placeholder="Max Liq"
                value={filters.maxLiquidity}
                onChange={(e) => handleFilterChange('maxLiquidity', Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
          </div>
        </div>

        {/* Time & Sorting */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Time & Sorting</h4>
          <div className="space-y-3">
            <Select value={filters.maxAge} onValueChange={(value) => handleFilterChange('maxAge', value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Max Age" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="any">Any Age</SelectItem>
                <SelectItem value="5m">5 minutes</SelectItem>
                <SelectItem value="10m">10 minutes</SelectItem>
                <SelectItem value="15m">15 minutes</SelectItem>
                <SelectItem value="30m">30 minutes</SelectItem>
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-2">
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="signalStrength">Signal Strength</SelectItem>
                  <SelectItem value="riskScore">Risk Score</SelectItem>
                  <SelectItem value="marketCap">Market Cap</SelectItem>
                  <SelectItem value="launchTime">Launch Time</SelectItem>
                  <SelectItem value="priceChange">Price Change</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.sortOrder} onValueChange={(value) => handleFilterChange('sortOrder', value as 'asc' | 'desc')}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="desc">↓ High to Low</SelectItem>
                  <SelectItem value="asc">↑ Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Filter */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Launch Platforms</h4>
        <div className="flex gap-2">
          {['PumpFun', 'PumpSwap', 'Raydium'].map(platform => (
            <Badge
              key={platform}
              variant={filters.platforms.includes(platform) ? "default" : "outline"}
              className={`cursor-pointer ${filters.platforms.includes(platform) ? 'bg-crypto-purple text-white' : ''}`}
              onClick={() => togglePlatform(platform)}
            >
              {platform}
            </Badge>
          ))}
        </div>
      </div>

      {/* KOL Specializations */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">KOL Specializations</h4>
        <div className="flex gap-2 flex-wrap">
          {['DeFi', 'Memecoins', 'New Launches', 'Gaming', 'PumpFun', 'Early Calls'].map(spec => (
            <Badge
              key={spec}
              variant={filters.kolSpecializations.includes(spec) ? "default" : "outline"}
              className={`cursor-pointer ${filters.kolSpecializations.includes(spec) ? 'bg-crypto-blue text-white' : ''}`}
              onClick={() => toggleSpecialization(spec)}
            >
              {spec}
            </Badge>
          ))}
        </div>
      </div>

      <Button 
        onClick={resetFilters}
        variant="outline"
        className="mt-6 border-crypto-purple/30 hover:bg-crypto-purple/10"
      >
        <X className="w-4 h-4 mr-2" />
        Reset All Filters
      </Button>
    </Card>
  );
};

export default AdvancedFilters;
