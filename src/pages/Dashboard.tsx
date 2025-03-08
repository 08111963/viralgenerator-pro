import { Navigation } from "@/components/Navigation";
import { TrendingCard } from "@/components/dashboard/TrendingCard";
import { TrendAnalytics } from "@/components/dashboard/TrendAnalytics";
import { PredictiveTrends } from "@/components/dashboard/PredictiveTrends";
import { ContentGenerator } from "@/components/dashboard/ContentGenerator";
import ApiKeyDisplay from "@/components/dashboard/ApiKeyDisplay";
import { Bell, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AddTrendForm } from "@/components/dashboard/AddTrendForm";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

const Dashboard = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { session } = useAuth();

  const { data: trendingHashtags = [] } = useQuery({
    queryKey: ["trending-hashtags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trending_hashtags")
        .select("*")
        .order("volume", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching trending hashtags:", error);
        return [];
      }

      return data.map(hashtag => ({
        id: hashtag.id,
        name: hashtag.name,
        volume: hashtag.volume,
        change: Number(hashtag.change_percentage)
      }));
    }
  });

  const { data: trendingKeywords = [] } = useQuery({
    queryKey: ["trending-keywords"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trending_keywords")
        .select("*")
        .order("volume", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching trending keywords:", error);
        return [];
      }

      return data.map(keyword => ({
        id: keyword.id,
        name: keyword.name,
        volume: keyword.volume,
        change: Number(keyword.change_percentage)
      }));
    }
  });

  const { data: trendingTopics = [] } = useQuery({
    queryKey: ["trending-topics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trending_topics")
        .select("*")
        .order("volume", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching trending topics:", error);
        return [];
      }

      return data.map(topic => ({
        id: topic.id,
        name: topic.name,
        volume: topic.volume,
        change: Number(topic.change_percentage)
      }));
    }
  });

  const { data: isAdmin } = useQuery({
    queryKey: ["admin-status"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      const { data, error } = await supabase
        .rpc('is_admin', { user_id: session.user.id });

      if (error) {
        console.error("Error checking admin status:", error);
        return false;
      }
      
      return !!data;
    },
  });

  const handleNotificationToggle = () => {
    toast({
      title: t('dashboard.notifications.enabled'),
      description: t('dashboard.notifications.description'),
    });
  };

  const handleAddHashtag = async (newHashtag) => {
    const { error } = await supabase
      .from("trending_hashtags")
      .insert([{
        name: newHashtag.name,
        volume: newHashtag.volume,
        change_percentage: newHashtag.change
      }]);

    if (error) {
      console.error("Error adding hashtag:", error);
      return;
    }

    toast({
      title: t('dashboard.addTrend.hashtagAdded'),
      description: t('dashboard.addTrend.hashtagAddedDesc', { name: newHashtag.name }),
    });
  };

  const handleAddKeyword = async (newKeyword) => {
    const { error } = await supabase
      .from("trending_keywords")
      .insert([{
        name: newKeyword.name,
        volume: newKeyword.volume,
        change_percentage: newKeyword.change
      }]);

    if (error) {
      console.error("Error adding keyword:", error);
      return;
    }

    toast({
      title: t('dashboard.addTrend.keywordAdded'),
      description: t('dashboard.addTrend.keywordAddedDesc', { name: newKeyword.name }),
    });
  };

  const PremiumFeatureOverlay = ({ children }: { children: React.ReactNode }) => {
    if (!session) {
      return (
        <div className="relative">
          {children}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-10">
            <div className="text-center p-4">
              <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">{t('dashboard.login.required')}</p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">{t('navigation.login')}</Link>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Don't show overlay if user is admin
    if (isAdmin) {
      return <>{children}</>;
    }

    return (
      <div className="relative">
        {children}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-10">
          <div className="text-center p-4">
            <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">{t('dashboard.premium.locked')}</p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/pricing">{t('dashboard.premium.upgrade')}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
          {session && (
            <Button onClick={handleNotificationToggle} variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              {t('dashboard.notifications.enable')}
            </Button>
          )}
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
              items={trendingTopics}
              icon="topic"
            />
          </PremiumFeatureOverlay>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <PremiumFeatureOverlay>
            <ApiKeyDisplay />
          </PremiumFeatureOverlay>
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
