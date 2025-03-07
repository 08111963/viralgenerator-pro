import { Navigation } from "@/components/Navigation";
import { TrendingCard } from "@/components/dashboard/TrendingCard";
import { TrendAnalytics } from "@/components/dashboard/TrendAnalytics";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AddTrendForm } from "@/components/dashboard/AddTrendForm";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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

        <div className="grid gap-6 md:grid-cols-2 mb-6">
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
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <AddTrendForm type="hashtag" onAdd={handleAddHashtag} />
          <AddTrendForm type="keyword" onAdd={handleAddKeyword} />
        </div>

        <div className="grid gap-6">
          <TrendAnalytics />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
