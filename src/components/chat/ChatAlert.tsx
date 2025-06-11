
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageCircle } from 'lucide-react';

interface ChatAlertProps {
  showAlert: boolean;
  alertMessage: string;
}

export const ChatAlert = ({ showAlert, alertMessage }: ChatAlertProps) => {
  if (!showAlert) return null;

  return (
    <Alert className="m-3 mb-2 border-glow-green/30 bg-glow-green/10">
      <MessageCircle className="h-4 w-4 text-glow-green" />
      <AlertDescription className="text-glow-green font-medium">
        <div className="font-semibold mb-1">New Message from Support!</div>
        <div className="text-sm opacity-90">{alertMessage}</div>
      </AlertDescription>
    </Alert>
  );
};
