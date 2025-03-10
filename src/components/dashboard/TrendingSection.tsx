
import { TrendingCard } from "@/components/dashboard/TrendingCard";
import { PremiumFeatureOverlay } from "./PremiumFeatureOverlay";
import { useTranslation } from "react-i18next";

export const TrendingSection = () => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
      <TrendingCard
        title={t('dashboard.trends.hashtags')}
        icon="hashtags"
      />
      <TrendingCard
        title={t('dashboard.trends.keywords')}
        icon="keywords"
      />
      <PremiumFeatureOverlay>
        <TrendingCard
          title={t('dashboard.trends.topics')}
          icon="topics"
        />
      </PremiumFeatureOverlay>
    </div>
  );
};
