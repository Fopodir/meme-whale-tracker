
import { useState, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  message: string;
  timestamp: string;
  from: 'visitor' | 'admin';
  visitorId?: string;
}

export const useTelegramChat = (visitorId?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Load existing messages from localStorage
    const loadMessages = () => {
      const storedReplies = JSON.parse(localStorage.getItem('telegramReplies') || '[]');
      const currentVisitorId = visitorId || localStorage.getItem('currentVisitorId');
      
      if (currentVisitorId) {
        const visitorMessages = storedReplies.filter((reply: any) => reply.visitorId === currentVisitorId);
        setMessages(visitorMessages.map((reply: any) => ({
          id: `${reply.timestamp}-${reply.from}`,
          message: reply.message,
          timestamp: reply.timestamp,
          from: reply.from
        })));
        setIsConnected(true);
      }
    };

    loadMessages();

    // Listen for real-time replies
    const handleTelegramReply = (event: CustomEvent) => {
      const replyData = event.detail;
      const currentVisitorId = visitorId || localStorage.getItem('currentVisitorId');
      
      if (replyData.visitorId === currentVisitorId) {
        const newMessage: ChatMessage = {
          id: `${replyData.timestamp}-${replyData.from}`,
          message: replyData.message,
          timestamp: replyData.timestamp,
          from: replyData.from
        };
        
        setMessages(prev => [...prev, newMessage]);
      }
    };

    window.addEventListener('telegramReply', handleTelegramReply as EventListener);

    return () => {
      window.removeEventListener('telegramReply', handleTelegramReply as EventListener);
    };
  }, [visitorId]);

  const addVisitorMessage = (message: string) => {
    const currentVisitorId = visitorId || localStorage.getItem('currentVisitorId');
    if (currentVisitorId) {
      const newMessage: ChatMessage = {
        id: `${Date.now()}-visitor`,
        message,
        timestamp: new Date().toISOString(),
        from: 'visitor'
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  return {
    messages,
    isConnected,
    addVisitorMessage
  };
};
