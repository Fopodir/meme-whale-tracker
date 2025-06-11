import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import { useToast } from '@/hooks/use-toast';
import { useNotificationSound } from '@/hooks/useNotificationSound';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';
import { ChatAlert } from '@/components/chat/ChatAlert';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { ChatInput } from '@/components/chat/ChatInput';

interface TelegramChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramChat = ({ isOpen, onClose }: TelegramChatProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const { messages, isConnected, sendMessage, hasUnreadMessages, markMessagesAsRead, setChatOpen } = useWebSocketContext();
  const { toast } = useToast();
  const prevMessageCount = useRef(messages.length);
  const { soundEnabled, playNotificationSound } = useNotificationSound();
  const { showBrowserNotification, permission, requestPermission } = useBrowserNotifications();

  // Request notification permission when chat is first opened
  useEffect(() => {
    if (isOpen && permission === 'default') {
      requestPermission();
    }
  }, [isOpen, permission, requestPermission]);

  // Notify context when chat opens/closes
  useEffect(() => {
    setChatOpen(isOpen);
  }, [isOpen, setChatOpen]);

  // Mark messages as read when chat is opened
  useEffect(() => {
    if (isOpen && hasUnreadMessages) {
      markMessagesAsRead();
    }
  }, [isOpen, hasUnreadMessages, markMessagesAsRead]);

  // Show alert and play sound for new messages
  useEffect(() => {
    if (messages.length > prevMessageCount.current) {
      const newMessages = messages.slice(prevMessageCount.current);
      const latestMessage = newMessages[newMessages.length - 1];
      
      // Show alert for admin messages
      if (latestMessage.type === 'admin' && latestMessage.content !== 'Connected to chat') {
        setAlertMessage(latestMessage.content);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);

        // Show browser notification if chat is not open
        if (!isOpen) {
          showBrowserNotification(latestMessage.content);
        }

        // Play sound for new messages
        if (!isMuted && soundEnabled) {
          playNotificationSound();
        }
      }
    }
    prevMessageCount.current = messages.length;
  }, [messages, isOpen, isMuted, soundEnabled, showBrowserNotification, playNotificationSound]);

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    
    // Test sound when unmuting
    if (newMuteState === false && soundEnabled) {
      playNotificationSound();
    }

    toast({
      title: newMuteState ? "Notifications Muted" : "Notifications Enabled",
      description: newMuteState 
        ? "Sound notifications are now muted."
        : soundEnabled 
          ? "You will receive sound notifications for new messages."
          : "Sound notifications are not available.",
      duration: 2000,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 h-[500px] bg-card/95 backdrop-blur-sm border-muted shadow-xl">
        <ChatHeader
          isConnected={isConnected}
          hasUnreadMessages={hasUnreadMessages}
          messagesLength={messages.length}
          isMuted={isMuted}
          soundEnabled={soundEnabled}
          onToggleMute={toggleMute}
          onClose={onClose}
        />

        <CardContent className="p-0 flex flex-col h-full">
          <ChatAlert showAlert={showAlert} alertMessage={alertMessage} />
          <ChatMessages messages={messages} isOpen={isOpen} />
          <ChatInput 
            isOpen={isOpen}
            isConnected={isConnected}
            onSendMessage={sendMessage}
          />
        </CardContent>
      </Card>
    </div>
  );
};
