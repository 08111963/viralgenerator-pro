
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TrendingData {
  id: string;
  name: string;
  volume: number;
  change_percentage: number;
  created_at: string;
  change?: number;  // Optional to maintain compatibility
  confidence?: number;  // Optional to maintain compatibility
  validationIssues?: string[];  // Optional to maintain compatibility
}

export const useTrendingData = (type: 'hashtags' | 'keywords' | 'topics') => {
  return useQuery({
    queryKey: [`trending_${type}`],
    queryFn: async () => {
      console.log(`Fetching ${type} data...`);
      
      // Fetch data from Supabase
      const { data: dbData, error: dbError } = await supabase
        .from(`trending_${type}`)
        .select('*')
        .order('volume', { ascending: false })
        .limit(10);

      if (dbError) {
        console.error(`Error fetching ${type} data:`, dbError);
        throw dbError;
      }

      // If we have less than 5 items, fetch global trends
      if (!dbData || dbData.length < 5) {
        console.log(`Fetching global trends for ${type}...`);
        const { data: globalData, error: globalError } = await supabase.functions.invoke('fetch-global-trends');
        
        if (globalError) {
          console.error('Error fetching global trends:', globalError);
          throw globalError;
        }

        if (globalData?.trends) {
          // Convert global trends to our format
          const formattedTrends = globalData.trends
            .slice(0, 10)
            .map(trend => ({
              id: crypto.randomUUID(),
              name: trend,
              volume: Math.floor(Math.random() * 1000) + 100,
              change_percentage: Math.floor(Math.random() * 100) - 50,
              created_at: new Date().toISOString()
            }));

          // Combine with existing data if any
          const combinedData = [...(dbData || []), ...formattedTrends].slice(0, 10);
          console.log(`Returning combined data for ${type}:`, combinedData);
          return combinedData;
        }
      }

      console.log(`Returning database data for ${type}:`, dbData);
      return dbData || [];
    },
    refetchInterval: 180000, // Refresh every 3 minutes
    staleTime: 0, // This ensures data is always considered stale and will be refetched
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
