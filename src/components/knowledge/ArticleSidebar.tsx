
interface Article {
  id: string;
  title: string;
}

interface ArticleSidebarProps {
  articles: Article[];
  selectedArticle: string | null;
  onArticleSelect: (articleId: string) => void;
}

export default function ArticleSidebar({ articles, selectedArticle, onArticleSelect }: ArticleSidebarProps) {
  return (
    <div className="sticky top-24">
      <h3 className="text-lg font-semibold mb-4 text-glow-green">Articles in this section</h3>
      <nav className="space-y-2">
        {articles.map((article, index) => (
          <button
            key={article.id}
            onClick={() => onArticleSelect(article.id)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
              selectedArticle === article.id
                ? 'bg-glow-green/20 text-glow-green border border-glow-green/30'
                : 'bg-card border border-muted hover:bg-green-500/10 text-gray-300 hover:text-glow-green'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xs bg-gray-600 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-sm font-medium">{article.title}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
}
