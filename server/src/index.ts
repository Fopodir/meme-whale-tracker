import { httpServer } from './app';

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`CORS Origin: ${process.env.CORS_ORIGIN}`);
  console.log(`Telegram Webhook URL: ${process.env.TELEGRAM_WEBHOOK_URL || 'Not configured'}`);
}); 