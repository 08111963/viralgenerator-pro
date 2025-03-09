
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export interface TrendingItem {
  id: string;
  name: string;
  volume: number;
  change: number;
  isTrending?: boolean;
}

export const useTrendingItems = (icon: "hashtag" | "keyword" | "topic") => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const tableName = `trending_${icon}s`;

  const { data = [], refetch, ...rest } = useQuery({
    queryKey: [`trending-${icon}s`],
    queryFn: async () => {
      console.log(`Fetching all ${icon}s from ${tableName}...`);
      
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
      
      let { data, error } = await supabase
        .from(tableName)
        .select('*')
        .gt('created_at', twentyFourHoursAgo.toISOString())
        .order('created_at', { ascending: false })
        .order('volume', { ascending: false })
        .limit(10);

      if (error) {
        console.error(`Error fetching ${icon}s:`, error);
        toast({
          title: t('Error'),
          description: `Failed to fetch ${icon}s`,
          variant: "destructive",
        });
        return [];
      }

      console.log(`Found ${data?.length || 0} ${icon}s:`, data);

      if (!data) return [];

      return data.map(item => ({
        id: item.id,
        name: item.name,
        volume: item.volume,
        change: item.change_percentage,
        isTrending: new Date(item.created_at) >= twentyFourHoursAgo && item.volume > 0
      }));
    },
    refetchInterval: 5000,
    staleTime: 3000
  });

  useEffect(() => {
    // Subscribe to real-time changes
    const channel = supabase
      .channel('trending-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: tableName
        },
        () => {
          // Refetch data when changes occur
          refetch();
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, refetch]);

  return { data, ...rest };
};
