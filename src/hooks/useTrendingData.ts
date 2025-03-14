
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TrendingData {
  id: string;
  name: string;
  volume: number;
  change: number;
  change_percentage: number;
  confidence: number;
  validationIssues: string[];
  created_at: string;
}

export const useTrendingData = (type: 'hashtags' | 'keywords' | 'topics') => {
  return useQuery({
    queryKey: [`trending_${type}`],
    queryFn: async () => {
      console.log(`Fetching ${type} data...`);
      
      const { data, error } = await supabase
        .from(`trending_${type}`)
        .select('*')
        .order('volume', { ascending: false })
        .limit(10);

      if (error) {
        console.error(`Error fetching ${type} data:`, error);
        throw error;
      }

      console.log(`Received ${type} data:`, data);
      
      const transformedData = data?.map((item: any): TrendingData => ({
        id: item.id,
        name: item.name,
        volume: item.volume,
        change: item.change_percentage,
        change_percentage: item.change_percentage,
        confidence: 100,
        validationIssues: [],
        created_at: item.created_at
      })) || [];

      return transformedData;
    },
    refetchInterval: 30000,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
