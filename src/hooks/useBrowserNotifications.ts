import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

// Show browser notification for new messages
export const useBrowserNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const { toast } = useToast();

  // Check notification permission on mount
  useEffect(() => {
    if (!('Notification' in window)) {
      console.warn('⚠️ This browser does not support notifications');
      return;
    }

    setPermission(Notification.permission);

    // Listen for permission changes
    const handlePermissionChange = () => {
      setPermission(Notification.permission);
    };

    Notification.requestPermission().then(handlePermissionChange);
    window.addEventListener('permissionchange', handlePermissionChange);

    return () => {
      window.removeEventListener('permissionchange', handlePermissionChange);
    };
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      toast({
        title: "Notifications Not Supported",
        description: "Your browser does not support notifications.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        toast({
          title: "Notifications Enabled",
          description: "You will now receive notifications for new messages.",
        });
        return true;
      } else if (result === 'denied') {
        toast({
          title: "Notifications Blocked",
          description: "Please enable notifications in your browser settings to receive alerts.",
          variant: "destructive",
        });
      }
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast({
        title: "Error",
        description: "Failed to request notification permission.",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  // Show a notification
  const showBrowserNotification = useCallback(async (message: string) => {
    if (!('Notification' in window)) {
      console.warn('⚠️ This browser does not support notifications');
      return;
    }

    // If permission is not granted, request it
    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return;
    }

    try {
      // Close any existing notifications
      if (document.hidden) {
        const notification = new Notification('CryptoKing Support', {
          body: message,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: 'chat-notification', // This ensures only one notification is shown
          requireInteraction: true, // Notification stays until user interacts
          silent: true, // Don't play system sound (we'll use our custom sound)
        });

        // Handle notification click
        notification.onclick = () => {
          window.focus(); // Focus the window
          notification.close(); // Close the notification
        };

        // Auto close after 10 seconds if not interacted with
        setTimeout(() => {
          if (notification) {
            notification.close();
          }
        }, 10000);
      }
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }, [permission, requestPermission]);

  return {
    permission,
    requestPermission,
    showBrowserNotification,
    isSupported: 'Notification' in window,
  };
};
