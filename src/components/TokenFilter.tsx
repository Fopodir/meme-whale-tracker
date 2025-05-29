
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  minMarketCap: string;
  maxMarketCap: string;
  minLiquidity: string;
  maxLiquidity: string;
  minVolume24h: string;
  maxVolume24h: string;
  minTraders: string;
  maxTraders: string;
  maxAge: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const TokenFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState<FilterState>({
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

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetState: FilterState = {
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
    };
    setFilters(resetState);
    onFilterChange(resetState);
  };

  return (
    <Card className="p-6 glass-effect neon-border">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-crypto-purple" />
        <h3 className="text-lg font-semibold crypto-gradient">Advanced Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Market Cap Range</label>
          <div className="flex gap-2">
            <Input
              placeholder="Min"
              value={filters.minMarketCap}
              onChange={(e) => handleFilterChange('minMarketCap', e.target.value)}
              className="bg-background/50"
            />
            <Input
              placeholder="Max"
              value={filters.maxMarketCap}
              onChange={(e) => handleFilterChange('maxMarketCap', e.target.value)}
              className="bg-background/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Liquidity Range</label>
          <div className="flex gap-2">
            <Input
              placeholder="Min"
              value={filters.minLiquidity}
              onChange={(e) => handleFilterChange('minLiquidity', e.target.value)}
              className="bg-background/50"
            />
            <Input
              placeholder="Max"
              value={filters.maxLiquidity}
              onChange={(e) => handleFilterChange('maxLiquidity', e.target.value)}
              className="bg-background/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">24h Volume Range</label>
          <div className="flex gap-2">
            <Input
              placeholder="Min"
              value={filters.minVolume24h}
              onChange={(e) => handleFilterChange('minVolume24h', e.target.value)}
              className="bg-background/50"
            />
            <Input
              placeholder="Max"
              value={filters.maxVolume24h}
              onChange={(e) => handleFilterChange('maxVolume24h', e.target.value)}
              className="bg-background/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Traders Count</label>
          <div className="flex gap-2">
            <Input
              placeholder="Min"
              value={filters.minTraders}
              onChange={(e) => handleFilterChange('minTraders', e.target.value)}
              className="bg-background/50"
            />
            <Input
              placeholder="Max"
              value={filters.maxTraders}
              onChange={(e) => handleFilterChange('maxTraders', e.target.value)}
              className="bg-background/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Token Age & Sort</label>
          <div className="flex gap-2">
            <Select value={filters.maxAge} onValueChange={(value) => handleFilterChange('maxAge', value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Max Age" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="">Any Age</SelectItem>
                <SelectItem value="30m">30 minutes</SelectItem>
                <SelectItem value="1h">1 hour</SelectItem>
                <SelectItem value="6h">6 hours</SelectItem>
                <SelectItem value="1d">1 day</SelectItem>
                <SelectItem value="7d">7 days</SelectItem>
                <SelectItem value="30d">30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="marketCap">Market Cap</SelectItem>
                <SelectItem value="liquidity">Liquidity</SelectItem>
                <SelectItem value="volume24h">24h Volume</SelectItem>
                <SelectItem value="priceChange24h">24h Change</SelectItem>
                <SelectItem value="tradersCount">Traders</SelectItem>
                <SelectItem value="age">Age</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.sortOrder} onValueChange={(value) => handleFilterChange('sortOrder', value as 'asc' | 'desc')}>
              <SelectTrigger className="w-20 bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="desc">↓</SelectItem>
                <SelectItem value="asc">↑</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button 
        onClick={resetFilters}
        variant="outline"
        className="border-crypto-purple/30 hover:bg-crypto-purple/10"
      >
        Reset Filters
      </Button>
    </Card>
  );
};

export default TokenFilter;
