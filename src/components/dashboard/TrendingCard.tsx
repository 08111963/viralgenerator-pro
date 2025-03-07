
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Hash, MessageCircle } from "lucide-react";

interface TrendingItem {
  id: string;
  name: string;
  volume: number;
  change: number;
}

interface TrendingCardProps {
  title: string;
  items: TrendingItem[];
  icon: "hashtag" | "keyword" | "topic";
}

export const TrendingCard = ({ title, items, icon }: TrendingCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case "hashtag":
        return <Hash className="h-4 w-4" />;
      case "keyword":
        return <MessageCircle className="h-4 w-4" />;
      case "topic":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getIcon()}
          {title}
        </CardTitle>
        <CardDescription>Trend delle ultime 24 ore</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground">
                  {item.volume.toLocaleString()} menzioni
                </span>
              </div>
              <span className={`text-sm ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.change >= 0 ? '+' : ''}{item.change}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
