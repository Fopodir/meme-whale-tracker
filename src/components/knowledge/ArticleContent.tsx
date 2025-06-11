
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Prism from "prismjs";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  metaTitle?: string;
  metaDescription?: string;
  content: string;
}

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
    }, 100);
    
    // Update document meta tags for SEO
    document.title = article.metaTitle || article.title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', article.metaDescription || article.excerpt);
  }, [article]);

  return (
    <article className="bg-card border border-muted rounded-lg">
      <div className="p-8">
        {/* SEO Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.metaDescription || article.excerpt,
            "author": {
              "@type": "Organization",
              "name": "Trading Bots Knowledge Hub"
            },
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString()
          })}
        </script>

        {/* Article Content with Enhanced HTML Rendering */}
        <div 
          className="prose prose-invert prose-xl max-w-none
            prose-headings:text-glow-green prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-5xl prose-h1:mb-10 prose-h1:pb-8 prose-h1:border-b-2 prose-h1:border-glow-green/20 prose-h1:bg-gradient-to-r prose-h1:from-glow-green prose-h1:to-glow-green/60 prose-h1:bg-clip-text prose-h1:text-transparent prose-h1:leading-tight
            prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-l-4 prose-h2:border-glow-green prose-h2:pl-8 prose-h2:bg-gradient-to-r prose-h2:from-gray-800/30 prose-h2:to-transparent prose-h2:py-4 prose-h2:rounded-r-xl prose-h2:shadow-lg prose-h2:backdrop-blur-sm
            prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-white prose-h3:font-semibold prose-h3:border-b prose-h3:border-gray-600/50 prose-h3:pb-3
            prose-h4:text-2xl prose-h4:mt-8 prose-h4:mb-4 prose-h4:text-glow-green/90 prose-h4:font-medium
            prose-h5:text-xl prose-h5:mt-6 prose-h5:mb-3 prose-h5:text-white/90 prose-h5:font-medium
            prose-h6:text-lg prose-h6:mt-4 prose-h6:mb-2 prose-h6:text-gray-300 prose-h6:font-medium prose-h6:uppercase prose-h6:tracking-wide
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-p:font-light
            prose-li:text-gray-300 prose-li:mb-3 prose-li:text-lg prose-li:leading-relaxed prose-li:font-light
            prose-ul:mb-8 prose-ul:space-y-3 prose-ol:mb-8 prose-ol:space-y-3
            prose-strong:text-glow-green prose-strong:font-bold prose-strong:bg-glow-green/10 prose-strong:px-2 prose-strong:py-1 prose-strong:rounded prose-strong:border prose-strong:border-glow-green/20
            prose-em:text-warm-yellow prose-em:font-medium prose-em:not-italic prose-em:bg-warm-yellow/10 prose-em:px-1 prose-em:rounded
            prose-code:text-glow-green prose-code:bg-gray-800/60 prose-code:px-3 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-glow-green/20 prose-code:shadow-sm
            prose-pre:bg-gray-900/90 prose-pre:border-2 prose-pre:border-gray-700/50 prose-pre:rounded-xl prose-pre:p-8 prose-pre:overflow-x-auto prose-pre:shadow-2xl prose-pre:backdrop-blur-sm
            prose-pre:code:text-gray-300 prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:border-0
            prose-table:text-gray-300 prose-table:border-collapse prose-table:bg-gray-800/20 prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-lg
            prose-th:text-glow-green prose-th:font-bold prose-th:border-b-2 prose-th:border-glow-green/40 prose-th:bg-gray-800/40 prose-th:py-4 prose-th:px-6 prose-th:text-left prose-th:uppercase prose-th:tracking-wide prose-th:text-sm
            prose-td:border-gray-700/30 prose-td:py-4 prose-td:px-6 prose-td:border-b
            prose-tr:hover:bg-gray-800/20 prose-tr:transition-colors
            prose-blockquote:border-l-4 prose-blockquote:border-glow-green prose-blockquote:bg-gradient-to-r prose-blockquote:from-gray-800/30 prose-blockquote:to-transparent prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:shadow-lg prose-blockquote:backdrop-blur-sm
            prose-blockquote:text-gray-200 prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:font-light
            prose-a:text-glow-green prose-a:font-medium prose-a:underline prose-a:decoration-glow-green/40 prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:decoration-glow-green hover:prose-a:text-glow-green/80 prose-a:transition-all
            prose-hr:border-gray-600/50 prose-hr:my-12
            prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-gray-700/50
            marker:prose-li:text-glow-green
            first-letter:prose-p:text-6xl first-letter:prose-p:float-left first-letter:prose-p:font-bold first-letter:prose-p:text-glow-green first-letter:prose-p:mr-2 first-letter:prose-p:leading-none first-letter:prose-p:mt-1"
          dangerouslySetInnerHTML={{ 
            __html: article.content
          }}
        />
        
        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-muted">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="border-glow-green/30 text-glow-green hover:bg-glow-green/10">
                <ExternalLink className="h-4 w-4 mr-2" />
                Share Article
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
