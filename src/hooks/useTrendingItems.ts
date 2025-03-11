
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { validateTrendData } from "@/utils/dataValidation";

export interface TrendingItem {
  id: string;
  name: string;
  volume: number;
  change: number;
  isTrending?: boolean;
  confidence: number;
  validationIssues: string[];
  historicalData?: { volume: number; timestamp: string }[];
}

type IconType = "hashtags" | "keywords" | "topics";

export const useTrendingItems = (type: IconType) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const tableName = `trending_${type}`;

  const { data = [], refetch, ...rest } = useQuery({
    queryKey: [`trending-${type}`],
    queryFn: async () => {
      console.log(`Fetching all ${type} from ${tableName}...`);
      
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data: currentData, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false })
        .order('volume', { ascending: false })
        .limit(10);

      if (error) {
        console.error(`Error fetching ${type}:`, error);
        toast({
          title: t('Error'),
          description: `Failed to fetch ${type}`,
          variant: "destructive",
        });
        return [];
      }

      const { data: historicalData, error: historicalError } = await supabase
        .from(tableName)
        .select('volume, created_at')
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: true });

      if (historicalError) {
        console.error('Error fetching historical data:', historicalError);
      }

      if (!currentData) return [];

      return currentData.map((item: any) => {
        const itemHistoricalData = historicalData
          ?.filter((h: any) => h.created_at < item.created_at)
          .map((h: any) => ({
            volume: h.volume,
            timestamp: h.created_at
          })) || [];

        const validation = validateTrendData(
          item.volume,
          item.change_percentage,
          itemHistoricalData
        );

        return {
          id: item.id,
          name: item.name,
          volume: item.volume,
          change: item.change_percentage,
          isTrending: new Date(item.created_at) >= thirtyDaysAgo && item.volume > 0,
          confidence: validation.confidence,
          validationIssues: validation.issues,
          historicalData: itemHistoricalData
        };
      });
    },
    refetchInterval: 5000,
    staleTime: 3000
  });

  useEffect(() => {
    const channel = supabase
      .channel('trending-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, refetch]);

  return { data, ...rest };
};
