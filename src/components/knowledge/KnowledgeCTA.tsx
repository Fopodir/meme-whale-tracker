
import { Button } from "@/components/ui/button";
import { Bot, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export default function KnowledgeCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-glow-green/10 to-warm-yellow/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ff99] to-[#00ccff]">
          Ready to Start Automated Trading?
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Explore our professional trading bot services and start maximizing your trading potential with proven automation strategies.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/services">
            <Button className="bg-gradient-to-r from-glow-green to-warm-yellow hover:from-warm-yellow hover:to-glow-green text-midnight text-lg font-medium px-8 py-3">
              <Bot className="mr-2 h-5 w-5" />
              View Our Bots
            </Button>
          </Link>
          <Link to="/contact">
            <Button
              variant="outline"
              className="border-glow-green text-glow-green hover:bg-glow-green hover:text-midnight text-lg font-medium px-8 py-3"
            >
              <DollarSign className="mr-2 h-5 w-5" />
              Get Custom Bot
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
