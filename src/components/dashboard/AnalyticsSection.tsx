
import { TrendAnalytics } from "@/components/dashboard/TrendAnalytics";
import { PredictiveTrends } from "@/components/dashboard/PredictiveTrends";
import { ContentGenerator } from "@/components/dashboard/ContentGenerator";
import { PremiumFeatureOverlay } from "./PremiumFeatureOverlay";
import ApiKeyDisplay from "@/components/dashboard/ApiKeyDisplay";

export const AnalyticsSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TrendAnalytics />
        <PremiumFeatureOverlay>
          <PredictiveTrends />
        </PremiumFeatureOverlay>
        <PremiumFeatureOverlay>
          <ContentGenerator />
        </PremiumFeatureOverlay>
      </div>
      <ApiKeyDisplay />
    </div>
  );
};

