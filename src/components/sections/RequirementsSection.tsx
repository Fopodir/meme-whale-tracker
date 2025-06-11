
import { Check, Computer, HardDrive, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RequirementsSection() {
  const handleGetAccess = () => {
    window.open("https://t.me/cryptokingmax", "_blank");
  };

  return (
    <section className="py-20 bg-gradient-to-b from-midnight/10 to-[blue]/5 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            What You Need
          </h2>
          <div className="h-1 w-232 bg-gradient-to-r from-blue-200 to-cyan-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed">
            To run these powerful bots effectively, here's what you'll need to get started and see profitable returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="group bg-[#0f1217]/80 backdrop-blur-sm p-8 rounded-xl border border-[#1c2331]/50 hover:border-blue-400/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] interactive-card relative overflow-hidden">
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-full bg-[#1c2331]/80 flex items-center justify-center mb-6 group-hover:bg-[#1c2331] transition-colors duration-300">
                <Computer className="h-7 w-7 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">Hardware</h3>
              <p className="text-gray-400/90 mb-6 leading-relaxed">
                High-performance VPS or personal PC with optimal specifications for lightning-fast execution.
              </p>
              <ul className="mt-4 space-y-3 mb-6">
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-blue-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    8GB+ RAM recommended
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-blue-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    SSD storage for speed
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-blue-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Low-latency connection
                  </span>
                </li>
              </ul>
              <Button 
                onClick={handleGetAccess}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-300"
              >
                Get Access
              </Button>
            </div>
          </div>

          <div className="group bg-[#0f1217]/80 backdrop-blur-sm p-8 rounded-xl border border-[#1c2331]/50 hover:border-cyan-400/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] interactive-card relative overflow-hidden">
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-full bg-[#1c2331]/80 flex items-center justify-center mb-6 group-hover:bg-[#1c2331] transition-colors duration-300">
                <HardDrive className="h-7 w-7 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                Software & Infrastructure
              </h3>
              <p className="text-gray-400/90 mb-6 leading-relaxed">
                Dedicated RPC or gRPC nodes for your target blockchain to ensure fastest possible execution.
              </p>
              <ul className="mt-4 space-y-3 mb-6">
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-cyan-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Premium Solana RPC nodes
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-cyan-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Dedicated gRPC connections
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-cyan-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Custom bot installation
                  </span>
                </li>
              </ul>
              <Button 
                onClick={handleGetAccess}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition-colors duration-300"
              >
                Get Access
              </Button>
            </div>
          </div>

          <div className="group bg-[#0f1217]/80 backdrop-blur-sm p-8 rounded-xl border border-[#1c2331]/50 hover:border-green-400/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] interactive-card relative overflow-hidden">
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-full bg-[#1c2331]/80 flex items-center justify-center mb-6 group-hover:bg-[#1c2331] transition-colors duration-300">
                <Wallet className="h-7 w-7 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-green-400 transition-colors duration-300">
                Initial Capital
              </h3>
              <p className="text-gray-400/90 mb-6 leading-relaxed">
                Starting capital varies by bot type. Different strategies require different investment levels.
              </p>
              <ul className="mt-4 space-y-3 mb-6">
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-green-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Snipers: 10-20 SOL
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-green-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    AI Bots: 30-50 SOL
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-green-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Mev Bots: 50-100 SOL
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <Check className="h-4 w-4 text-green-400 mr-2 group-hover/item:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors duration-300">
                    Wallet Rotators: 30-100 SOL
                  </span>
                </li>
              </ul>
              <Button 
                onClick={handleGetAccess}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors duration-300"
              >
                Get Access
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 border border-glow-green/10 relative overflow-hidden hover:border-glow-green/30 transition-all duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-glow-green/10 rounded-full blur-3xl animate-pulse-glow"></div>
          <div
            className="absolute bottom-0 left-0 w-64 h-64 bg-warm-yellow/10 rounded-full blur-3xl animate-pulse-glow"
            style={{
              animationDelay: "1.5s",
            }}
          ></div>
          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-glow-green to-warm-yellow">
              We'll Handle the Setup
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Once you're ready, we build, install, and customize the bot you need — within just a few days.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-glow-green mb-2">Few Weeks</div>
                <p className="text-gray-300">Recover development costs</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warm-yellow mb-2">Few Months</div>
                <p className="text-gray-300">Grow your capital steadily</p>
              </div>
            </div>

            <div className="mt-8 pt-4 pl-2 pr-2 bg-gradient-to-r from-glow-green/10 to-warm-yellow/10 rounded-lg border border-glow-green/20 hover:border-glow-green/40 transition-all duration-500 group animate-pulse">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-glow-green/5 to-warm-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <p className="font-medium text-[30px] italic relative z-10 transform group-hover:scale-110 transition-transform duration-500 animate-[colorShift_3s_ease-in-out_infinite]" style={{
                  background: 'linear-gradient(90deg, #00ff99, #ff9900, #00ff99)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'colorShift 3s ease-in-out infinite'
                }}>
                  "You invest once. Your bot works non-stop."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
