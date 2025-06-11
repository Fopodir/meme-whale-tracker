import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { WalletProvider } from "@/context/WalletContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Promotion from "./pages/Promotion";
import Knowledge from "./pages/Knowledge";
import CoinParticlesBackground from "@/components/CoinParticlesBackground";
import CursorEffect from "@/components/CursorEffect";
import { Analytics } from "@vercel/analytics/react";
import { FloatingChatButton } from "@/components/FloatingChatButton";
import { WebSocketProvider } from '@/contexts/WebSocketContext';
import { useToast } from '@/hooks/use-toast';

const queryClient = new QueryClient();

// Scroll to top component that will be used in the router
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const { toast } = useToast();

  // Add custom cursor class to body
  useEffect(() => {
    document.body.classList.add('custom-cursor');
    
    return () => {
      document.body.classList.remove('custom-cursor');
    };
  }, []);
  
  // Add scroll animation observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll-visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all elements with the animate-on-scroll class
    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
      
      // Initialize interactive sections
      document.querySelectorAll('.interactive-section').forEach(section => {
        section.classList.add('in-view');
      });
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <WebSocketProvider>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <TooltipProvider>
            <div className="bg-background min-h-screen relative overflow-hidden">
              <CursorEffect />
              <CoinParticlesBackground />
              
              <div className="absolute inset-0 animated-gradient z-[-2]"></div>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/promotion" element={<Promotion />} />
                  <Route path="/knowledge" element={<Knowledge />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <FloatingChatButton />
              </BrowserRouter>
              <Analytics />
            </div>
          </TooltipProvider>
        </WalletProvider>
      </QueryClientProvider>
    </WebSocketProvider>
  );
};

export default App;
