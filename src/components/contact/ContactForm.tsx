
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendMessageToTelegram, generateVisitorId } from "@/utils/telegrambot";

export const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    contact: "",
    message: "",
    botType: "sniper",
    wantOption: "build-my-own",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const visitorId = generateVisitorId();
      
      const success = await sendMessageToTelegram({
        ...formState,
        visitorId
      });
      
      if (success) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you soon on Telegram. Your conversation ID has been saved.",
        });
        
        // Reset form
        setFormState({
          name: "",
          contact: "",
          message: "",
          botType: "sniper",
          wantOption: "build-my-own",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly on Telegram.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-card border-muted overflow-hidden">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="bg-muted border-muted/70"
                required
              />
            </div>
            
            <div>
              <label htmlFor="contact" className="block text-sm font-medium mb-2">
                Telegram Username or Phone Number
              </label>
              <Input
                id="contact"
                name="contact"
                value={formState.contact}
                onChange={handleChange}
                className="bg-muted border-muted/70"
                placeholder="@username or +1234567890"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                We'll contact you via Telegram for two-way communication
              </p>
            </div>
            
            <div>
              <label htmlFor="wantOption" className="block text-sm font-medium mb-2">
                I want...
              </label>
              <select
                id="wantOption"
                name="wantOption"
                value={formState.wantOption}
                onChange={handleChange}
                className="w-full rounded-md bg-muted border border-muted/70 py-2 px-3"
              >
                <option value="build-my-own">to build my own trading bot</option>
                <option value="build-mev">to build MEV bot</option>
                <option value="sniper-bot">a sniper bot for new tokens</option>
                <option value="copy-trading">copy trading functionality</option>
                <option value="ai-powered">AI-powered trading solutions</option>
                <option value="consultation">consultation on trading strategies</option>
                <option value="custom-solution">a custom trading solution</option>
                <option value="partnership">to discuss partnership opportunities</option>
                <option value="other">something else</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="botType" className="block text-sm font-medium mb-2">
                Interested In
              </label>
              <select
                id="botType"
                name="botType"
                value={formState.botType}
                onChange={handleChange}
                className="w-full rounded-md bg-muted border border-muted/70 py-2 px-3"
              >
                <option value="sniper">Sniper Bot</option>
                <option value="copy">Copy Trading Bot</option>
                <option value="mev">MEV Bot</option>
                <option value="ai">AI-Powered Bot</option>
                <option value="custom">Custom Bot</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                className="bg-muted border-muted/70 min-h-[120px]"
                placeholder="Tell us about your project or questions..."
                required
              />
            </div>
            
            <div>
              <Button
                type="submit"
                className="bg-glow-green hover:bg-glow-green/90 text-midnight w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-midnight" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending via Telegram...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send via Telegram Bot
                    <Send className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
