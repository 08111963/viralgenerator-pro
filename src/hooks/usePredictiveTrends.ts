import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

export interface TrendDetail {
  percentageChange: number;
  trend: 'up' | 'down' | 'stable';
  impact: 'alto' | 'medio' | 'basso';  
  velocity: 'rapida' | 'moderata' | 'lenta';
  factors: string[];
}

export interface PredictiveTrendData {
  time: string;
  followers: number;
  engagement: number;
  popularity: number;
  trends?: {
    followers: TrendDetail;
    engagement: TrendDetail;
    popularity: TrendDetail;
  };
}

export const usePredictiveTrends = () => {
  const { data: trendsData, isLoading, error, refetch } = useQuery({
    queryKey: ['predictive-trends'],
    queryFn: async () => {
      console.log('Fetching predictive trends data...');
      
      try {
        const { data: aiPredictions, error: aiError } = await supabase.functions.invoke('generate-predictions');
        
        if (aiPredictions?.predictions && Array.isArray(aiPredictions.predictions) && aiPredictions.predictions.length > 0) {
          console.log('Got AI predictions:', aiPredictions.predictions);
          return aiPredictions.predictions as PredictiveTrendData[];
        } else {
          console.warn('AI predictions invalid or empty:', aiPredictions);
          throw new Error('Invalid AI predictions format');
        }
      } catch (e) {
        console.error('Error getting AI predictions:', e);
        
        const { data, error } = await supabase
          .from('predictive_trends')
          .select('*')
          .order('time');

        if (error) {
          console.error('Error fetching predictive trends from DB:', error);
          throw error;
        }

        if (!data || data.length === 0) {
          console.warn('No data found in database');
          return [];
        }

        console.log('Found database trends:', data);
        return data as PredictiveTrendData[];
      }
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('predictive_trends_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'predictive_trends'
        },
        () => {
          console.log('Received real-time update for predictive trends');
          refetch(); // Refetch data when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return { data: trendsData, isLoading, error };
};
