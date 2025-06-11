
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-midnight/95 to-[#0a0d13]/90 overflow-hidden interactive-section animate-on-scroll">
      <div className="container mx-auto relative px-4 z-10">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 border border-glow-green/10 relative overflow-hidden hover:border-glow-green/30 transition-all duration-500 interactive-card">
          <div className="absolute top-0 right-0 w-64 h-64 bg-glow-green/10 rounded-full blur-3xl animate-pulse-glow"></div>
          <div
            className="absolute bottom-0 left-0 w-64 h-64 bg-warm-yellow/10 rounded-full blur-3xl animate-pulse-glow"
            style={{
              animationDelay: "1.5s",
            }}
          ></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-glow-green to-warm-yellow">
              Ready to Automate Your Trading?
            </h2>
            <p className="text-xl text-gray-300 mb-8 text-center max-w-2xl mx-auto">
              Join thousands of traders who are already using our bots to gain an edge in the crypto markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <Button className="bg-gradient-to-r from-glow-green to-warm-yellow hover:from-warm-yellow hover:to-glow-green text-midnight text-lg font-medium px-8 py-6 h-auto hover:scale-105 transition-all duration-300 shadow-lg shadow-glow-green/20 interactive-button">
                  View Pricing Plans
                </Button>
              </Link>
              <a href="https://t.me/cryptokingmax" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border-glow-green text-glow-green hover:bg-glow-green/10 text-lg font-medium px-8 py-6 h-auto hover:scale-105 transition-all duration-300 interactive-button"
                >
                  Contact on Telegram
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
