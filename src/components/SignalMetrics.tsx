
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Target, Shield, Zap } from 'lucide-react';
import { TokenLaunch } from '@/types';

interface SignalMetricsProps {
  tokens: TokenLaunch[];
}

const SignalMetrics: React.FC<SignalMetricsProps> = ({ tokens }) => {
  const strongSignals = tokens.filter(t => t.signalStrength >= 80).length;
  const lowRiskTokens = tokens.filter(t => t.riskScore <= 30).length;
  const kolInteractedTokens = tokens.filter(t => t.kolInteractions.length > 0).length;
  const avgSignalStrength = tokens.length > 0 ? 
    tokens.reduce((sum, t) => sum + t.signalStrength, 0) / tokens.length : 0;

  const metrics = [
    {
      title: 'Strong Signals',
      value: strongSignals,
      total: tokens.length,
      icon: TrendingUp,
      color: 'text-crypto-green',
      bgColor: 'bg-crypto-green/20'
    },
    {
      title: 'KOL Interactions',
      value: kolInteractedTokens,
      total: tokens.length,
      icon: Target,
      color: 'text-crypto-purple',
      bgColor: 'bg-crypto-purple/20'
    },
    {
      title: 'Low Risk Tokens',
      value: lowRiskTokens,
      total: tokens.length,
      icon: Shield,
      color: 'text-crypto-blue',
      bgColor: 'bg-crypto-blue/20'
    },
    {
      title: 'Avg Signal Strength',
      value: Math.round(avgSignalStrength),
      total: 100,
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/20',
      isPercentage: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-6 glass-effect neon-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{metric.title}</p>
              <p className="text-2xl font-bold mt-2">
                {metric.value}
                {metric.isPercentage && '%'}
                {!metric.isPercentage && (
                  <span className="text-sm text-muted-foreground ml-1">
                    / {metric.total}
                  </span>
                )}
              </p>
              {!metric.isPercentage && (
                <div className="flex items-center mt-2">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${metric.bgColor.replace('/20', '')}`}
                      style={{ width: `${(metric.value / metric.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    {Math.round((metric.value / metric.total) * 100)}%
                  </span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SignalMetrics;
