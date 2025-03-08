
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export interface TrendingItem {
  id: string;
  name: string;
  volume: number;
  change: number;
}

export const useTrendingItems = (icon: "hashtag" | "keyword" | "topic") => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const tableName = `trending_${icon}s`;

  return useQuery({
    queryKey: [`trending-${icon}s`],
    queryFn: async () => {
      console.log(`Fetching trending ${icon}s from ${tableName} for last 12 hours...`);
      
      const twelveHoursAgo = new Date();
      twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 12);
      
      let { data, error } = await supabase
        .from(tableName)
        .select('*')
        .gte('created_at', twelveHoursAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error(`Error fetching trending ${icon}s:`, error);
        toast({
          title: t('Error'),
          description: `Failed to fetch trending ${icon}s`,
          variant: "destructive",
        });
        return [];
      }

      console.log(`Found ${data?.length || 0} ${icon}s in last 12 hours:`, data);

      if (!data) return [];

      return data.map(item => ({
        id: item.id,
        name: item.name,
        volume: item.volume,
        change: item.change_percentage
      }));
    },
    refetchInterval: 5000, // Refresh every 5 seconds
    staleTime: 3000
  });
};
