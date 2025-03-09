
import { TrendAnalytics } from "@/components/dashboard/TrendAnalytics";
import { ContentGenerator } from "@/components/dashboard/ContentGenerator";
import { PremiumFeatureOverlay } from "./PremiumFeatureOverlay";
import ApiKeyDisplay from "@/components/dashboard/ApiKeyDisplay";

export const AnalyticsSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <TrendAnalytics />
        <PremiumFeatureOverlay>
          <ContentGenerator />
        </PremiumFeatureOverlay>
      </div>
      <ApiKeyDisplay />
    </div>
  );
};
