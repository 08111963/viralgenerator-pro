
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface WeeklyReport {
  id: string;
  week_start: string;
  week_end: string;
  trending_hashtags_summary: {
    top_hashtags: Array<{
      name: string;
      volume: number;
      change: number;
    }>;
  };
  trending_keywords_summary: {
    top_keywords: Array<{
      name: string;
      volume: number;
      change: number;
    }>;
  };
  trending_topics_summary: {
    top_topics: Array<{
      name: string;
      volume: number;
      change: number;
    }>;
  };
  created_at: string;
}

export const useWeeklyReports = () => {
  return useQuery({
    queryKey: ["weekly-reports"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("weekly_reports")
        .select("*")
        .order("week_start", { ascending: false });

      if (error) throw error;
      return data as WeeklyReport[];
    }
  });
};
