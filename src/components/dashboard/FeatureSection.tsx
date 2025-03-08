import { default as ApiKeyDisplay } from "@/components/dashboard/ApiKeyDisplay";
import { AddTrendForm } from "@/components/dashboard/AddTrendForm";
import { PremiumFeatureOverlay } from "./PremiumFeatureOverlay";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";

export const FeatureSection = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleAddHashtag = async (newHashtag) => {
    const { error } = await supabase
      .from("trending_hashtags")
      .insert([{
        name: newHashtag.name,
        volume: newHashtag.volume,
        change_percentage: newHashtag.change
      }]);

    if (error) {
      console.error("Error adding hashtag:", error);
      return;
    }

    toast({
      title: t('dashboard.addTrend.hashtagAdded'),
      description: t('dashboard.addTrend.hashtagAddedDesc', { name: newHashtag.name }),
    });
  };

  const handleAddKeyword = async (newKeyword) => {
    const { error } = await supabase
      .from("trending_keywords")
      .insert([{
        name: newKeyword.name,
        volume: newKeyword.volume,
        change_percentage: newKeyword.change
      }]);

    if (error) {
      console.error("Error adding keyword:", error);
      return;
    }

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
