import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

const followerData = [
  { time: '12h', followers: 1200 },
  { time: '24h', followers: 1350 },
  { time: '36h', followers: 1500 },
  { time: '48h', followers: 1700 },
  { time: '60h', followers: 1900 },
  { time: '72h', followers: 2200 },
];

const contentData = [
  { time: '12h', engagement: 45 },
  { time: '24h', engagement: 52 },
  { time: '36h', engagement: 58 },
  { time: '48h', engagement: 65 },
  { time: '60h', engagement: 72 },
  { time: '72h', engagement: 80 },
];

const hashtagData = [
  { time: '12h', popularity: 1000 },
  { time: '24h', popularity: 1400 },
  { time: '36h', popularity: 1800 },
  { time: '48h', popularity: 2300 },
  { time: '60h', popularity: 2800 },
  { time: '72h', popularity: 3500 },
];

export const PredictiveTrends = () => {
  const [activeMetric, setActiveMetric] = useState("followers");
  const { t } = useTranslation();

  const getMetricDetails = (metric: string) => {
    switch (metric) {
      case "followers":
        return {
          data: followerData,
          dataKey: "followers",
          growth: "+83%",
          description: "Crescita prevista dei follower"
        };
      case "content":
        return {
          data: contentData,
          dataKey: "engagement",
          growth: "+77%",
          description: "Tasso di engagement dei contenuti"
        };
      case "hashtags":
        return {
          data: hashtagData,
          dataKey: "popularity",
          growth: "+250%",
          description: "Popolarità degli hashtag di tendenza"
        };
      default:
        return {
          data: followerData,
          dataKey: "followers",
          growth: "+83%",
          description: "Crescita prevista dei follower"
        };
    }
  };

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
            <TabsTrigger value="followers" className="flex-1">Follower</TabsTrigger>
            <TabsTrigger value="content" className="flex-1">Contenuti</TabsTrigger>
            <TabsTrigger value="hashtags" className="flex-1">Hashtag</TabsTrigger>
          </TabsList>

          {["followers", "content", "hashtags"].map((metric) => (
            <TabsContent key={metric} value={metric}>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getMetricDetails(metric).data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey={getMetricDetails(metric).dataKey} 
                      stroke="#8884d8" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Trend in crescita</span>
                  <span className="text-green-500">{getMetricDetails(metric).growth}</span>
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
