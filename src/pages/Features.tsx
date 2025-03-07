
import { Navigation } from "@/components/Navigation";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">{t('features.title')}</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard
            title={t('features.realtime.title')}
            description={t('features.realtime.description')}
          />
          <FeatureCard
            title={t('features.customDashboard.title')}
            description={t('features.customDashboard.description')}
          />
          <FeatureCard
            title={t('features.reports.title')}
            description={t('features.reports.description')}
          />
          <FeatureCard
            title={t('features.ai.title')}
            description={t('features.ai.description')}
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Features;
