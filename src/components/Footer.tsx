import { Crown, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendMessageToTelegram, generateVisitorId } from "@/utils/telegrambot";

export default function Footer() {
  const [formState, setFormState] = useState({
    name: "",
    contact: "",
    message: "",
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
      
      await sendMessageToTelegram({
        ...formState,
        botType: "📞 Contact from footer",
        visitorId
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon on Telegram. Your conversation ID has been saved.",
      });
      
      setFormState({
        name: "",
        contact: "",
        message: "",
        wantOption: "build-my-own",
      });
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
    <footer className="bg-midnight/70 relative z-30 border-t border-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-glow-green to-warm-yellow flex items-center justify-center animate-pulse-glow transition-all duration-300 group-hover:scale-110">
                <Crown className="h-5 w-5 text-midnight animate-bounce" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-glow-green to-warm-yellow">
                CryptoKing
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Automated crypto trading solutions for modern markets, powered by cutting-edge algorithms and AI.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-glow-green transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-glow-green transition-colors">Services</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-glow-green transition-colors">Dashboard</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-glow-green transition-colors">Pricing</Link></li>
              <li><Link to="/knowledge" className="text-gray-400 hover:text-glow-green transition-colors">Knowledge</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-glow-green transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Social</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://x.com/crytokingmax" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-glow-green transition-colors">
                  X(Twitter)
                </a>
              </li>
              <li>
                <a href="mailto:cryptokingmax0@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-glow-green transition-colors">
                  Gmail
                </a>
              </li>
              <li>
                <a href="https://t.me/cryptokingmax" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-glow-green transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://github.com/cryptoking-max" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-glow-green transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://discord.com/cryptokingmax" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-glow-green transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <a href="https://t.me/cryptokingmax" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-muted rounded-md text-glow-green hover:bg-muted/80 transition-colors">
              Message on Telegram
            </a>
            <p className="mt-4 text-sm text-gray-400">
              Get in touch for custom bot development and trading solutions.
            </p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Quick Message</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name"
                className="bg-muted border-muted/70 text-sm h-8"
                required
              />
              <Input
                name="contact"
                value={formState.contact}
                onChange={handleChange}
                placeholder="@telegram or phone"
                className="bg-muted border-muted/70 text-sm h-8"
                required
              />
              <select
                name="wantOption"
                value={formState.wantOption}
                onChange={handleChange}
                className="w-full rounded-md bg-muted border border-muted/70 py-1 px-2 text-sm h-8"
              >
                <option value="build-my-own">Build my own bot</option>
                <option value="build-mev">Build MEV bot</option>
                <option value="sniper-bot">Sniper bot</option>
                <option value="copy-trading">Copy trading</option>
                <option value="ai-powered">AI-powered solutions</option>
                <option value="consultation">Consultation</option>
                <option value="custom-solution">Custom solution</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
              <Textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Quick message..."
                className="bg-muted border-muted/70 text-sm min-h-[60px]"
                required
              />
              <Button
                type="submit"
                className="bg-glow-green hover:bg-glow-green/90 text-midnight w-full h-8 text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-midnight" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send
                    <Send className="ml-1 h-3 w-3" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-muted mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CryptoKingMax. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
