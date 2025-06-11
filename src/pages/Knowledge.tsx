
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

// Import Prism core first, then the theme, then the language components
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-solidity";

// Components
import KnowledgeHero from "@/components/knowledge/KnowledgeHero";
import TopicCard from "@/components/knowledge/TopicCard";
import BotTypesSection from "@/components/knowledge/BotTypesSection";
import ArticleSidebar from "@/components/knowledge/ArticleSidebar";
import ArticleContent from "@/components/knowledge/ArticleContent";
import FAQSection from "@/components/knowledge/FAQSection";
import KnowledgeCTA from "@/components/knowledge/KnowledgeCTA";

// Data
import { knowledgeTopics } from "@/data/knowledgeData";

export default function Knowledge() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const currentTopic = knowledgeTopics.find(topic => topic.id === selectedTopic);
  const currentArticle = currentTopic?.articles.find(article => article.id === selectedArticle);

  useEffect(() => {
    if (selectedTopic) {
      document.title = `${currentTopic?.title} - Knowledge Hub`;
    } else {
      document.title = "Knowledge Hub - Trading Bots & Infrastructure";
    }
  }, [selectedTopic, currentTopic]);

  const handleTopicClick = (topicId: string) => {
    const topic = knowledgeTopics.find(t => t.id === topicId);
    if (topic && topic.articles.length > 0) {
      setSelectedTopic(topicId);
      setSelectedArticle(topic.articles[0].id);
    }
  };

  const handleBackToHub = () => {
    setSelectedTopic(null);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen font-inter relative custom-cursor overflow-x-hidden z-10">
      <Header />
      
      <main className="pt-20">
        <KnowledgeHero />

        <section className="py-16">
          <div className="container mx-auto px-4">
            {!selectedTopic ? (
              <>
                <h2 className="text-3xl font-bold text-center mb-4 text-glow-green">Choose Your Topic</h2>
                <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                  Explore our comprehensive guides covering trending bots, infrastructure essentials, and performance optimization techniques.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {knowledgeTopics.map((topic) => (
                    <TopicCard
                      key={topic.id}
                      id={topic.id}
                      title={topic.title}
                      icon={topic.icon}
                      description={topic.description}
                      color={topic.color}
                      articleCount={topic.articles.length}
                      onClick={handleTopicClick}
                    />
                  ))}
                </div>

                <BotTypesSection />
              </>
            ) : (
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <Button 
                    variant="ghost" 
                    onClick={handleBackToHub}
                    className="text-glow-green hover:text-glow-green/80"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Knowledge Hub
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-1">
                    {currentTopic && (
                      <ArticleSidebar
                        articles={currentTopic.articles}
                        selectedArticle={selectedArticle}
                        onArticleSelect={setSelectedArticle}
                      />
                    )}
                  </div>

                  <div className="lg:col-span-3">
                    {currentArticle && <ArticleContent article={currentArticle} />}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {!selectedTopic && <FAQSection />}
        {!selectedTopic && <KnowledgeCTA />}
      </main>

      <Footer />
    </div>
  );
}
