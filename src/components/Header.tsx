import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Crown } from "lucide-react";
import ConnectWalletButton from "@/components/ConnectWalletButton";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Pricing", path: "/pricing" },
    { name: "Knowledge", path: "/knowledge" },
    { name: "Promotion", path: "/promotion" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 bg-midnight/10 backdrop-blur-lg`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-glow-green to-warm-yellow flex items-center justify-center animate-pulse-glow transition-all duration-300 group-hover:scale-110">
              <Crown className="h-5 w-5 text-midnight animate-bounce" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-glow-green to-warm-yellow group-hover:scale-105 transition-transform">
              CryptoKing
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium px-2 py-1 rounded-md transition-all duration-300 hover:scale-110 ${
                    location.pathname === item.path
                      ? "text-glow-green"
                      : "text-gray-300 hover:text-white hover:bg-muted/30"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <ConnectWalletButton />
          </div>
          
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:bg-muted/30 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-muted animate-fade-in-up">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-2 py-2 rounded-md transition-all duration-300 ${
                    location.pathname === item.path
                      ? "text-glow-green bg-muted/30"
                      : "text-gray-300 hover:text-white hover:bg-muted/20"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-2">
                <ConnectWalletButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
