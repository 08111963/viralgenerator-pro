
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
        .order('volume', { ascending: false })
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

      if (!data || data.length === 0) {
        console.log(`No ${icon}s found in the database, adding initial data...`);
        if (icon === 'hashtag') {
          const initialHashtags = [
            { name: '#AI', volume: 50000, change_percentage: 25 },
            { name: '#Tech', volume: 45000, change_percentage: 15 },
            { name: '#Innovation', volume: 40000, change_percentage: 10 },
            { name: '#Digital', volume: 35000, change_percentage: 8 },
            { name: '#Future', volume: 30000, change_percentage: 5 }
          ];

          for (const hashtag of initialHashtags) {
            const { error: insertError } = await supabase
              .from('trending_hashtags')
              .insert([hashtag]);
            
            if (insertError) {
              console.error('Error inserting hashtag:', insertError);
              toast({
                title: t('Error'),
                description: `Failed to insert initial hashtag: ${hashtag.name}`,
                variant: "destructive",
              });
              continue;
            }
          }

          // Fetch the newly inserted data
          const { data: newData, error: fetchError } = await supabase
            .from(tableName)
            .select('*')
            .order('volume', { ascending: false })
            .limit(10);

          if (fetchError) {
            console.error('Error fetching new data:', fetchError);
            toast({
              title: t('Error'),
              description: 'Failed to fetch updated data',
              variant: "destructive",
            });
            return [];
          }

          data = newData;
        }
      }

      if (!data) return [];

      return data.map(item => ({
        id: item.id,
        name: item.name,
        volume: item.volume,
        change: Number(item.change_percentage)
      }));
    },
    refetchInterval: 30000,
    staleTime: 25000
  });
};
