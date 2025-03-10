
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
      
      // Cast the JSON fields to their proper types
      return data.map(report => ({
        ...report,
        trending_hashtags_summary: report.trending_hashtags_summary as WeeklyReport['trending_hashtags_summary'],
        trending_keywords_summary: report.trending_keywords_summary as WeeklyReport['trending_keywords_summary'],
        trending_topics_summary: report.trending_topics_summary as WeeklyReport['trending_topics_summary'],
      })) as WeeklyReport[];
    }
  });
};
