
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Shield, TrendingUp, Copy } from "lucide-react";

const botTypes = [
  {
    id: "sniper",
    title: "Solana Sniper Bots",
    icon: Zap,
    description: "Lightning-fast automated trading for token launches"
  },
  {
    id: "mev",
    title: "MEV Bots",
    icon: Shield,
    description: "Extract maximum value from blockchain transactions"
  },
  {
    id: "arbitrage",
    title: "Arbitrage Bots",
    icon: TrendingUp,
    description: "Profit from price differences across exchanges"
  },
  {
    id: "copy",
    title: "Copy Trading Bots",
    icon: Copy,
    description: "Automatically mirror successful traders' strategies"
  }
];

export default function BotTypesSection() {
  return (
    <div className="mt-24">
      <h2 className="text-3xl font-bold text-center mb-12 text-glow-green">Trading Bot Types Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {botTypes.map((bot) => {
          const IconComponent = bot.icon;
          return (
            <Card 
              key={bot.id}
              className="bg-card border border-muted hover:bg-green-500/15 hover:border-glow-green/50 transition-all duration-300"
            >
              <CardHeader className="text-center">
                <IconComponent className="h-12 w-12 mx-auto mb-4 text-glow-green" />
                <CardTitle className="text-lg">{bot.title}</CardTitle>
                <CardDescription>{bot.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
