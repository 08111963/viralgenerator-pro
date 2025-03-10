import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
  created_at?: string;
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
        // Prima prova a generare nuove previsioni
        const { data: aiPredictions, error: aiError } = await supabase.functions.invoke('generate-predictions');
        
        if (aiPredictions?.predictions && Array.isArray(aiPredictions.predictions)) {
          console.log('Got new AI predictions:', aiPredictions.predictions);
          return aiPredictions.predictions as PredictiveTrendData[];
        }
        
        console.warn('Falling back to stored predictions');
        // Se fallisce, usa le previsioni salvate
        const { data, error } = await supabase
          .from('predictive_trends')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        return data as PredictiveTrendData[];
      } catch (e) {
        console.error('Error in predictions:', e);
        throw e;
      }
    },
    refetchInterval: 30000, // Aggiorna ogni 30 secondi
  });

  // Ascolta gli aggiornamenti in tempo reale
  useEffect(() => {
    const channel = supabase
      .channel('predictive_trends_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'predictive_trends'
        },
        () => {
          console.log('Received real-time update for predictive trends');
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return { data: trendsData, isLoading, error };
};
