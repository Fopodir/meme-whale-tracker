
import { Check } from "lucide-react";

export default function OfferingSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-midnight/5 to-[yellow]/10 relative overflow-hidden transition-all duration-1000 interactive-section animate-on-scroll">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
            What I Offer
          </h2>
          <div className="h-1 w-50 bg-gradient-to-r from-glow-green to-warm-yellow mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed">
            Custom trading bots on Solana and Ethereum with advanced features like MEV protection, copy trading, and token launch
            automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-[#0f1217]/80 backdrop-blur-sm p-8 rounded-xl border border-[#1c2331]/50 hover:border-purple-400/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(167,139,250,0.1)] interactive-card relative overflow-hidden">
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-full bg-[#1c2331]/80 flex items-center justify-center mb-6 group-hover:bg-[#1c2331] transition-colors duration-300">
                <svg
                  className="h-7 w-7 text-purple-400 group-hover:scale-110 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">
                Solana Trading Bots
              </h3>
              <p className="text-gray-400/90 mb-6 leading-relaxed">
                High-performance bots optimized for Solana's fast blockchain with sub-second execution times and minimal slippage.
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-purple-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Lightning-fast execution
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-purple-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    DEX aggregation
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-purple-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Multi-wallet rotation
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="group bg-[#0f1217]/80 backdrop-blur-sm p-8 rounded-xl border border-[#1c2331]/50 hover:border-blue-400/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(96,165,250,0.1)] interactive-card relative overflow-hidden">
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-full bg-[#1c2331]/80 flex items-center justify-center mb-6 group-hover:bg-[#1c2331] transition-colors duration-300">
                <svg
                  className="h-7 w-7 text-blue-400 group-hover:scale-110 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                Ethereum MEV Protection
              </h3>
              <p className="text-gray-400/90 mb-6 leading-relaxed">
                State-of-the-art protection against frontrunning and sandwich attacks to maximize your trading profits.
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-blue-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Private transactions
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-blue-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Flash bots integration
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-blue-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Anti-sandwich measures
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="group bg-[#0f1217]/80 backdrop-blur-sm p-8 rounded-xl border border-[#1c2331]/50 hover:border-red-400/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(248,113,113,0.1)] interactive-card relative overflow-hidden">
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-full bg-[#1c2331]/80 flex items-center justify-center mb-6 group-hover:bg-[#1c2331] transition-colors duration-300">
                <svg
                  className="h-7 w-7 text-red-400 group-hover:scale-110 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-red-400 transition-colors duration-300">
                AI-Powered Analysis
              </h3>
              <p className="text-gray-400/90 mb-6 leading-relaxed">
                Leverage machine learning to identify high-probability trades and filter out potential scams before investing.
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-red-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Smart contract analysis
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-red-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Pattern recognition
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-red-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Risk scoring system
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
