import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, ExternalLink, Star, GitFork, Users, BookOpen, TrendingUp, Calendar, Loader2, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useMultipleGitHubRepos } from "@/hooks/useGitHubData";
import { GitHubService } from "@/services/githubService";

const githubRepos = [
  {
    name: "Solana Meme Copy Trading Bot",
    description: "Ultra-fast on-chain sniper using Jupiter, private RPC, and Telegram API for instant meme token copy trading.",
    language: "JavaScript",
    url: "https://github.com/cryptoking-max/meme-copy-trading-bot",
    topics: ["solana", "jupiter", "copy-trading", "meme-token", "telegram-bot", "private-node"],
    fallbackStars: "74",
    fallbackForks: "74"
  },
  {
    name: "Meme Whale Tracker",
    description: "Powerful tool that tracks KOL wallets and filters newly launched tokens based on real-time activity from whales and influencers.",
    language: "TypeScript",
    url: "https://github.com/cryptoking-max/meme-whale-tracker",
    topics: ["solana", "whale-tracking", "memecoin", "blockchain-analysis", "defi", "tracker-app"],
    fallbackStars: "72",
    fallbackForks: "58"
  },
  {
    name: "Solana Sandwich Bot",
    description: "Advanced MEV bot specialized in sandwich attack opportunities with mempool monitoring and private transaction routing.",
    language: "TypeScript",
    url: "https://github.com/cryptoking-max/solana-sandwich-bot",
    topics: ["solana", "mev", "sandwich-attack", "mempool", "defi", "private-node"],
    fallbackStars: "89",
    fallbackForks: "7"
  },
  {
    name: "Solana Sniper Bot",
    description: "High-performance Solana sniper bot using Jupiter aggregator and private RPC nodes for instant token launches and MEV protection.",
    language: "TypeScript",
    url: "https://github.com/cryptoking-max/solana-sniper-bot",
    topics: ["solana", "jupiter", "sniper-bot", "defi", "private-node", "mev-protection"],
    fallbackStars: "118",
    fallbackForks: "12"
  },
  {
    name: "Solana Telegram Trading Bot",
    description: "Advanced Solana trading bot with instant buy/sell execution via Telegram commands and real-time price alerts.",
    language: "TypeScript",
    url: "https://github.com/cryptoking-max/ultra-buy-sell-telegram-trading-bot",
    topics: ["solana", "telegram-bot", "trading", "defi", "automation"],
    fallbackStars: "118",
    fallbackForks: "1"
  },
  {
    name: "Solana Meme Token Launchpad",
    description: "Next.js frontend for launching and managing Solana meme tokens with built-in tokenomics and fair launch features.",
    language: "TypeScript",
    url: "https://github.com/cryptoking-max/solana-token-launch",
    topics: ["solana", "nextjs", "token-launch", "defi", "meme-token"],
    fallbackStars: "245",
    fallbackForks: "89"
  }
];

const blogPosts = [
  {
    title: "I'm Launching My Custom Crypto Trading Bot Service — Here's Why",
    excerpt: "I've been quietly building high-performance trading bots for years. Now I'm opening up my tools, strategies, and custom services to the public — starting with free code and transparent walkthroughs.",
    readTime: "8 min read",
    views: "0k",
    date: "2025-05-29",
    url: "https://medium.com/@cryptokingmax/im-launching-my-custom-crypto-trading-bot-service-here-s-why-d81f2966c989",
    category: "Tutorial",
    source: "Medium"
  },
  {
    title: "Grand Opening: Launching My Custom Trading Bot Service",
    excerpt: "Exciting announcement of our new trading bot service offering crypto/memecoin bots, copytrading, and snipers. Join us in revolutionizing automated trading on Solana.",
    readTime: "1 min read",
    views: "0k",
    date: "2025-05-29",
    url: "https://x.com/crytokingmax/status/1928133019115630796",
    category: "Announcement",
    source: "Twitter"
  },
  {
    title: "What I Build: Custom Trading Bots for DeFi",
    excerpt: "Comprehensive overview of our custom trading bot development services, including CEX/DEX integration, Telegram automation, copytrading systems, and sniper bots for ETH, SOL, and BSC networks.",
    readTime: "1 min read",
    views: "0k",
    date: "2025-05-29",
    url: "https://x.com/crytokingmax/status/1928133575028752437",
    category: "Services",
    source: "Twitter"
  },
  {
    title: "Free Solana Copy Bot Released",
    excerpt: "Just dropped a free Solana copy bot with same-block snipes and Telegram control. Perfect for beginners looking to automate their trading strategies.",
    readTime: "1 min read",
    views: "0k",
    date: "2025-05-29",
    url: "https://x.com/crytokingmax/status/1928133855422087532",
    category: "Open Source",
    source: "Twitter"
  },
  {
    title: "Why Custom Bots Win",
    excerpt: "Generic bots don't provide a trading edge. Custom bots allow you to implement your own logic and rules for maximum control and profitability.",
    readTime: "1 min read",
    views: "0k",
    date: "2025-05-29",
    url: "https://x.com/crytokingmax/status/1928134219974266940",
    category: "Strategy",
    source: "Twitter"
  },
  {
    title: "Proof of Work: Successful Bot Implementations",
    excerpt: "Demonstrating real-world success with our custom bots: successful token snipes, wallet tracking, and automated profit notifications via Telegram. Check out our GitHub repositories for implementation details.",
    readTime: "2 min read",
    views: "0k",
    date: "2025-05-29",
    url: "https://x.com/crytokingmax/status/1928134494684323872",
    category: "Case Study",
    source: "Twitter"
  },
];

export default function Promotion() {
  const [activeTab, setActiveTab] = useState<'repos' | 'blog'>('repos');
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Fetch real GitHub data for all repositories with refresh capability
  const reposData = useMultipleGitHubRepos(githubRepos);

  // Function to force refresh GitHub data
  const handleRefreshStats = () => {
    GitHubService.clearCache(); // Clear the cache
    setRefreshKey(prev => prev + 1); // Force re-render
  };

  const handleRepoClick = (url: string) => {
    window.open(url, "_blank");
  };

  const handleBlogClick = (url: string) => {
    window.open(url, "_blank");
  };

  const handleFollowGitHub = () => {
    window.open("https://github.com/cryptoking-max", "_blank");
  };

  const handleFollowBlog = () => {
    window.open("https://x.com/crytokingmax", "_blank");
  };

  return (
    <div className="min-h-screen font-inter relative custom-cursor overflow-x-hidden z-10">
      <Header />
      
      <main className=" pt-20 z-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-midnight/5 to-[green]/10 relative">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ff99] to-[#00ccff]">
              Open Source & Knowledge
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Explore our cutting-edge GitHub repositories and in-depth blog posts about DeFi, trading automation, and blockchain development.
            </p>
            
            <div className="flex justify-center gap-4 mb-12">
              <Button
                onClick={handleFollowGitHub}
                className="bg-gradient-to-r from-glow-green to-warm-yellow hover:from-warm-yellow hover:to-glow-green text-midnight text-lg font-medium px-8 transition-all duration-300 hover:scale-105"
              >
                <Github className="mr-2 h-5 w-5" />
                Follow on GitHub
              </Button>
              <Button
                onClick={handleRefreshStats}
                variant="outline"
                className="border-glow-green text-glow-green hover:bg-glow-green hover:text-midnight text-lg font-medium px-8 transition-all duration-300 hover:scale-105"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Refresh Stats
              </Button>
              <Button
                onClick={handleFollowBlog}
                variant="outline"
                className="border-glow-green text-glow-green hover:bg-glow-green hover:text-midnight text-lg font-medium px-8 transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Follow Blog
              </Button>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-2">
              <div className="bg-card border border-muted rounded-lg p-1">
                <Button
                  variant={activeTab === 'repos' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('repos')}
                  className={`px-6 py-2 ${activeTab === 'repos' ? 'bg-glow-green text-midnight' : 'text-gray-300'}`}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Repositories
                </Button>
                <Button
                  variant={activeTab === 'blog' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('blog')}
                  className={`px-6 py-2 ${activeTab === 'blog' ? 'bg-glow-green text-midnight' : 'text-gray-300'}`}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Blog Posts
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {activeTab === 'repos' && (
              <div>
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-3xl font-bold text-glow-green">Popular Repositories</h2>
                  <Button
                    onClick={handleRefreshStats}
                    variant="ghost"
                    className="text-glow-green hover:text-glow-green/80"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Stats
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {githubRepos.map((repo, index) => {
                    const repoStats = reposData[index] || { 
                      stars: repo.fallbackStars || '0', 
                      forks: repo.fallbackForks || '0', 
                      loading: true, 
                      error: false 
                    };
                    
                    return (
                      <Card 
                        key={`${repo.url}-${refreshKey}`}
                        className="bg-card border border-muted hover:bg-green-500/15 hover:border-glow-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-glow-green/10 cursor-pointer"
                        onClick={() => handleRepoClick(repo.url)}
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">{repo.name}</h3>
                            <ExternalLink className="h-5 w-5 text-gray-400" />
                          </div>
                          
                          <p className="text-gray-400 mb-4">{repo.description}</p>
                          
                          <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-warm-yellow" />
                              {repoStats.loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : repoStats.error ? (
                                <span className="text-gray-400">{repo.fallbackStars}</span>
                              ) : (
                                repoStats.stars
                              )}
                            </div>
                            <div className="flex items-center">
                              <GitFork className="h-4 w-4 mr-1 text-glow-green" />
                              {repoStats.loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : repoStats.error ? (
                                <span className="text-gray-400">{repo.fallbackForks}</span>
                              ) : (
                                repoStats.forks
                              )}
                            </div>
                            <span className="text-xs bg-glow-green/20 text-glow-green px-2 py-1 rounded">
                              {repo.language}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {repo.topics.slice(0, 3).map((topic, topicIndex) => (
                              <span 
                                key={topicIndex}
                                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div>
                <h2 className="text-3xl font-bold text-center mb-12 text-glow-green">Latest Blog Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogPosts.map((post, index) => (
                    <Card 
                      key={index}
                      className="bg-card border border-muted hover:bg-green-500/15 hover:border-glow-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-glow-green/10 cursor-pointer"
                      onClick={() => handleBlogClick(post.url)}
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-warm-yellow/20 text-warm-yellow px-2 py-1 rounded">
                              {post.category}
                            </span>
                            <span className="text-xs bg-glow-green/20 text-glow-green px-2 py-1 rounded">
                              {post.source}
                            </span>
                          </div>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </div>
                        
                        <h3 className="text-xl font-semibold text-white mb-3">{post.title}</h3>
                        <p className="text-gray-400 mb-4">{post.excerpt}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-300">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                            <span>{post.readTime}</span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1 text-glow-green" />
                            {post.views} views
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-glow-green/10 to-warm-yellow/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ff99] to-[#00ccff]">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Stay updated with the latest developments, contribute to our open-source projects, and learn from our detailed tutorials.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleFollowGitHub}
                className="bg-gradient-to-r from-glow-green to-warm-yellow hover:from-warm-yellow hover:to-glow-green text-midnight text-lg font-medium px-8 py-3"
              >
                <Github className="mr-2 h-5 w-5" />
                Star Our Repos
              </Button>
              <Button
                onClick={handleFollowBlog}
                variant="outline"
                className="border-glow-green text-glow-green hover:bg-glow-green hover:text-midnight text-lg font-medium px-8 py-3"
              >
                <Users className="mr-2 h-5 w-5" />
                Subscribe to Blog
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
