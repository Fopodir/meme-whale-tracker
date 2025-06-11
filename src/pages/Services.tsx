import { useState } from "react";
import { useInView } from "react-intersection-observer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BotCard from "@/components/BotCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const bots = [
  {
    id: 1,
    category: "sniper",
    title: "Solana Sniper Bot",
    description: "Lightning-fast token acquisition at launch with configurable slippage and gas settings.",
    features: [
      "200ms average response time",
      "MEV protection built-in",
      "Multi-wallet support",
      "Custom slippage settings",
      "Auto sell functionality",
      "Token contract validation"
    ],
    stats: {
      roi: "+1420%",
      winRate: "83%",
      timeframe: "30d"
    },
    price: "10~15 SOL"
  },
  {
    id: 2,
    category: "sniper",
    title: "Sniper + Copy Hybrid Bot",
    description: "Combine the power of sniping and copy trading in one integrated solution.",
    features: [
      "Smart wallet tracking",
      "Customizable entry conditions",
      "Priority-based execution",
      "Position size management",
      "Multi-chain compatibility",
      "Copy filtering by performance"
    ],
    stats: {
      roi: "+1560%",
      winRate: "76%",
      timeframe: "30d"
    }
  },
  {
    id: 3,
    category: "strategy",
    title: "Wallet Rotator Strategy Bot",
    description: "Automatically rotate between multiple wallets to avoid detection and maximize trading opportunities.",
    features: [
      "Support for unlimited wallets",
      "Random timing intervals",
      "Custom gas settings per wallet",
      "Transaction batching",
      "Automatic wallet funding distribution",
      "Anti-pattern detection avoidance"
    ],
    stats: {
      roi: "+980%",
      winRate: "79%",
      timeframe: "30d"
    },
    price: "10~15 SOL"
  },
  {
    id: 4,
    category: "strategy",
    title: "Time Decay Exit Bot",
    description: "Intelligently exit positions based on time-decay algorithms to maximize profits.",
    features: [
      "Adaptive exit timing",
      "Price action monitoring",
      "Volume analysis integration",
      "Trailing stop-loss",
      "Partial exit strategy",
      "Market sentiment correlation"
    ],
    stats: {
      roi: "+740%",
      winRate: "87%",
      timeframe: "30d"
    }
  },
  {
    id: 5,
    category: "strategy",
    title: "Liquidity Trap Avoider Bot",
    description: "Prevent your trades from getting stuck in low-liquidity situations with smart monitoring.",
    features: [
      "Real-time liquidity monitoring",
      "Emergency exit protocols",
      "LP depth analysis",
      "Volume profile tracking",
      "Slippage prediction",
      "Liquidity ratio alerts"
    ],
    stats: {
      roi: "+630%",
      winRate: "92%",
      timeframe: "30d"
    }
  },
  {
    id: 6,
    category: "strategy",
    title: "Mean Reversion Bot",
    description: "Capitalize on price deviations with statistical mean reversion strategies.",
    features: [
      "Statistical modeling",
      "Dynamic threshold adjustment",
      "Volatility-based position sizing",
      "Multi-timeframe analysis",
      "Correlation monitoring",
      "Automated exit at mean"
    ],
    stats: {
      roi: "+680%",
      winRate: "94%",
      timeframe: "30d"
    }
  },
  {
    id: 7,
    category: "strategy",
    title: "Flash Mirror Bot",
    description: "Mirror flash loan opportunities across multiple chains and protocols.",
    features: [
      "Cross-chain monitoring",
      "Gas optimization",
      "Slippage protection",
      "Opportunity validation",
      "Risk assessment",
      "Auto-execution"
    ],
    stats: {
      roi: "+2340%",
      winRate: "65%",
      timeframe: "30d"
    }
  },
  {
    id: 8,
    category: "ai",
    title: "AI-Powered Smart Filter Bot",
    description: "Machine learning algorithms that filter out low-quality opportunities to focus on high-probability trades.",
    features: [
      "GPT-4 powered analysis",
      "99.2% scam detection rate",
      "Chart pattern recognition",
      "Social sentiment analysis",
      "On-chain metrics evaluation",
      "Risk scoring system"
    ],
    stats: {
      roi: "+870%",
      winRate: "91%",
      timeframe: "30d"
    }
  },
  {
    id: 9,
    category: "ai",
    title: "Pump-Dump Detector Bot",
    description: "Early detection of pump and dump schemes to either avoid or capitalize on market movements.",
    features: [
      "Volume anomaly detection",
      "Social media monitoring",
      "Telegram group tracking",
      "Historical pattern matching",
      "Wallet clustering analysis",
      "Alert system with confidence score"
    ],
    stats: {
      roi: "+1120%",
      winRate: "85%",
      timeframe: "30d"
    }
  },
  {
    id: 10,
    category: "mev",
    title: "MEV Bot (Advanced)",
    description: "Extract maximum extractable value through sophisticated blockchain monitoring and execution.",
    features: [
      "Mempool monitoring",
      "Sandwich attack protection",
      "Arbitrage opportunity detection",
      "Priority gas auction participation",
      "Flashbots integration",
      "Private transaction pools"
    ],
    stats: {
      roi: "+2870%",
      winRate: "72%",
      timeframe: "30d"
    },
    price: "20~25 SOL"
  },
  {
    id: 11,
    category: "copy",
    title: "Enhanced Copy Trade Bot",
    description: "Follow the most successful traders with customizable entry and exit rules.",
    features: [
      "Follow up to 10 wallets",
      "Custom entry/exit rules",
      "Position sizing automation",
      "Real-time notifications",
      "Performance analytics",
      "Copy delay customization"
    ],
    stats: {
      roi: "+1050%",
      winRate: "78%",
      timeframe: "30d"
    }
  },
  {
    id: 12,
    category: "cex",
    title: "Stock Trading Bot",
    description: "Automated stock trading with advanced technical analysis and risk management.",
    features: [
      "Technical indicator signals",
      "Risk management protocols",
      "Multi-timeframe analysis",
      "Portfolio optimization",
      "Real-time market data",
      "Backtesting capabilities"
    ],
    stats: {
      roi: "+540%",
      winRate: "88%",
      timeframe: "30d"
    },
    price: "15~20 SOL"
  },
  {
    id: 13,
    category: "cex",
    title: "OTC Trading Bot (Bitbise)",
    description: "Over-the-counter trading automation for Bitbise exchange with smart order execution.",
    features: [
      "OTC market access",
      "Large order execution",
      "Price improvement algorithms",
      "Liquidity aggregation",
      "Smart order routing",
      "Real-time price feeds"
    ],
    stats: {
      roi: "+780%",
      winRate: "82%",
      timeframe: "30d"
    },
    price: "18~25 SOL"
  },
  {
    id: 14,
    category: "cex",
    title: "OTC Trading Bot (MEXC)",
    description: "Specialized OTC trading bot for MEXC exchange with advanced features.",
    features: [
      "MEXC API integration",
      "OTC order management",
      "Market making strategies",
      "Cross-pair arbitrage",
      "Risk assessment tools",
      "24/7 monitoring"
    ],
    stats: {
      roi: "+820%",
      winRate: "85%",
      timeframe: "30d"
    },
    price: "18~25 SOL"
  },
  {
    id: 15,
    category: "telegram",
    title: "Telegram Trading Bot",
    description: "Full-featured Telegram bot for trading signals, portfolio management, and automation.",
    features: [
      "Signal broadcasting",
      "Portfolio tracking",
      "User management system",
      "Payment integration",
      "Multi-language support",
      "Custom commands"
    ],
    stats: {
      roi: "Varies",
      timeframe: "Custom"
    },
    price: "12~20 SOL"
  },
  {
    id: 16,
    category: "telegram",
    title: "Telegram Alert Bot",
    description: "Real-time trading alerts and notifications via Telegram with customizable triggers.",
    features: [
      "Price alerts",
      "Volume notifications",
      "Whale movement tracking",
      "News integration",
      "Custom trigger setup",
      "Multi-channel support"
    ],
    stats: {
      roi: "N/A",
      timeframe: "Utility"
    },
    price: "8~15 SOL"
  },
  {
    id: 17,
    category: "web",
    title: "Trading Platform Website",
    description: "Complete trading platform with real-time charts, order management, and user authentication.",
    features: [
      "Real-time trading interface",
      "Advanced charting tools",
      "User authentication system",
      "Portfolio management",
      "Order book integration",
      "Mobile responsive design"
    ],
    stats: {
      roi: "N/A",
      timeframe: "Project"
    },
    price: "25~50 SOL"
  },
  {
    id: 18,
    category: "web",
    title: "DeFi Dashboard Website",
    description: "Comprehensive DeFi portfolio tracker with yield farming and staking analytics.",
    features: [
      "Multi-chain portfolio tracking",
      "Yield farming calculator",
      "Staking rewards tracking",
      "DeFi protocol integration",
      "Risk assessment tools",
      "Historical performance"
    ],
    stats: {
      roi: "N/A",
      timeframe: "Project"
    },
    price: "20~40 SOL"
  },
  {
    id: 19,
    category: "web",
    title: "NFT Marketplace Website",
    description: "Full-featured NFT marketplace with minting, trading, and collection management.",
    features: [
      "NFT minting interface",
      "Marketplace functionality",
      "Collection management",
      "Auction system",
      "Wallet integration",
      "Metadata management"
    ],
    stats: {
      roi: "N/A",
      timeframe: "Project"
    },
    price: "30~60 SOL"
  },
  {
    id: 20,
    category: "custom",
    title: "Custom Development",
    description: "Fully customized solutions built to your exact specifications and requirements.",
    features: [
      "Bespoke design and development",
      "Strategy implementation",
      "Integration with existing systems",
      "Performance optimization",
      "Ongoing support",
      "Regular updates"
    ],
    stats: {
      roi: "Varies",
      timeframe: "Custom"
    },
    price: "10~100 SOL"
  }
];

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [category, setCategory] = useState("all");

  const filteredBots = category === "all" 
    ? bots 
    : bots.filter(bot => bot.category === category);

  return (
    <div className="min-h-screen font-inter relative custom-cursor z-20">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              <span className="text-glow-green">
                Complete Development Services
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in-up">
              From trading bots to full-scale platforms - explore our comprehensive collection of development services designed to give you an edge in any market.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section 
        ref={ref}
        className={`py-16 relative ${inView ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="mb-8">
            <div className="flex justify-center mb-8">
              <TabsList className="glass-card border border-muted/40 grid-cols-4 md:grid-cols-8">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setCategory("all")}
                  className="data-[state=active]:bg-muted/70 data-[state=active]:text-glow-green data-[state=active]:glow-text"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="sniper" 
                  onClick={() => setCategory("sniper")}
                  className="data-[state=active]:bg-muted/70 data-[state=active]:text-glow-green data-[state=active]:glow-text"
                >
                  Snipers
                </TabsTrigger>
                <TabsTrigger 
                  value="strategy" 
                  onClick={() => setCategory("strategy")}
                  className="data-[state=active]:bg-muted/70 data-[state=active]:text-glow-green data-[state=active]:glow-text"
                >
                  Strategy
                </TabsTrigger>
                <TabsTrigger 
                  value="ai" 
                  onClick={() => setCategory("ai")}
                  className="data-[state=active]:bg-muted/70 data-[state=active]:text-glow-green data-[state=active]:glow-text"
                >
                  AI
                </TabsTrigger>
                <TabsTrigger 
                  value="mev" 
                  onClick={() => setCategory("mev")}
                  className="data-[state=active]:bg-muted/70 data-[state=active]:text-glow-green data-[state=active]:glow-text"
                >
                  MEV
                </TabsTrigger>
                <TabsTrigger 
                  value="copy" 
                  onClick={() => setCategory("copy")}
                  className="data-[state=active]:bg-muted/70 data-[state=active]:text-glow-green data-[state=active]:glow-text"
                >
                  Copy
                </TabsTrigger>
                <TabsTrigger 
                  value="cex" 
                  onClick={() => setCategory("cex")}
                  className="data-[state=active]:bg-muted/70 data-[state=active]:text-glow-green data-[state=active]:glow-text"
                >
                  CEX/OTC
                </TabsTrigger>
                <TabsTrigger 
                  value="telegram" 
                  onClick={() => setCategory("telegram")}
                  className="data-[state=active]:bg-muted/70 data-[state=active]:text-glow-green data-[state=active]:glow-text"
                >
                  Telegram
                </TabsTrigger>
                <TabsTrigger 
                  value="web" 
                  onClick={() => setCategory("web")}
                  className="data-[state=active]:bg-muted/70 data-[state=active]:text-glow-green data-[state=active]:glow-text"
                >
                  Web Dev
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBots.map((bot) => (
                  <BotCard
                    key={bot.id}
                    title={bot.title}
                    description={bot.description}
                    features={bot.features}
                    stats={bot.stats}
                    price={bot.price}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {filteredBots.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No services found in this category.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Custom Development Request */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 border border-glow-green/10 relative overflow-hidden glow-border floating">
            <div className="absolute top-0 right-0 w-64 h-64 bg-glow-green/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-warm-yellow/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 glow-text">Need Custom Development?</h2>
              <p className="text-xl text-gray-300 mb-6">
                Don't see what you're looking for? I specialize in building custom trading solutions, 
                platforms, and applications tailored to your specific needs and requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button className="bg-glow-green hover:bg-glow-green/90 text-midnight font-medium px-8 neon-glow-green">
                    Request Custom Development
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a
                  href="https://t.me/cryptokingmax"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="border-glow-green text-glow-green hover:bg-glow-green/10 font-medium">
                    Chat on Telegram
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
