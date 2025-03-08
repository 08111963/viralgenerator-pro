
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
import { ApiKeyDisplay } from "@/components/dashboard/ApiKeyDisplay";
import { PredictiveTrends } from "@/components/dashboard/PredictiveTrends";
import { ShareSection } from "@/components/ShareSection";

const Dashboard = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { session } = useAuth();

  const handleNotificationToggle = () => {
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
          <TrendingSection />
          <FeatureSection />
          <AnalyticsSection />
          <ApiKeyDisplay />
          <PredictiveTrends />
          <ShareSection />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
