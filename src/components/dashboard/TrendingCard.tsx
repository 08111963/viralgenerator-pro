
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Hash, MessageCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

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

const generateHistoricalData = (items: TrendingItem[]) => {
  return items.map((item) => ({
    name: item.name,
    volume: item.volume,
    previous: item.volume - (item.volume * (item.change / 100))
  }));
};

export const TrendingCard = ({ title, items, icon }: TrendingCardProps) => {
  const { t } = useTranslation();

  const { data: trendingHashtags, isLoading: isLoadingHashtags } = useQuery({
    queryKey: ["trending-hashtags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trending_hashtags")
        .select("*")
        .order("volume", { ascending: false });

      if (error) {
        console.error("Error fetching trending hashtags:", error);
        return [];
      }

      return data.map(hashtag => ({
        id: hashtag.id,
        name: hashtag.name,
        volume: hashtag.volume,
        change: Number(hashtag.change_percentage)
      }));
    },
    enabled: icon === "hashtag"
  });

  const { data: trendingKeywords, isLoading: isLoadingKeywords } = useQuery({
    queryKey: ["trending-keywords"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trending_keywords")
        .select("*")
        .order("volume", { ascending: false });

      if (error) {
        console.error("Error fetching trending keywords:", error);
        return [];
      }
      
      return data.map(keyword => ({
        id: keyword.id,
        name: keyword.name,
        volume: keyword.volume,
        change: Number(keyword.change_percentage)
      }));
    },
    enabled: icon === "keyword"
  });
  
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

  const itemsToDisplay = (() => {
    if (icon === "hashtag") return trendingHashtags || [];
    if (icon === "keyword") return trendingKeywords || [];
    return items;
  })();

  const chartData = generateHistoricalData(itemsToDisplay);

  const isLoading = icon === "hashtag" ? isLoadingHashtags : icon === "keyword" ? isLoadingKeywords : false;

  if (isLoading) {
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
          <div className="flex items-center justify-center h-[200px]">
            <div className="animate-pulse h-4 w-24 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

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

          <div className="max-h-[300px] overflow-y-auto">
            {itemsToDisplay.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2">
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
        </div>
      </CardContent>
    </Card>
  );
};
