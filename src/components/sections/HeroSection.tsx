
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MemeCoin from "@/components/MemeCoin";
import { useAnimatedCoins } from "@/hooks/useAnimatedCoins";

export default function HeroSection() {
  const { orbitalAngles, wobble, getCoinPosition } = useAnimatedCoins();
  const movableCoinsRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const movableCoins = movableCoinsRef.current;
  //   if (!movableCoins) return;
  //   const handleMouseMove = (e: MouseEvent) => {
  //     const { left, top, width, height } = movableCoins.getBoundingClientRect();
  //     const centerX = left + width / 2;
  //     const centerY = top + height / 2;
  //     const deltaX = (e.clientX - centerX) / 40;
  //     const deltaY = (e.clientY - centerY) / 40;
  //     movableCoins.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  //   };
  //   document.addEventListener("mousemove", handleMouseMove);
  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  const solPosition = getCoinPosition(orbitalAngles.sol, wobble.sol.x, wobble.sol.y);
  const ethPosition = getCoinPosition(orbitalAngles.eth, wobble.eth.x, wobble.eth.y);
  const btcPosition = getCoinPosition(orbitalAngles.btc, wobble.btc.x, wobble.btc.y);
  const bonkPosition = getCoinPosition(orbitalAngles.bonk, wobble.bonk.x, wobble.bonk.y);
  const jtoPosition = getCoinPosition(orbitalAngles.jto, wobble.jto.x, wobble.jto.y);

  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-32 relative interactive-section">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div
            className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 animate-fade-in-up"
            style={{
              animationDelay: "0.5s",
            }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-glow-green to-warm-yellow">
                Automated Crypto Trading
              </span>
              <br />
              <span className="text-white">Solutions for Modern Markets</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              Custom trading bots on Solana and Ethereum with advanced features like MEV protection, sniper trading, and token launch
              automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start interactive-element">
              <Link to="/dashboard">
                <Button className="bg-glow-green hover:bg-glow-green/90 text-midnight text-lg font-medium px-8 py-6 h-auto hover:scale-105 transition-all duration-300 shadow-lg shadow-glow-green/20">
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  variant="outline"
                  className="border-glow-green text-glow-green hover:bg-glow-green/10 text-lg font-medium px-8 py-6 h-auto hover:scale-105 transition-all duration-300"
                >
                  Explore Bots
                </Button>
              </Link>
            </div>
          </div>

          <div
            className="lg:w-1/2 relative animate-fade-in-up"
            style={{
              animationDelay: "0.4s",
            }}
          >
            <div ref={movableCoinsRef} className="relative h-120 w-120 mx-auto transition-transform duration-200 interactive-element">
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-36 h-36 bg-warm-yellow rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-glow-green rounded-full blur-2xl opacity-20 animate-pulse"></div>

              <div
                className="absolute bg-gradient-to-br from-warm-yellow to-orange-500 rounded-full flex items-center justify-center shadow-lg coin-element transition-all duration-700"
                style={{
                  top: `calc(50% + ${solPosition.y}px)`,
                  left: `calc(50% + ${solPosition.x}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <MemeCoin type="sol" price={200} />
              </div>

              <div
                className="absolute bg-gradient-to-br from-glow-green to-green-700 rounded-full flex items-center justify-center shadow-lg coin-element transition-all duration-700"
                style={{
                  top: `calc(50% + ${ethPosition.y}px)`,
                  left: `calc(50% + ${ethPosition.x}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <MemeCoin type="eth" price={3500} />
              </div>

              <div
                className="absolute bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg coin-element transition-all duration-700"
                style={{
                  top: `calc(50% + ${btcPosition.y}px)`,
                  left: `calc(50% + ${btcPosition.x}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <MemeCoin type="btc" price={0.000012} />
              </div>

              <div
                className="absolute bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg coin-element transition-all duration-700"
                style={{
                  top: `calc(50% + ${bonkPosition.y}px)`,
                  left: `calc(50% + ${bonkPosition.x}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <MemeCoin type="bonk" price={0.00002} />
              </div>

              <div
                className="absolute bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg coin-element transition-all duration-700"
                style={{
                  top: `calc(50% + ${jtoPosition.y}px)`,
                  left: `calc(50% + ${jtoPosition.x}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <MemeCoin type="jto" price={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
