import TelegramBot from 'node-telegram-bot-api';
import { TelegramMessage, Message } from '../types';
import { WebSocketManager } from './WebSocketManager';

export class TelegramService {
  private bot: TelegramBot;
  private webSocketManager: WebSocketManager;
  private adminChatId: number;

  constructor(token: string, adminChatId: number, webSocketManager: WebSocketManager) {
    this.bot = new TelegramBot(token, { polling: false });
    this.webSocketManager = webSocketManager;
    this.adminChatId = adminChatId;
  }

  public async setupWebhook(webhookUrl: string) {
    try {
      await this.bot.setWebHook(webhookUrl);
      console.log('Telegram webhook set up successfully');
    } catch (error) {
      console.error('Error setting up Telegram webhook:', error);
      throw error;
    }
  }

  public async handleUpdate(update: TelegramBot.Update) {
    try {
      if (!update.message) {
        console.log('⚠️ No message in update');
        return;
      }

      const message = update.message;
      if (!message.text) {
        console.log('⚠️ Message has no text content:', {
          updateId: update.update_id,
          messageId: message.message_id
        });
        return;
      }

      console.log('📥 Received Telegram update:', {
        updateId: update.update_id,
        messageId: message.message_id,
        replyToMessageId: message.reply_to_message?.message_id,
        text: message.text
      });

      if (message.reply_to_message) {
        console.log('🔄 Handling reply to visitor message');
        const replyToMessageId = message.reply_to_message.message_id;
        console.log('🔍 Looking for visitor with message ID:', replyToMessageId);
        const visitorId = this.webSocketManager.getVisitorIdByTelegramMessage(replyToMessageId);
        console.log('Found visitor ID:', visitorId);

        if (visitorId) {
          console.log('📨 Forwarding reply to visitor:', {
            visitorId,
            messageId: message.message_id,
            content: message.text
          });
          this.webSocketManager.sendToVisitor(visitorId, {
            type: 'message',
            payload: {
              content: message.text,
              type: 'admin',
              telegramMessageId: message.message_id
            }
          });
        } else {
          console.warn('❌ No visitor found for Telegram message:', replyToMessageId);
          // Send error message back to admin
          await this.bot.sendMessage(
            this.adminChatId,
            '❌ Error: Could not find the visitor to reply to. The chat session may have expired.',
            { reply_to_message_id: message.message_id }
          );
        }
      } else {
        console.log('📝 Received direct message to bot:', {
          messageId: message.message_id,
          from: message.from,
          chat: message.chat,
          text: message.text
        });
        // Handle direct messages to the bot if needed
      }
    } catch (error) {
      console.error('❌ Error handling Telegram webhook:', error);
      // Try to notify admin about the error
      try {
        await this.bot.sendMessage(
          this.adminChatId,
          '❌ Error processing message. Please check server logs.'
        );
      } catch (notifyError) {
        console.error('Failed to notify admin about error:', notifyError);
      }
      throw error;
    }
  }

  public async sendMessageToTelegram(visitorMessage: Message) {
    try {
      console.log('Sending message to Telegram:', {
        visitorId: visitorMessage.visitorId,
        content: visitorMessage.content,
        chatId: process.env.TELEGRAM_CHAT_ID
      });

      const message = await this.bot.sendMessage(
        process.env.TELEGRAM_CHAT_ID!,
        `Visitor ${visitorMessage.visitorId}:\n${visitorMessage.content}`,
        { parse_mode: 'HTML' }
      );

      console.log('Message sent to Telegram:', {
        messageId: message.message_id,
        visitorId: visitorMessage.visitorId
      });

      // Associate the Telegram message ID with the visitor
      this.webSocketManager.associateTelegramMessage(visitorMessage.visitorId, message.message_id);
      
      return message;
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
      throw error;
    }
  }

  public async removeWebhook() {
    try {
      await this.bot.deleteWebHook();
      console.log('Telegram webhook removed successfully');
    } catch (error) {
      console.error('Error removing Telegram webhook:', error);
      throw error;
    }
  }

  public async sendMessage(visitorId: string, content: string): Promise<number | null> {
    try {
      console.log('📤 Sending message to Telegram:', { visitorId, content });
      const message = await this.bot.sendMessage(this.adminChatId, content);
      console.log('✅ Message sent to Telegram:', {
        messageId: message.message_id,
        visitorId,
        content
      });
      
      // Associate the message ID with the visitor
      this.webSocketManager.associateTelegramMessage(visitorId, message.message_id);
      return message.message_id;
    } catch (error) {
      console.error('❌ Error sending message to Telegram:', {
        visitorId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return null;
    }
  }
} 