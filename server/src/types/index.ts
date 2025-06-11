import { WebSocket } from 'ws';

export interface Visitor {
  id: string;
  wsConnection: WebSocket;
  lastSeen: Date;
  telegramMessageId?: number; // To track which Telegram message this visitor is associated with
}

export interface Message {
  visitorId: string;
  content: string;
  timestamp: Date;
  type: 'visitor' | 'admin';
  telegramMessageId?: number; // To track message threading
}

export interface TelegramMessage {
  message_id: number;
  from: {
    id: number;
    first_name: string;
    username?: string;
  };
  chat: {
    id: number;
    type: string;
  };
  text: string;
  reply_to_message?: {
    message_id: number;
    text: string;
    from: {
      id: number;
      first_name: string;
      username?: string;
    };
  };
}

export interface WebSocketMessage {
  type: 'message' | 'ping' | 'pong' | 'error' | 'connection';
  payload: {
    content?: string;
    visitorId?: string;
    type?: 'connection' | 'visitor' | 'admin';
    message?: string;
    telegramMessageId?: number;
  };
} 