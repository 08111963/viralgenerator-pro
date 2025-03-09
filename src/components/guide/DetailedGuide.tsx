
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardTab } from "./tabs/DashboardTab";
import { TrendsTab } from "./tabs/TrendsTab";
import { ContentTab } from "./tabs/ContentTab";
import { PremiumFeaturesTab } from "./tabs/PremiumFeaturesTab";

export const DetailedGuide = () => {
  const { t } = useTranslation();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">{t('guide.detailedGuide.title')}</h2>
      
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="dashboard">{t('guide.sections.dashboard.title')}</TabsTrigger>
          <TabsTrigger value="trends">{t('guide.sections.trends.title')}</TabsTrigger>
          <TabsTrigger value="content">{t('guide.sections.content.title')}</TabsTrigger>
          <TabsTrigger value="features">{t('guide.detailedGuide.premiumFeatures.title')}</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <DashboardTab />
        </TabsContent>

        <TabsContent value="trends">
          <TrendsTab />
        </TabsContent>

        <TabsContent value="content">
          <ContentTab />
        </TabsContent>

        <TabsContent value="features">
          <PremiumFeaturesTab />
        </TabsContent>
      </Tabs>
    </section>
  );
};
