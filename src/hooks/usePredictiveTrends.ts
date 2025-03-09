
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
      
      // Prima proviamo a ottenere previsioni AI
      try {
        const { data: aiPredictions, error: aiError } = await supabase.functions.invoke('generate-predictions');
        
        if (aiPredictions && !aiError) {
          console.log('Got AI predictions:', aiPredictions);
          return aiPredictions.predictions;
        }
      } catch (e) {
        console.error('Error getting AI predictions:', e);
      }

      // Fallback ai dati del database se l'AI fallisce
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
    refetchInterval: 300000, // Refresh ogni 5 minuti
  });
};
