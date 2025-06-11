import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BotCard from "@/components/BotCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import type { EmblaCarouselType } from "embla-carousel";

const featuredBots = [
  {
    title: "Solana Sniper Bot",
    description: "Lightning-fast token acquisition at launch with configurable slippage and gas settings.",
    features: ["200ms average response time", "MEV protection built-in", "Multi-wallet support", "Custom slippage settings"],
    stats: {
      roi: "+1420%",
      winRate: "83%",
      timeframe: "30d",
    },
    price: "10~15 SOL",
  },
  {
    title: "AI-Powered Smart Filter",
    description: "Machine learning algorithms that filter out low-quality opportunities to focus on high-probability trades.",
    features: ["GPT-4 powered analysis", "99.2% scam detection rate", "Chart pattern recognition", "Social sentiment analysis"],
    stats: {
      roi: "+870%",
      winRate: "91%",
      timeframe: "30d",
    },
    price: "10~15 SOL",
  },
  {
    title: "Enhanced Copy Trade Bot",
    description: "Follow the most successful traders with customizable entry and exit rules.",
    features: ["Follow up to 10 wallets", "Custom entry/exit rules", "Position sizing automation", "Real-time notifications"],
    stats: {
      roi: "+1050%",
      winRate: "78%",
      timeframe: "30d",
    },
    price: "10~15 SOL",
  },
  {
    title: "MEV Protection Bot",
    description: "Advanced protection against MEV attacks with sandwich prevention and front-running detection.",
    features: ["Real-time MEV detection", "Sandwich attack prevention", "Gas optimization", "Private mempool access"],
    stats: {
      roi: "+650%",
      winRate: "89%",
      timeframe: "30d",
    },
    price: "8~12 SOL",
  },
  {
    title: "Arbitrage Hunter Bot",
    description: "Cross-platform arbitrage opportunities detector with instant execution capabilities.",
    features: ["Multi-DEX scanning", "Flash loan integration", "Instant execution", "Risk management"],
    stats: {
      roi: "+980%",
      winRate: "76%",
      timeframe: "30d",
    },
    price: "12~18 SOL",
  },
];

export default function FeaturedBotsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-midnight/5 to-[green]/10 relative interactive-section animate-on-scroll">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#00ff99] to-[#00ccff]">
            Featured Bots
          </h2>
          <div className="h-1 w-200 bg-gradient-to-r from-[#00ff99] to-[#00ccff] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our most popular trading automation tools with proven track records.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {featuredBots.map((bot, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <BotCard 
                    title={bot.title} 
                    description={bot.description} 
                    features={bot.features} 
                    stats={bot.stats} 
                    price={bot.price} 
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button className="bg-gradient-to-r from-glow-green to-warm-yellow hover:from-warm-yellow hover:to-glow-green text-midnight text-lg font-medium px-8 transition-all duration-300 hover:scale-105 shadow-lg">
              View All Bots
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
