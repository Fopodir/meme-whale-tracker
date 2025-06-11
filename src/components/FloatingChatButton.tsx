
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, AlarmClock } from 'lucide-react';
import { TelegramChat } from './TelegramChat';
import { useWebSocketContext } from '@/contexts/WebSocketContext';

export const FloatingChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { hasUnreadMessages } = useWebSocketContext();

  return (
    <>
      <Button
        onClick={() => setIsChatOpen(true)}
        className="!fixed !bottom-4 !right-4 !z-[9999] rounded-full h-14 w-14 bg-glow-green hover:bg-glow-green/90 text-midnight shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 relative"
        size="sm"
        style={{ 
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 9999
        }}
      >
        <MessageCircle className="h-6 w-6" />
        {hasUnreadMessages && (
          <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 animate-pulse">
            <AlarmClock className="h-3 w-3 text-white" />
          </div>
        )}
        <span className="sr-only">Open chat</span>
      </Button>
      
      <TelegramChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};
