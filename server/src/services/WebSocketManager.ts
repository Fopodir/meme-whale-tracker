import { WebSocket, WebSocketServer } from 'ws';
import { Visitor, WebSocketMessage, Message } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { TelegramService } from '../services/TelegramService';

export class WebSocketManager {
  private visitors: Map<string, Visitor> = new Map();
  private wss: WebSocketServer;
  private telegramMessageToVisitor: Map<number, string> = new Map(); // Maps Telegram message IDs to visitor IDs
  private telegramService: TelegramService | null = null;

  constructor(server: any) {
    this.wss = new WebSocketServer({ server });
    this.initialize();
  }

  public setTelegramService(service: TelegramService) {
    this.telegramService = service;
  }

  private initialize() {
    this.wss.on('connection', (ws: WebSocket) => {
      const visitorId = uuidv4();
      console.log(`New WebSocket connection established. Visitor ID: ${visitorId}`);
      
      // Add new visitor
      this.visitors.set(visitorId, {
        id: visitorId,
        wsConnection: ws,
        lastSeen: new Date()
      });

      // Send visitor ID to client
      const connectionMessage: WebSocketMessage = {
        type: 'connection',
        payload: { 
          type: 'connection',
          visitorId 
        }
      };
      console.log('Sending connection message:', connectionMessage);
      this.sendToVisitor(visitorId, connectionMessage);

      // Handle incoming messages
      ws.on('message', async (data: string) => {
        console.log(`Received message from visitor ${visitorId}:`, data.toString());
        try {
          const message = JSON.parse(data) as WebSocketMessage;
          const visitorMessage = this.handleMessage(visitorId, message);
          
          // If we got a visitor message, forward it to Telegram
          if (visitorMessage && this.telegramService) {
            console.log('📤 Forwarding message to Telegram service:', visitorMessage);
            try {
              await this.telegramService.sendMessageToTelegram(visitorMessage);
            } catch (error) {
              console.error('❌ Error forwarding message to Telegram:', error);
              this.sendToVisitor(visitorId, {
                type: 'error',
                payload: { message: 'Failed to send message to support. Please try again.' }
              });
            }
          }
        } catch (error) {
          console.error('Error parsing message:', error);
          this.sendToVisitor(visitorId, {
            type: 'error',
            payload: { message: 'Invalid message format' }
          });
        }
      });

      // Handle disconnection
      ws.on('close', () => {
        this.visitors.delete(visitorId);
        console.log(`Visitor ${visitorId} disconnected`);
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error(`WebSocket error for visitor ${visitorId}:`, error);
        this.visitors.delete(visitorId);
      });

      // Setup ping/pong for connection health check
      const pingInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.ping();
        } else {
          clearInterval(pingInterval);
        }
      }, 30000);

      ws.on('pong', () => {
        const visitor = this.visitors.get(visitorId);
        if (visitor) {
          visitor.lastSeen = new Date();
        }
      });
    });
  }

  private handleMessage(visitorId: string, message: WebSocketMessage) {
    console.log('🔍 Handling visitor message:', {
      visitorId,
      messageType: message.type,
      payload: message.payload
    });

    const visitor = this.visitors.get(visitorId);
    if (!visitor) {
      console.warn(`❌ Visitor ${visitorId} not found when handling message`);
      return;
    }

    visitor.lastSeen = new Date();

    switch (message.type) {
      case 'message':
        if (!message.payload.content) {
          console.warn('⚠️ Received message without content:', message);
          this.sendToVisitor(visitorId, {
            type: 'error',
            payload: { message: 'Message must include content' }
          });
          return;
        }
        // Handle visitor message
        const visitorMessage: Message = {
          visitorId,
          content: message.payload.content,
          timestamp: new Date(),
          type: 'visitor'
        };
        console.log('📤 Forwarding visitor message to Telegram:', visitorMessage);
        // Return the message to be forwarded to Telegram
        return visitorMessage;

      case 'ping':
        console.log(`🔄 Received ping from visitor ${visitorId}`);
        this.sendToVisitor(visitorId, { type: 'pong', payload: {} });
        break;

      default:
        console.warn('⚠️ Unknown message type:', message.type);
        this.sendToVisitor(visitorId, {
          type: 'error',
          payload: { message: `Unknown message type: ${message.type}` }
        });
    }
  }

  public sendToVisitor(visitorId: string, message: WebSocketMessage) {
    const visitor = this.visitors.get(visitorId);
    if (visitor && visitor.wsConnection.readyState === WebSocket.OPEN) {
      const messageStr = JSON.stringify(message);
      console.log('📨 Sending message to visitor:', {
        visitorId,
        messageType: message.type,
        payload: message.payload
      });
      visitor.wsConnection.send(messageStr);
    } else {
      console.warn('❌ Cannot send message to visitor:', {
        visitorId,
        reason: visitor ? 'connection not open' : 'visitor not found',
        state: visitor?.wsConnection.readyState
      });
    }
  }

  public handleTelegramReply(telegramMessage: { message_id: number, text: string, reply_to_message?: { message_id: number } }) {
    console.log('Handling Telegram reply:', {
      messageId: telegramMessage.message_id,
      replyToMessageId: telegramMessage.reply_to_message?.message_id,
      text: telegramMessage.text
    });

    if (!telegramMessage.reply_to_message) {
      console.warn('Received Telegram message without reply_to_message');
      return;
    }

    const visitorId = this.telegramMessageToVisitor.get(telegramMessage.reply_to_message.message_id);
    console.log('Current telegramMessageToVisitor map:', Array.from(this.telegramMessageToVisitor.entries()));
    console.log('Looking for visitor with message ID:', telegramMessage.reply_to_message.message_id);
    console.log('Found visitor ID:', visitorId);

    if (!visitorId) {
      console.warn(`No visitor found for Telegram message ${telegramMessage.reply_to_message.message_id}`);
      return;
    }

    const visitor = this.visitors.get(visitorId);
    console.log('Current visitors:', Array.from(this.visitors.keys()));
    console.log('Found visitor:', visitor);

    if (!visitor) {
      console.warn(`Visitor ${visitorId} not found when handling Telegram reply`);
      return;
    }

    // Send the reply back to the visitor
    this.sendToVisitor(visitorId, {
      type: 'message',
      payload: {
        content: telegramMessage.text,
        type: 'admin',
        telegramMessageId: telegramMessage.message_id
      }
    });
  }

  public associateTelegramMessage(visitorId: string, telegramMessageId: number) {
    console.log('🔗 Associating Telegram message with visitor:', {
      visitorId,
      telegramMessageId,
      currentMapSize: this.telegramMessageToVisitor.size
    });
    
    this.telegramMessageToVisitor.set(telegramMessageId, visitorId);
    const visitor = this.visitors.get(visitorId);
    if (visitor) {
      visitor.telegramMessageId = telegramMessageId;
      console.log('✅ Updated visitor with Telegram message ID:', {
        visitorId,
        telegramMessageId,
        currentMapSize: this.telegramMessageToVisitor.size,
        mapContents: Array.from(this.telegramMessageToVisitor.entries())
      });
    } else {
      console.warn('❌ Visitor not found when associating Telegram message:', visitorId);
    }
  }

  public getVisitor(visitorId: string): Visitor | undefined {
    return this.visitors.get(visitorId);
  }

  public getAllVisitors(): Visitor[] {
    return Array.from(this.visitors.values());
  }

  public cleanupInactiveVisitors(maxInactiveTime: number = 3600000) { // 1 hour default
    const now = new Date();
    for (const [visitorId, visitor] of this.visitors.entries()) {
      if (now.getTime() - visitor.lastSeen.getTime() > maxInactiveTime) {
        visitor.wsConnection.close();
        this.visitors.delete(visitorId);
        // Clean up telegram message mapping
        if (visitor.telegramMessageId) {
          this.telegramMessageToVisitor.delete(visitor.telegramMessageId);
        }
      }
    }
  }

  public getVisitorByTelegramMessage(telegramMessageId: number): Visitor | undefined {
    const visitorId = this.telegramMessageToVisitor.get(telegramMessageId);
    if (visitorId) {
      return this.visitors.get(visitorId);
    }
    return undefined;
  }

  public getVisitorIdByTelegramMessage(telegramMessageId: number): string | undefined {
    return this.telegramMessageToVisitor.get(telegramMessageId);
  }
} 