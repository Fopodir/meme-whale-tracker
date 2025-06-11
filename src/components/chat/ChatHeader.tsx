
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Bell, BellOff } from 'lucide-react';

interface ChatHeaderProps {
  isConnected: boolean;
  hasUnreadMessages: boolean;
  messagesLength: number;
  isMuted: boolean;
  soundEnabled: boolean;
  onToggleMute: () => void;
  onClose: () => void;
}

export const ChatHeader = ({
  isConnected,
  hasUnreadMessages,
  messagesLength,
  isMuted,
  soundEnabled,
  onToggleMute,
  onClose
}: ChatHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-muted/20">
      <CardTitle className="text-sm font-medium flex items-center text-foreground">
        <MessageCircle className="mr-2 h-4 w-4 text-glow-green" />
        Live Support Chat
        {!isConnected && (
          <span className="ml-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-xs rounded-full">
            Connecting...
          </span>
        )}
        {hasUnreadMessages && (
          <span className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-500 text-xs rounded-full">
            New
          </span>
        )}
        {messagesLength > 0 && !hasUnreadMessages && (
          <span className="ml-2 px-2 py-0.5 bg-glow-green/20 text-glow-green text-xs rounded-full">
            {messagesLength}
          </span>
        )}
      </CardTitle>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleMute}
          className={`h-6 w-6 p-0 hover:bg-muted/50 ${!soundEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={!soundEnabled 
            ? "Sound notifications not available" 
            : isMuted 
              ? "Enable notifications" 
              : "Mute notifications"
          }
          disabled={!soundEnabled}
        >
          {isMuted ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0 hover:bg-muted/50"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
};
