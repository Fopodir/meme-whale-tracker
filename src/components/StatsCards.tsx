
import React from 'react';
import { Card } from '@/components/ui/card';

interface StatsCardsProps {
  totalTokens: number;
  totalMarketCap: number;
  activeWhales: number;
  avgDailyVolume: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ 
  totalTokens, 
  totalMarketCap, 
  activeWhales, 
  avgDailyVolume 
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return num.toLocaleString();
  };

  const stats = [
    {
      title: 'Total Meme Coins',
      value: totalTokens.toLocaleString(),
      icon: '🪙',
      change: '+12%',
      changeColor: 'text-crypto-green'
    },
    {
      title: 'Total Market Cap',
      value: formatNumber(totalMarketCap),
      icon: '💰',
      change: '+8.5%',
      changeColor: 'text-crypto-green'
    },
    {
      title: 'Active Whales',
      value: activeWhales.toLocaleString(),
      icon: '🐋',
      change: '+3%',
      changeColor: 'text-crypto-green'
    },
    {
      title: 'Avg Daily Volume',
      value: formatNumber(avgDailyVolume),
      icon: '📊',
      change: '-2.1%',
      changeColor: 'text-crypto-red'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 glass-effect neon-border hover:animate-pulse-neon transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">{stat.icon}</div>
            <div className={`text-sm font-semibold ${stat.changeColor}`}>
              {stat.change}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold crypto-gradient mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-muted-foreground">
              {stat.title}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
