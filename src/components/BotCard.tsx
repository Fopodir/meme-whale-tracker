
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, MoreVertical, Github, Star, GitFork } from "lucide-react";
import { useParticleEffect } from "@/hooks/useParticleEffect";

interface BotCardProps {
  title: string;
  description: string;
  features: string[];
  stats: {
    roi: string;
    winRate?: string;
    timeframe: string;
  };
  price?: string;
  github?: {
    url: string;
    stars: string;
    forks: string;
  };
}

export default function BotCard({ title, description, features, stats, price = "10~15 SOL", github }: BotCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { createParticleBurst, createEnhancedParticleBurst } = useParticleEffect();
  
  // Determine color based on bot title/type
  const getBotColor = () => {
    if (title.toLowerCase().includes('ai')) return ['#9D50FF', '#E5DEFF'];
    if (title.toLowerCase().includes('sniper')) return ['#2FF980', '#4BF8FF'];
    if (title.toLowerCase().includes('copy')) return ['#FFD864', '#FDE1D3'];
    if (title.toLowerCase().includes('mev')) return ['#FF6B6B', '#FFDEE2'];
    return ['#00C6FF', '#D3E4FD']; // Default colors
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    createEnhancedParticleBurst(e.currentTarget, 4, 8, getBotColor());
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isHovered && Math.random() < 0.1) { // 10% chance to create particles on mouse move
      createParticleBurst(e.currentTarget, 3, getBotColor());
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleGetAccess = () => {
    // Create a burst of particles when clicking Get Access
    const botElement = document.getElementById(`bot-${title.replace(/\s+/g, '-').toLowerCase()}`);
    if (botElement) {
      createEnhancedParticleBurst(botElement, 6, 12, getBotColor());
    }
    
    // Open Telegram link in new tab
    window.open("https://t.me/cryptokingmax", "_blank");
  };

  const handleGitHubClick = () => {
    // Open specific GitHub repo link in new tab
    if (github?.url) {
      window.open(github.url, "_blank");
    } else {
      window.open("https://github.com/cryptokingmax", "_blank");
    }
  };

  return (
    <Card 
      id={`bot-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className={`bg-card border border-muted hover:bg-green-500/15 hover:border-glow-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-glow-green/10 overflow-hidden h-full ${
        isHovered ? 'scale-[1.02]' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-gray-400 mb-6">{description}</p>
        
        <ul className="space-y-2 mb-6 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 text-glow-green mr-2 mt-1 shrink-0" />
              <span className="text-sm text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* GitHub Stats */}
        {github && (
          <div className="flex items-center gap-4 mb-4 p-3 bg-gray-800/50 rounded-lg">
            <Github className="h-4 w-4 text-gray-400" />
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-warm-yellow" />
                <span className="text-gray-300">{github.stars}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="h-3 w-3 text-glow-green" />
                <span className="text-gray-300">{github.forks}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-auto">
          <div>
            <div className="text-glow-green text-lg font-semibold">{stats.roi}</div>
            {stats.winRate && <div className="text-xs text-gray-400">Win Rate: {stats.winRate}</div>}
            <div className="text-xs text-gray-400">{stats.timeframe}</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-warm-yellow font-bold">{price}</span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                className="text-xs border-gray-600 hover:bg-gray-700"
                onClick={handleGitHubClick}
              >
                GitHub
              </Button>
              <Button 
                size="sm" 
                className="bg-glow-green hover:bg-glow-green/90 text-midnight font-semibold"
                onClick={handleGetAccess}
              >
                Get Access
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
