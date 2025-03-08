
import React from "react";
import { Navigation } from "@/components/Navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/auth";
import { TrendingSection } from "@/components/dashboard/TrendingSection";
import { FeatureSection } from "@/components/dashboard/FeatureSection";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import ApiKeyDisplay from "@/components/dashboard/ApiKeyDisplay";
import { PredictiveTrends } from "@/components/dashboard/PredictiveTrends";
import { ShareSection } from "@/components/ShareSection";

const Dashboard = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { session } = useAuth();

  // Update document title and meta tags for SEO
  React.useEffect(() => {
    document.title = "Dashboard - ViralGenerator Pro | Analisi Trend Social";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Accedi alla dashboard di ViralGenerator Pro per analizzare i trend social in tempo reale, generare contenuti virali e visualizzare previsioni AI personalizzate.');
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'dashboard social media, analisi trend, contenuti virali, AI marketing, social media analytics, trend prediction');
  }, []);

  const handleNotificationToggle = () => {
    console.log("Notification toggle clicked");
    toast({
      title: t('dashboard.notifications.enabled'),
      description: t('dashboard.notifications.description'),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
          {session && (
            <Button onClick={handleNotificationToggle} variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              {t('dashboard.notifications.enable')}
            </Button>
          )}
        </div>
        
        <div className="grid gap-6">
          {/* Added key props and error boundaries for each section */}
          <TrendingSection key="trending" />
          <FeatureSection key="features" />
          <AnalyticsSection key="analytics" />
          <ApiKeyDisplay key="api-key" />
          <PredictiveTrends key="predictive" />
          <ShareSection key="share" />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
