
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
  icon: "hashtag" | "keyword" | "topic";
}

const generateHistoricalData = (items: TrendingItem[]) => {
  return items.map((item) => ({
    name: item.name,
    volume: item.volume,
    previous: item.volume - (item.volume * (item.change / 100))
  }));
};

export const TrendingCard = ({ title, icon }: TrendingCardProps) => {
  const { t } = useTranslation();
  
  const tableName = `trending_${icon}s`;

  const { data: items = [], isLoading } = useQuery({
    queryKey: [`trending-${icon}s`],
    queryFn: async () => {
      console.log(`Fetching trending ${icon}s from ${tableName}...`);
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('volume', { ascending: false })
        .limit(10);

      if (error) {
        console.error(`Error fetching trending ${icon}s:`, error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.log(`No ${icon}s found in the database`);
        return [];
      }

      console.log(`Successfully fetched ${data.length} ${icon}s:`, data);
      
      return data.map(item => ({
        id: item.id,
        name: item.name,
        volume: item.volume,
        change: Number(item.change_percentage)
      }));
    },
    refetchOnWindowFocus: false,
    staleTime: 60000 // Consider data fresh for 1 minute
  });

  // Debug log to check final processed data
  console.log(`Processed ${icon}s data:`, items);

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

  // Debug log before rendering empty state
  if (!items || items.length === 0) {
    console.log(`Rendering empty state for ${icon}s`);
  }

  if (!items || items.length === 0) {
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
          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
            {t('dashboard.trends.noData')}
          </div>
        </CardContent>
      </Card>
    );
  }

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

          <div className="max-h-[300px] overflow-y-auto">
            {items.map((item) => (
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
