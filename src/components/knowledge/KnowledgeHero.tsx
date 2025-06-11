
import { BookOpen, Lightbulb, Users } from "lucide-react";

export default function KnowledgeHero() {
  return (
    <section className="py-20 bg-gradient-to-b from-midnight/5 to-[green]/10 relative">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ff99] to-[#00ccff]">
          Knowledge Base – Trading Bots & Infrastructure
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
          Welcome to our growing knowledge hub focused on modern trading bot development. This section is designed as a series of insightful articles covering the latest trends, tools, and best practices in the world of crypto bots.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-lg border border-muted/40">
            <BookOpen className="h-5 w-5 text-glow-green" />
            <span className="text-sm text-gray-300">Comprehensive Guides</span>
          </div>
          <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-lg border border-muted/40">
            <Lightbulb className="h-5 w-5 text-warm-yellow" />
            <span className="text-sm text-gray-300">Technical Insights</span>
          </div>
          <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-lg border border-muted/40">
            <Users className="h-5 w-5 text-blue-400" />
            <span className="text-sm text-gray-300">Expert Analysis</span>
          </div>
        </div>
      </div>
    </section>
  );
}
