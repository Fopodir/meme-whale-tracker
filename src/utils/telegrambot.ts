
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// You'll need to get your chat ID by messaging your bot first
const DEFAULT_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export interface ContactFormData {
  name: string;
  contact: string;
  wantOption: string;
  message: string;
  botType: string;
  visitorId?: string; // Optional visitor ID for tracking
}

// Generate a unique visitor ID
export const generateVisitorId = (): string => {
  return `visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const sendMessageToTelegram = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    
    // Get location data
    const locationResponse = await fetch('https://ipapi.co/json/');
    const locationData = await locationResponse.json();

    // Generate visitor ID if not provided
    const visitorId = formData.visitorId || generateVisitorId();
    
    const telegramMessage = `
🔔 New Contact Form Submission

#${visitorId} ✅

👤 Name: ${formData.name}
📱 Contact: ${formData.contact}
💡 I want: ${formData.wantOption}
🤖 Interested In: ${formData.botType}
🌐 IP: ${ipData.ip}
🌍 Country: ${locationData.country_name}
🏙️ City: ${locationData.city}
💬 Message:
${formData.message}

⏰ Submitted: ${new Date().toLocaleString()}
      `.trim();
    
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: DEFAULT_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status}`);
    }

    const result = await response.json();
    
    // Store visitor ID for potential replies
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentVisitorId', visitorId);
    }
    
    return result.ok;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
};

// Function to extract visitor ID from Telegram reply
export const extractVisitorIdFromReply = (replyText: string): string | null => {
  const match = replyText.match(/#([a-z0-9\-]+)/i);
  return match?.[1] || null;
};

// Function to handle incoming Telegram webhook (for bot replies)
export const handleTelegramWebhook = async (update: any) => {
  try {
    if (update.message && update.message.reply_to_message) {
      const replyText = update.message.reply_to_message.text;
      const visitorId = extractVisitorIdFromReply(replyText);
      
      if (visitorId) {
        const replyMessage = update.message.text;
        
        // Store the reply in localStorage or send to your frontend
        const replyData = {
          visitorId,
          message: replyMessage,
          timestamp: new Date().toISOString(),
          from: 'admin'
        };
        
        // You can extend this to send the reply to your frontend
        console.log('Reply received for visitor:', visitorId, replyData);
        
        // Store in localStorage for demo purposes
        if (typeof window !== 'undefined') {
          const existingReplies = JSON.parse(localStorage.getItem('telegramReplies') || '[]');
          existingReplies.push(replyData);
          localStorage.setItem('telegramReplies', JSON.stringify(existingReplies));
          
          // Trigger custom event for real-time updates
          window.dispatchEvent(new CustomEvent('telegramReply', { detail: replyData }));
        }
        
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error handling Telegram webhook:', error);
    return false;
  }
};
