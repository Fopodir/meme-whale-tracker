
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useWebSocket } from '@/services/websocket';
import { useToast } from '@/hooks/use-toast';

interface WebSocketContextType {
  isConnected: boolean;
  visitorId: string | null;
  messages: any[];
  sendMessage: (content: string) => void;
  hasUnreadMessages: boolean;
  markMessagesAsRead: () => void;
  setChatOpen: (isOpen: boolean) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { messages, isConnected, visitorId, connect, disconnect, sendMessage } = useWebSocket();
  const { toast } = useToast();

  // Connect to WebSocket when the app starts
  useEffect(() => {
    console.log('🔌 Initializing WebSocket connection...');
    connect();

    // Cleanup on unmount
    return () => {
      console.log('🔌 Cleaning up WebSocket connection...');
      disconnect();
    };
  }, [connect, disconnect]);

  // Handle new messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === 'admin') {
        setHasUnreadMessages(true);
        // Only show toast notification if chat is not open
        if (!isChatOpen) {
          toast({
            title: "New Message from Support!",
            description: "You have a new reply from support.",
            duration: 1000,
          });
        }
      }
    }
  }, [messages, toast, isChatOpen]);

  const markMessagesAsRead = () => {
    setHasUnreadMessages(false);
  };

  const setChatOpen = (isOpen: boolean) => {
    setIsChatOpen(isOpen);
  };

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        visitorId,
        messages,
        sendMessage,
        hasUnreadMessages,
        markMessagesAsRead,
        setChatOpen,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
}
