import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoinParticlesBackground from "@/components/CoinParticlesBackground";
import CursorEffect from "@/components/CursorEffect";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free Plan",
    price: "Free",
    description: "Essential trading tools for getting started",
    features: [
      "Manual buy and sell trading",
      "Ultra fast buy/sell execution",
      "Low trading fees",
      "No paid third-party fees",
      "Jito tip support",
      "Private node support",
      "Basic community support"
    ],
    free: true
  },
  {
    name: "Basic Access",
    price: "10 SOL",
    period: "monthly",
    description: "Perfect for beginners looking to automate their trading",
    features: [
      "All Free Plan features",
      "Solana Sniper Bot",
      "Enhanced Copy Trade Bot",
      "Time Decay Exit Bot",
      "Liquidity Trap Avoider Bot",
      "Mean Reversion Bot",
      "Basic Email Support",
      "Access to Discord community"
    ],
    limitations: [
      "No AI-powered tools",
      "No MEV protection",
      "No hybrid bots",
      "Limited wallet rotation",
    ]
  },
  {
    name: "Pro Access",
    price: "30 SOL",
    period: "monthly",
    description: "Complete toolkit for serious traders",
    features: [
      "All Basic Access features",
      "AI-Powered Smart Filter Bot",
      "Pump-Dump Detector Bot",
      "MEV Bot (Advanced)",
      "Wallet Rotator Strategy Bot",
      "Sniper + Copy Hybrid Bot",
      "Flash Mirror Bot",
      "Priority Telegram support",
      "Strategy consulting sessions"
    ],
    popular: true
  },
  {
    name: "Lifetime Custom Bot",
    price: "Contact",
    description: "Tailored solution for your specific needs",
    features: [
      "Custom bot development",
      "Personalized strategy implementation",
      "Integration with your existing tools",
      "One-time payment (no subscription)",
      "Source code ownership",
      "Lifetime updates",
      "24/7 priority support",
      "1-on-1 training sessions"
    ]
  }
];

export default function Pricing() {
  const [annually, setAnnually] = useState(false);
  
  return (
    <div className="min-h-screen font-inter relative custom-cursor z-10">
      {/* <CoinParticlesBackground /> */}
      {/* <CursorEffect /> */}
      
      <Header />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-midnight/10 to-[red]/10 relative animate-fade-in">
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-glow-green to-warm-yellow animate-gradient">
                Simple, Transparent Pricing
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Choose the perfect plan to automate your trading and gain an edge in the crypto markets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-card rounded-lg border shadow-lg hover:text-glow-green hover:shadow-glow-green/20 hover:border-glow-green hover:bg-green-400/10 transition-all duration-1000 animate-fade-in-up ${
                  plan.popular 
                    ? "transform hover:scale-105" 
                    : plan.free
                    ? "border-blue-500 hover:border-blue-400"
                    : "border-muted hover:scale-102"
                }`}
                style={{ animationDelay: `${0.5 + index * 0.5}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center animate-bounce-subtle">
                    <div className="bg-glow-green text-midnight px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                {plan.free && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center animate-bounce-subtle">
                    <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Free Forever
                    </div>
                  </div>
                )}
                
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-400 ml-2 mb-1">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <h4 className="font-medium text-white mb-3">Features</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start animate-fade-in-right" style={{ animationDelay: `${0.4 + i * 0.05}s` }}>
                          <Check className="h-5 w-5 text-glow-green mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                      
                      {plan.limitations && plan.limitations.map((limitation, i) => (
                        <li key={i} className="flex items-start text-gray-500 animate-fade-in-right" style={{ animationDelay: `${0.4 + i * 0.05}s` }}>
                          <span className="text-gray-500 mr-2 mt-0.5">✖</span>
                          <span className="text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {plan.free ? (
                    <Link to="/dashboard" className="block w-full">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full transition-all duration-300 hover:scale-105">
                        Get Started Free
                      </Button>
                    </Link>
                  ) : plan.price === "Contact" ? (
                    <a
                      href="https://t.me/cryptokingmax"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button 
                        className={`transition-all duration-300 hover:scale-105 ${
                          plan.popular
                            ? "bg-glow-green hover:bg-glow-green/90 text-midnight w-full"
                            : "bg-muted hover:bg-muted/70 text-white w-full"
                        }`}
                      >
                        Contact on Telegram
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  ) : (
                    <Link to="/dashboard" className="block w-full">
                      <Button 
                        className={`transition-all duration-300 hover:scale-105 ${
                          plan.popular
                            ? "bg-glow-green hover:bg-glow-green/90 text-midnight w-full"
                            : "bg-muted hover:bg-muted/70 text-white w-full"
                        }`}
                      >
                        Connect Wallet & Pay
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-20 bg-midnight/80 ">
        <div className="container mx-auto px-4 ">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="h-1 w-20 bg-glow-green mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto ">
            <div className="bg-card p-6 rounded-lg border border-muted  hover:text-glow-green hover: shadow-glow-green/20 hover:border-glow-green hover:bg-green-100/10">
              <h3 className="text-lg font-medium mb-3">How do I pay for access?</h3>
              <p className="text-gray-400 ">
                Payments are handled via Solana Pay. Just connect your Phantom or Backpack wallet, and send the required SOL to gain instant access.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-muted  hover:text-glow-green hover: shadow-glow-green/20 hover:border-glow-green hover:bg-green-100/10">
              <h3 className="text-lg font-medium mb-3">Can I cancel my subscription?</h3>
              <p className="text-gray-400">
                Yes, subscriptions are month-to-month with no long-term commitment. Simply don't renew payment for the next month to cancel.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-muted hover:text-glow-green hover: shadow-glow-green/20 hover:border-glow-green hover:bg-green-100/10">
              <h3 className="text-lg font-medium mb-3">Do I need technical knowledge?</h3>
              <p className="text-gray-400">
                Our bots feature user-friendly interfaces designed for all experience levels. For custom bots, we provide training and support.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-muted hover:text-glow-green hover: shadow-glow-green/20 hover:border-glow-green hover:bg-green-100/10">
              <h3 className="text-lg font-medium mb-3">What chains do you support?</h3>
              <p className="text-gray-400">
                Currently we support Solana and Ethereum. Support for additional chains like BNB Chain and Arbitrum is coming soon.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-muted  hover:text-glow-green hover: shadow-glow-green/20 hover:border-glow-green hover:bg-green-100/10">
              <h3 className="text-lg font-medium mb-3">Is there a refund policy?</h3>
              <p className="text-gray-400">
                We offer a 3-day money-back guarantee if you're not satisfied with our services. Contact us on Telegram for refund requests.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-muted hover:text-glow-green hover: shadow-glow-green/20 hover:border-glow-green hover:bg-green-100/10">
              <h3 className="text-lg font-medium mb-3">How secure are these bots?</h3>
              <p className="text-gray-400">
                Security is our priority. Our bots run client-side with your keys never leaving your system. We employ robust security measures and regular audits.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-midnight to-[#0a0d13]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-lg p-8 md:p-12 border border-muted relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-glow-green/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-warm-yellow/10 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Still Have Questions?</h2>
              <p className="text-xl text-gray-300 mb-8 text-center max-w-2xl mx-auto">
                Reach out directly to discuss your specific needs or learn more about how our bots can help you achieve your trading goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button className="bg-glow-green hover:bg-glow-green/90 text-midnight text-lg font-medium px-8 py-6 h-auto">
                    Start Trading Now
                  </Button>
                </Link>
                <a
                  href="https://t.me/cryptokingmax"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="border-glow-green text-glow-green hover:bg-glow-green/10 text-lg font-medium px-8 py-6 h-auto">
                    Chat on Telegram
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
