import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Hash, MessageCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useTranslation } from "react-i18next";

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

// Funzione per generare dati storici simulati
const generateHistoricalData = (items: TrendingItem[]) => {
  return items.slice(0, 5).map((item) => ({
    name: item.name,
    volume: item.volume,
    previous: item.volume - (item.volume * (item.change / 100))
  }));
};

export const TrendingCard = ({ title, items, icon }: TrendingCardProps) => {
  const { t } = useTranslation();
  
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

  const chartData = generateHistoricalData(items);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getIcon()}
          {title}
        </CardTitle>
        <CardDescription>{t('dashboard.trends.lastDay')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[200px] w-full mb-4">
            {icon === "hashtag" ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="volume" stroke="#9b87f5" fill="#D6BCFA" />
                  <Area type="monotone" dataKey="previous" stroke="#1A1F2C" fill="#F1F0FB" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="volume" fill="#9b87f5" />
                  <Bar dataKey="previous" fill="#D6BCFA" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground">
                  {item.volume.toLocaleString()} {t('dashboard.trends.mentions')}
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
