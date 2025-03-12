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
        console.log(`Fetching ${type} with search query: ${searchQuery}`);
        
        const { data: supabaseData, error: searchError } = await supabase
          .from(`trending_${type}`)
          .select('*')
          .ilike('name', `%${searchQuery}%`)
          .order('volume', { ascending: false })
          .limit(10);

        if (searchError) throw searchError;
        
        if (!supabaseData || supabaseData.length < 5) {
          const { data: globalTrends } = await supabase.functions.invoke('fetch-global-trends');
          
          if (globalTrends?.trends) {
            const filteredTrends = globalTrends.trends
              .filter(trend => trend.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(trend => ({
                id: crypto.randomUUID(),
                name: trend,
                volume: 100,
                change_percentage: 0,
                created_at: new Date().toISOString()
              }));
            
            setResults([...(supabaseData || []), ...filteredTrends].slice(0, 10));
            return;
          }
        }
        
        console.log(`Fetched ${type} data:`, supabaseData);
        setResults(supabaseData as TrendingSearchItem[] || []);
      } catch (err) {
        console.error(`Error searching ${type}:`, err);
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
          event: 'INSERT',
          schema: 'public',
          table: `trending_${type}`
        },
        (payload) => {
          console.log(`Real-time ${type} update received:`, payload);
          setResults(current => {
            const newItem = payload.new as TrendingSearchItem;
            if (newItem.name.toLowerCase().includes(searchQuery.toLowerCase())) {
              const updatedResults = [...current, newItem];
              return updatedResults
                .sort((a, b) => b.volume - a.volume)
                .slice(0, 10);
            }
            return current;
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
