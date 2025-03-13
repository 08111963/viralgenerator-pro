
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TrendingData {
  id: string;
  name: string;
  volume: number;
  change_percentage: number;
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
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error(`Error fetching ${type} data:`, error);
        throw error;
      }

      console.log(`Received ${type} data:`, data);
      return data || [];
    },
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 0, // Data is always considered stale
    gcTime: 0, // Immediately garbage collect old data
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
