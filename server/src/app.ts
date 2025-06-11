import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketManager } from './services/WebSocketManager';
import { TelegramService } from './services/TelegramService';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Initialize services
const wsManager = new WebSocketManager(httpServer);
const telegramService = new TelegramService(
  process.env.TELEGRAM_BOT_TOKEN!,
  Number(process.env.TELEGRAM_CHAT_ID!),
  wsManager
);

// Connect WebSocketManager with TelegramService
wsManager.setTelegramService(telegramService);

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST']
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Telegram webhook endpoint
app.post('/webhook/telegram', async (req, res) => {
  try {
    await telegramService.handleUpdate(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling Telegram webhook:', error);
    res.sendStatus(500);
  }
});

// Setup Telegram webhook on startup
if (process.env.TELEGRAM_WEBHOOK_URL) {
  telegramService.setupWebhook(process.env.TELEGRAM_WEBHOOK_URL)
    .then(() => {
      console.log('Telegram webhook set up successfully');
    })
    .catch((error) => {
      console.error('Failed to set up Telegram webhook:', error);
    });
}

// Cleanup inactive visitors periodically
setInterval(() => {
  wsManager.cleanupInactiveVisitors();
}, 300000); // Every 5 minutes

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export { app, httpServer }; 