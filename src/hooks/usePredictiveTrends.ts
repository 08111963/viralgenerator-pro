
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface PredictiveTrendData {
  time: string;
  followers: number;
  engagement: number;
  popularity: number;
}

export const usePredictiveTrends = () => {
  return useQuery({
    queryKey: ['predictive-trends'],
    queryFn: async () => {
      console.log('Fetching predictive trends data...');
      
      const { data, error } = await supabase
        .from('predictive_trends')
        .select('*')
        .order('time');

      if (error) {
        console.error('Error fetching predictive trends:', error);
        throw error;
      }

      console.log('Found predictive trends:', data);
      
      return data as PredictiveTrendData[];
    },
    refetchInterval: 300000, // Refresh every 5 minutes
  });
};
