
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  useEffect(() => {
    const checkPromoActive = () => {
      const now = new Date();
      const hoursSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60));
      const isPromoActive = hoursSinceEpoch % 20 < 15;
      
      if (!isPromoActive) {
        setIsVisible(false);
        return;
      }

      const hoursInCurrentCycle = hoursSinceEpoch % 20;
      const hoursRemaining = 15 - hoursInCurrentCycle;
      
      const endTime = new Date(now);
      endTime.setHours(endTime.getHours() + hoursRemaining);
      endTime.setMinutes(0);
      endTime.setSeconds(0);
      endTime.setMilliseconds(0);
      
      const timeDiff = endTime.getTime() - now.getTime();
      
      if (timeDiff > 0) {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    // Only run the timer if the banner is visible
    if (isVisible) {
      checkPromoActive();
      const interval = setInterval(checkPromoActive, 1000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);
  
  const handleClose = () => {
    setIsVisible(false);
    // Clear any existing intervals when closing
    clearInterval(0);
  };
  
  if (!isVisible) return null;


  return (
    <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white py-1 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-orange-500/20 to-yellow-500/20 animate-pulse"></div>
      
      <div className="container mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold animate-bounce">🔥</span>
            <span className="font-bold text-lg">UP TO 30% OFF</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm">Ends in:</span>
            <div className="flex items-center space-x-1 bg-black/20 rounded-lg px-3 py-1">
              <span className="font-mono text-lg font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="text-xs">h</span>
              <span className="font-mono text-lg font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="text-xs">m</span>
              <span className="font-mono text-lg font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="text-xs">s</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="https://t.me/cryptokingmax">
            <Button className="bg-white text-black hover:bg-gray-100 font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
              JOIN NOW
            </Button>
          </Link>
          
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors duration-200"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
