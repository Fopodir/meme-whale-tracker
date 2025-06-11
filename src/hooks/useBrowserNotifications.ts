
// Show browser notification for new messages
export const useBrowserNotifications = () => {
  const showBrowserNotification = (messageContent: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Message from Support', {
        body: messageContent,
        icon: '/favicon.ico'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('New Message from Support', {
            body: messageContent,
            icon: '/favicon.ico'
          });
        }
      });
    }
  };

  return { showBrowserNotification };
};
