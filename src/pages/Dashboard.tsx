import { Navigation } from "@/components/Navigation";
import { TrendingCard } from "@/components/dashboard/TrendingCard";
import { TrendAnalytics } from "@/components/dashboard/TrendAnalytics";
import { PredictiveTrends } from "@/components/dashboard/PredictiveTrends";
import { ContentGenerator } from "@/components/dashboard/ContentGenerator";
import { Bell, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AddTrendForm } from "@/components/dashboard/AddTrendForm";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const mockTrendingHashtags = [
  { id: "1", name: "#AI", volume: 25000, change: 12 },
  { id: "2", name: "#Digital", volume: 18000, change: 5 },
  { id: "3", name: "#Innovation", volume: 15000, change: -2 },
  { id: "4", name: "#Tech", volume: 12000, change: 8 },
  { id: "5", name: "#Marketing", volume: 10000, change: 15 },
];

const mockTrendingKeywords = [
  { id: "1", name: "Intelligenza Artificiale", volume: 35000, change: 15 },
  { id: "2", name: "Machine Learning", volume: 22000, change: 7 },
  { id: "3", name: "Big Data", volume: 18000, change: -3 },
  { id: "4", name: "Cloud Computing", volume: 15000, change: 4 },
  { id: "5", name: "Digital Marketing", volume: 12000, change: 10 },
];

const mockTrendingTopics = [
  { id: "1", name: "Sostenibilità", volume: 45000, change: 20 },
  { id: "2", name: "Smart Working", volume: 30000, change: 8 },
  { id: "3", name: "Cybersecurity", volume: 25000, change: 12 },
  { id: "4", name: "5G", volume: 20000, change: -5 },
  { id: "5", name: "E-commerce", volume: 18000, change: 9 },
];

const Dashboard = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [trendingHashtags, setTrendingHashtags] = useState(mockTrendingHashtags);
  const [trendingKeywords, setTrendingKeywords] = useState(mockTrendingKeywords);

  const handleNotificationToggle = () => {
    toast({
      title: t('dashboard.notifications.enabled'),
      description: t('dashboard.notifications.description'),
    });
  };

  const handleAddHashtag = (newHashtag) => {
    setTrendingHashtags((prev) => [...prev, newHashtag]);
    toast({
      title: t('dashboard.addTrend.hashtagAdded'),
      description: t('dashboard.addTrend.hashtagAddedDesc', { name: newHashtag.name }),
    });
  };

  const handleAddKeyword = (newKeyword) => {
    setTrendingKeywords((prev) => [...prev, newKeyword]);
    toast({
      title: t('dashboard.addTrend.keywordAdded'),
      description: t('dashboard.addTrend.keywordAddedDesc', { name: newKeyword.name }),
    });
  };

  const PremiumFeatureOverlay = ({ children }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
        <div className="text-center p-4">
          <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">{t('dashboard.premium.locked')}</p>
          <Button variant="outline" size="sm" asChild>
            <Link to="/pricing">{t('dashboard.premium.upgrade')}</Link>
          </Button>
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
          <Button onClick={handleNotificationToggle} variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            {t('dashboard.notifications.enable')}
          </Button>
        </div>

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
              items={mockTrendingTopics}
              icon="topic"
            />
          </PremiumFeatureOverlay>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <PremiumFeatureOverlay>
            <AddTrendForm type="hashtag" onAdd={handleAddHashtag} />
          </PremiumFeatureOverlay>
          <PremiumFeatureOverlay>
            <AddTrendForm type="keyword" onAdd={handleAddKeyword} />
          </PremiumFeatureOverlay>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TrendAnalytics />
          <PremiumFeatureOverlay>
            <PredictiveTrends />
          </PremiumFeatureOverlay>
          <PremiumFeatureOverlay>
            <ContentGenerator />
          </PremiumFeatureOverlay>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
