
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface TrendItem {
  id: string;
  name: string;
  volume: number;
  change: number;
}

export const useTrendingData = () => {
  const { data: trendingHashtags = [] } = useQuery({
    queryKey: ["trending-hashtags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trending_hashtags")
        .select("*")
        .order("volume", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching trending hashtags:", error);
        return [];
      }

      return data.map(hashtag => ({
        id: hashtag.id,
        name: hashtag.name,
        volume: hashtag.volume,
        change: Number(hashtag.change_percentage)
      }));
    }
  });

  const { data: trendingKeywords = [] } = useQuery({
    queryKey: ["trending-keywords"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trending_keywords")
        .select("*")
        .order("volume", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching trending keywords:", error);
        return [];
      }

      return data.map(keyword => ({
        id: keyword.id,
        name: keyword.name,
        volume: keyword.volume,
        change: Number(keyword.change_percentage)
      }));
    }
  });

  const { data: trendingTopics = [] } = useQuery({
    queryKey: ["trending-topics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trending_topics")
        .select("*")
        .order("volume", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching trending topics:", error);
        return [];
      }

      return data.map(topic => ({
        id: topic.id,
        name: topic.name,
        volume: topic.volume,
        change: Number(topic.change_percentage)
      }));
    }
  });

  return {
    trendingHashtags,
    trendingKeywords,
    trendingTopics
  };
};
