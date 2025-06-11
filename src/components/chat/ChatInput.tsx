
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatInputProps {
  isOpen: boolean;
  isConnected: boolean;
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ isOpen, isConnected, onSendMessage }: ChatInputProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) return;

    setIsLoading(true);
    try {
      onSendMessage(trimmedMessage);
      setNewMessage('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="p-4 pt-2 border-t border-muted/20 bg-card/50">
      <div className="flex space-x-2">
        <Input
          ref={inputRef}
          value={newMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 bg-background/80 border-muted/40 focus:border-glow-green/50 focus:ring-glow-green/20"
          disabled={isLoading || !isConnected}
          maxLength={1000}
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading || !newMessage.trim() || !isConnected}
          size="sm"
          className="bg-glow-green hover:bg-glow-green/90 text-midnight shadow-sm"
        >
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-midnight/20 border-t-midnight rounded-full" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
