
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
import { PredictiveTrends } from "@/components/dashboard/PredictiveTrends";
import { ShareSection } from "@/components/ShareSection";
import { WeeklyReports } from "@/components/dashboard/WeeklyReports";

const Dashboard = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const { session } = useAuth();

  // Update document title and meta tags for SEO based on current language
  React.useEffect(() => {
    const title = i18n.language === 'it' 
      ? "Dashboard - ViralGenerator Pro | Analisi Trend Social"
      : "Dashboard - ViralGenerator Pro | Social Trend Analysis";
    
    document.title = title;
    
    const description = i18n.language === 'it'
      ? 'Accedi alla dashboard di ViralGenerator Pro per analizzare i trend social in tempo reale, generare contenuti virali e visualizzare previsioni AI personalizzate.'
      : 'Access the ViralGenerator Pro dashboard to analyze social trends in real-time, generate viral content, and view personalized AI predictions.';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'dashboard social media, analisi trend, contenuti virali, AI marketing, social media analytics, trend prediction');
  }, [i18n.language]);

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
          <WeeklyReports />
          <TrendingSection key="trending" />
          <FeatureSection key="features" />
          <AnalyticsSection key="analytics" />
          <PredictiveTrends key="predictive" />
          <ShareSection key="share" />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
