
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CoinParticlesBackground from "@/components/CoinParticlesBackground";
import CursorEffect from "@/components/CursorEffect";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-inter bg-midnight relative flex flex-col items-center justify-center custom-cursor">
      {/* <CoinParticlesBackground />
      <CursorEffect /> */}
      
      <div className="text-center z-10 px-4">
        <div className="inline-block mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-glow-green animate-pulse-glow">404</h1>
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-glow-green/50 blur-sm"></div>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Page Not Found</h2>
        <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
          The bot couldn't locate the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <Link to="/">
          <Button className="bg-glow-green hover:bg-glow-green/90 text-midnight font-medium px-8 py-6 h-auto text-lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="absolute bottom-8 text-center text-gray-500 text-sm">
        <p>Bot Status: Idle - Awaiting new commands</p>
      </div>
    </div>
  );
};

export default NotFound;
