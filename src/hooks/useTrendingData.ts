
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
      // Fetch data from Supabase
      const { data: dbData, error: dbError } = await supabase
        .from(`trending_${type}`)
        .select('*')
        .order('volume', { ascending: false })
        .limit(10);

      if (dbError) throw dbError;

      // If we have less than 5 items, fetch global trends
      if (!dbData || dbData.length < 5) {
        const { data: globalData, error: globalError } = await supabase.functions.invoke('fetch-global-trends');
        
        if (globalError) throw globalError;

        if (globalData?.trends) {
          // Convert global trends to our format
          const formattedTrends = globalData.trends
            .slice(0, 10)
            .map(trend => ({
              id: crypto.randomUUID(),
              name: trend,
              volume: Math.floor(Math.random() * 1000) + 100, // Random volume for demonstration
              change_percentage: Math.floor(Math.random() * 100) - 50, // Random change between -50 and +50
              created_at: new Date().toISOString()
            }));

          // Combine with existing data if any
          return [...(dbData || []), ...formattedTrends].slice(0, 10);
        }
      }

      return dbData || [];
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  });
};
