
import { TrendingCard } from "@/components/dashboard/TrendingCard";
import { PremiumFeatureOverlay } from "./PremiumFeatureOverlay";
import { useTranslation } from "react-i18next";
import { useTrendingData } from "@/hooks/useTrendingData";

export const TrendingSection = () => {
  const { t } = useTranslation();
  const { trendingHashtags, trendingKeywords, trendingTopics } = useTrendingData();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
      <TrendingCard
        title={t('dashboard.trends.hashtags')}
        items={trendingHashtags}
        icon="hashtag"
      />
      <TrendingCard
        title={t('dashboard.trends.keywords')}
        items={trendingKeywords}
        icon="keyword"
      />
      <PremiumFeatureOverlay>
        <TrendingCard
          title={t('dashboard.trends.topics')}
          items={trendingTopics}
          icon="topic"
        />
      </PremiumFeatureOverlay>
    </div>
  );
};
