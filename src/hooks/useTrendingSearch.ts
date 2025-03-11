
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export type TrendingItemType = 'hashtags' | 'keywords' | 'topics';

export interface TrendingSearchItem {
  id: string;
  name: string;
  volume: number;
  change_percentage: number;
  created_at: string;
}

export const useTrendingSearch = (type: TrendingItemType, searchQuery: string) => {
  const [results, setResults] = useState<TrendingSearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error: searchError } = await supabase
          .from(`trending_${type}`)
          .select('*')
          .ilike('name', `%${searchQuery}%`)
          .order('volume', { ascending: false })
          .limit(10);

        if (searchError) throw searchError;
        setResults(data as TrendingSearchItem[] || []);
      } catch (err) {
        console.error('Search error:', err);
        setError('Error searching trends');
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      fetchResults();
    } else {
      setResults([]);
    }

    const channel = supabase
      .channel('trending_search_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: `trending_${type}`
        },
        (payload: { new: TrendingSearchItem }) => {
          setResults(current => {
            const updatedResults = [...current];
            const index = updatedResults.findIndex(item => item.id === payload.new.id);
            
            if (index > -1) {
              updatedResults[index] = payload.new;
            } else if (payload.new.name.toLowerCase().includes(searchQuery.toLowerCase())) {
              updatedResults.push(payload.new);
            }
            
            return updatedResults.sort((a, b) => b.volume - a.volume).slice(0, 10);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [type, searchQuery]);

  return { results, isLoading, error };
};
