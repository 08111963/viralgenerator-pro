
import { default as ApiKeyDisplay } from "@/components/dashboard/ApiKeyDisplay";
import { AddTrendForm } from "@/components/dashboard/AddTrendForm";
import { PremiumFeatureOverlay } from "./PremiumFeatureOverlay";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TrendItem {
  name: string;
  volume: number;
  change: number;
}

export const FeatureSection = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const addHashtagMutation = useMutation({
    mutationFn: async (newHashtag: TrendItem) => {
      const { error } = await supabase
        .from("trending_hashtags")
        .insert([{
          name: newHashtag.name,
          volume: newHashtag.volume,
          change_percentage: newHashtag.change
        }]);

      if (error) {
        console.error("Error adding hashtag:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trending-hashtags'] });
    },
    onError: (error) => {
      console.error("Error adding hashtag:", error);
      toast({
        title: t('Error'),
        description: t('dashboard.addTrend.error'),
        variant: "destructive",
      });
    }
  });

  const addKeywordMutation = useMutation({
    mutationFn: async (newKeyword: TrendItem) => {
      const { error } = await supabase
        .from("trending_keywords")
        .insert([{
          name: newKeyword.name,
          volume: newKeyword.volume,
          change_percentage: newKeyword.change
        }]);

      if (error) {
        console.error("Error adding keyword:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trending-keywords'] });
    },
    onError: (error) => {
      console.error("Error adding keyword:", error);
      toast({
        title: t('Error'),
        description: t('dashboard.addTrend.error'),
        variant: "destructive",
      });
    }
  });

  const handleAddHashtag = async (newHashtag: TrendItem) => {
    addHashtagMutation.mutate(newHashtag);
    toast({
      title: t('dashboard.addTrend.hashtagAdded'),
      description: t('dashboard.addTrend.hashtagAddedDesc', { name: newHashtag.name }),
    });
  };

  const handleAddKeyword = async (newKeyword: TrendItem) => {
    addKeywordMutation.mutate(newKeyword);
    toast({
      title: t('dashboard.addTrend.keywordAdded'),
      description: t('dashboard.addTrend.keywordAddedDesc', { name: newKeyword.name }),
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
      <PremiumFeatureOverlay>
        <ApiKeyDisplay />
      </PremiumFeatureOverlay>
      <PremiumFeatureOverlay>
        <AddTrendForm type="hashtag" onAdd={handleAddHashtag} />
      </PremiumFeatureOverlay>
      <PremiumFeatureOverlay>
        <AddTrendForm type="keyword" onAdd={handleAddKeyword} />
      </PremiumFeatureOverlay>
    </div>
  );
};
