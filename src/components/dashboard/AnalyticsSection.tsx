
import { TrendAnalytics } from "@/components/dashboard/TrendAnalytics";
import { PredictiveTrends } from "@/components/dashboard/PredictiveTrends";
import { ContentGenerator } from "@/components/dashboard/ContentGenerator";
import { PremiumFeatureOverlay } from "./PremiumFeatureOverlay";

export const AnalyticsSection = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <TrendAnalytics />
      <PremiumFeatureOverlay>
        <PredictiveTrends />
      </PremiumFeatureOverlay>
      <PremiumFeatureOverlay>
        <ContentGenerator />
      </PremiumFeatureOverlay>
    </div>
  );
};
