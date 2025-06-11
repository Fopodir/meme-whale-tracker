import { create } from 'zustand'

interface Message {
  visitorId: string;
  content: string;
  timestamp: Date;
  type: 'visitor' | 'admin';
  telegramMessageId?: number;
}

interface WebSocketState {
  isConnected: boolean;
  visitorId: string | null;
  messages: Message[];
  error: string | null;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (content: string) => void;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 3000;
  private url: string;
  private onMessageCallback: ((message: Message) => void) | null = null;
  private onConnectionChangeCallback: ((connected: boolean) => void) | null = null;

  constructor(url: string) {
    this.url = url;
  }

  connect(onMessage: (message: Message) => void, onConnectionChange: (connected: boolean) => void) {
    this.onMessageCallback = onMessage;
    this.onConnectionChangeCallback = onConnectionChange;

    try {
      console.log('Connecting to WebSocket at:', this.url);
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('✅ WebSocket connected successfully');
        this.reconnectAttempts = 0;
        this.onConnectionChangeCallback?.(true);
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📨 Received WebSocket message:', {
            type: data.type,
            payload: data.payload,
            timestamp: new Date().toISOString()
          });
          
          switch (data.type) {
            case 'connection':
              // Store visitor ID from connection message
              if (data.payload.visitorId) {
                console.log('👤 Visitor ID assigned:', data.payload.visitorId);
                this.onMessageCallback?.({
                  visitorId: data.payload.visitorId,
                  content: 'Connected to chat',
                  timestamp: new Date(),
                  type: 'admin'
                });
              }
              break;

            case 'message':
              const message: Message = {
                visitorId: data.payload.visitorId || 'system',
                content: data.payload.content,
                timestamp: new Date(),
                type: data.payload.type || 'admin',
                telegramMessageId: data.payload.telegramMessageId
              };
              console.log('💬 Processing message:', {
                from: message.type === 'admin' ? 'Telegram Admin' : 'Visitor',
                content: message.content,
                telegramMessageId: message.telegramMessageId
              });
              this.onMessageCallback?.(message);
              break;

            case 'error':
              console.error('❌ WebSocket error:', data.payload.message);
              break;

            case 'pong':
              console.log('🔄 Received pong from server');
              break;

            default:
              console.warn('⚠️ Unknown message type:', data.type);
          }
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('🔌 WebSocket disconnected');
        this.onConnectionChangeCallback?.(false);
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        this.onConnectionChangeCallback?.(false);
      };

      // Setup ping/pong for connection health check
      setInterval(() => {
        if (this.ws?.readyState === WebSocket.OPEN) {
          console.log('🔄 Sending ping to server');
          this.ws.send(JSON.stringify({ type: 'ping' }));
        }
      }, 30000);

    } catch (error) {
      console.error('❌ Error connecting to WebSocket:', error);
      this.onConnectionChangeCallback?.(false);
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      setTimeout(() => {
        if (this.onMessageCallback && this.onConnectionChangeCallback) {
          this.connect(this.onMessageCallback, this.onConnectionChangeCallback);
        }
      }, this.reconnectTimeout);
    } else {
      console.error('❌ Max reconnection attempts reached');
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.onMessageCallback = null;
    this.onConnectionChangeCallback = null;
  }

  sendMessage(content: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('📤 Sending message to server:', {
        content,
        timestamp: new Date().toISOString()
      });
      this.ws.send(JSON.stringify({
        type: 'message',
        payload: { 
          content,
          type: 'visitor'
        }
      }));
    } else {
      console.error('❌ Cannot send message: WebSocket is not connected');
    }
  }
}

// Create WebSocket service instance
const wsService = new WebSocketService(import.meta.env.VITE_WS_URL || 'ws://localhost:3001');

// Create Zustand store for WebSocket state
export const useWebSocket = create<WebSocketState>((set, get) => ({
  isConnected: false,
  visitorId: null,
  messages: [],
  error: null,

  connect: () => {
    wsService.connect(
      (message) => {
        set((state) => {
          // Update visitorId if received in connection message
          if (message.type === 'admin' && message.content === 'Connected to chat') {
            return {
              messages: [...state.messages, message],
              visitorId: message.visitorId
            };
          }
          return {
            messages: [...state.messages, message]
          };
        });
      },
      (connected) => {
        set({ 
          isConnected: connected,
          error: connected ? null : 'Disconnected from server'
        });
      }
    );
  },

  disconnect: () => {
    wsService.disconnect();
    set({ isConnected: false });
  },

  sendMessage: (content: string) => {
    if (!get().isConnected) {
      set({ error: 'Not connected to server' });
      return;
    }

    const message: Message = {
      visitorId: get().visitorId || 'unknown',
      content,
      timestamp: new Date(),
      type: 'visitor'
    };

    set((state) => ({
      messages: [...state.messages, message],
      error: null
    }));

    wsService.sendMessage(content);
  }
})); 