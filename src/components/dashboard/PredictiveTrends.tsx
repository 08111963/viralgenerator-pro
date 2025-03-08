
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { usePredictiveTrends } from "@/hooks/usePredictiveTrends";

export const PredictiveTrends = () => {
  const [activeMetric, setActiveMetric] = useState("followers");
  const { t } = useTranslation();
  const { data: trendsData, isLoading, error } = usePredictiveTrends();

  const getMetricDetails = (metric: string) => {
    if (!trendsData || trendsData.length === 0) {
      return {
        data: [],
        dataKey: "followers",
        growth: "0%",
        description: t('dashboard.trends.noData')
      };
    }

    const firstValue = trendsData[0][metric as keyof typeof trendsData[0]] as number;
    const lastValue = trendsData[trendsData.length - 1][metric as keyof typeof trendsData[0]] as number;
    const growthPercentage = ((lastValue - firstValue) / firstValue) * 100;

    let description = "";
    switch (metric) {
      case "followers":
        description = "Crescita prevista dei follower";
        break;
      case "engagement":
        description = "Tasso di engagement dei contenuti";
        break;
      case "popularity":
        description = "Popolarità degli hashtag di tendenza";
        break;
    }

    return {
      data: trendsData,
      dataKey: metric,
      growth: `${growthPercentage > 0 ? '+' : ''}${growthPercentage.toFixed(0)}%`,
      description
    };
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            {t('dashboard.predictions.title')}
          </CardTitle>
          <CardDescription>{t('dashboard.trends.error')}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          {t('dashboard.predictions.title')}
        </CardTitle>
        <CardDescription>{t('dashboard.predictions.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="followers" onValueChange={setActiveMetric}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="followers">Follower</TabsTrigger>
            <TabsTrigger value="engagement">Contenuti</TabsTrigger>
            <TabsTrigger value="popularity">Hashtag</TabsTrigger>
          </TabsList>

          {["followers", "engagement", "popularity"].map((metric) => (
            <TabsContent key={metric} value={metric} className={isLoading ? "animate-pulse" : ""}>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getMetricDetails(metric).data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey={metric}
                      stroke="#8884d8" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t('dashboard.predictions.growth')}</span>
                  <span className={getMetricDetails(metric).growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                    {getMetricDetails(metric).growth}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {getMetricDetails(metric).description}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
