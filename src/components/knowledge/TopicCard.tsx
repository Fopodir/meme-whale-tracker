
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";

interface TopicCardProps {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  color: string;
  articleCount: number;
  onClick: (topicId: string) => void;
}

export default function TopicCard({ id, title, icon: IconComponent, description, color, articleCount, onClick }: TopicCardProps) {
  return (
    <Card 
      className="bg-card border border-muted hover:bg-green-500/15 hover:border-glow-green/50 transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(id)}
    >
      <CardHeader className="text-center">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-xl group-hover:text-glow-green transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{articleCount} articles</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );
}
