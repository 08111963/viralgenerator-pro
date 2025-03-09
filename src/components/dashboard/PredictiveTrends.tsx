
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, TrendingUp, TrendingDown, Minus, AlertTriangle, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { useTranslation } from "react-i18next";
import { usePredictiveTrends, TrendDetail } from "@/hooks/usePredictiveTrends";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumFeatureOverlay } from "@/components/dashboard/PremiumFeatureOverlay";
import { TrendChart } from "./trends/TrendChart";
import { TrendDetails } from "./trends/TrendDetails";

export const PredictiveTrends = () => {
  const [activeMetric, setActiveMetric] = useState("followers");
  const { t } = useTranslation();
  const { data: trendsData, isLoading, error } = usePredictiveTrends();

  const metrics = {
    followers: { 
      color: "#8B5CF6", 
      name: t('dashboard.predictions.aggregated.followers.name'), 
      description: t('dashboard.predictions.aggregated.followers.description')
    },
    engagement: { 
      color: "#D946EF", 
      name: t('dashboard.predictions.aggregated.content.name'), 
      description: t('dashboard.predictions.aggregated.content.description')
    },
    popularity: { 
      color: "#0EA5E9", 
      name: t('dashboard.predictions.aggregated.hashtags.name'), 
      description: t('dashboard.predictions.aggregated.hashtags.description')
    }
  };

  if (error) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            {t('dashboard.predictions.title')}
          </h3>
          <p className="text-sm text-muted-foreground">{t('dashboard.trends.error')}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight">
            <Loader2 className="h-5 w-5 animate-spin" />
            {t('dashboard.predictions.title')}
          </h3>
          <p className="text-sm text-muted-foreground">{t('dashboard.predictions.loading')}</p>
        </div>
      </div>
    );
  }

  if (!trendsData || trendsData.length === 0) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            {t('dashboard.predictions.title')}
          </h3>
          <p className="text-sm text-muted-foreground">{t('dashboard.trends.noData')}</p>
        </div>
      </div>
    );
  }

  const BaseContent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          {t('dashboard.predictions.title')}
        </CardTitle>
        <CardDescription className="space-y-2">
          {t('dashboard.predictions.subtitle')}
          <div className="mt-2 space-y-1">
            <p className="text-sm font-medium">{t('dashboard.predictions.aggregated.title')}</p>
            {Object.values(metrics).map(({ name, description }) => (
              <div key={name} className="text-xs text-muted-foreground flex gap-2">
                <span className="font-medium">{name}:</span>
                <span>{description}</span>
              </div>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="followers" onValueChange={setActiveMetric}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="followers">{t('dashboard.predictions.aggregated.followers.name')}</TabsTrigger>
            <TabsTrigger value="engagement">{t('dashboard.predictions.aggregated.content.name')}</TabsTrigger>
            <TabsTrigger value="popularity">{t('dashboard.predictions.aggregated.hashtags.name')}</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <TrendChart data={trendsData} metrics={metrics} />
            
            {trendsData?.[0]?.trends && trendsData[0].trends[activeMetric as keyof typeof trendsData[0]["trends"]] && (
              <TrendDetails details={trendsData[0].trends[activeMetric as keyof typeof trendsData[0]["trends"]]} />
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );

  return (
    <PremiumFeatureOverlay>
      <BaseContent />
    </PremiumFeatureOverlay>
  );
};
