
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from "react-i18next";
import { usePredictiveTrends, TrendDetail } from "@/hooks/usePredictiveTrends";

const TrendIndicator = ({ trend }: { trend: string }) => {
  if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
  if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-yellow-500" />;
};

const ImpactBadge = ({ impact }: { impact: string }) => {
  const colors = {
    alto: 'bg-red-100 text-red-800',
    medio: 'bg-yellow-100 text-yellow-800',
    basso: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${colors[impact as keyof typeof colors]}`}>
      {impact}
    </span>
  );
};

const TrendDetails = ({ details }: { details: TrendDetail }) => (
  <div className="space-y-2 mt-4 p-4 bg-muted rounded-lg">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <TrendIndicator trend={details.trend} />
        <span className={`font-medium ${details.percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {details.percentageChange > 0 ? '+' : ''}{details.percentageChange}%
        </span>
      </div>
      <ImpactBadge impact={details.impact} />
    </div>
    <div className="text-sm">
      <p className="text-muted-foreground">Velocità: <span className="font-medium">{details.velocity}</span></p>
      <div className="mt-2">
        <p className="font-medium mb-1">Fattori chiave:</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground">
          {details.factors.map((factor, idx) => (
            <li key={idx}>{factor}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export const PredictiveTrends = () => {
  const [activeMetric, setActiveMetric] = useState("followers");
  const { t } = useTranslation();
  const { data: trendsData, isLoading, error } = usePredictiveTrends();

  const getMetricDetails = (metric: string) => {
    if (!trendsData || trendsData.length === 0) {
      return {
        data: [],
        dataKey: metric,
        growth: "0%",
        description: t('dashboard.trends.noData')
      };
    }

    const lastDataPoint = trendsData[trendsData.length - 1];
    const trendDetails = lastDataPoint.trends?.[metric as keyof typeof lastDataPoint.trends];

    return {
      data: trendsData,
      dataKey: metric,
      growth: trendDetails ? `${trendDetails.percentageChange > 0 ? '+' : ''}${trendDetails.percentageChange}%` : '0%',
      description: t(`dashboard.predictions.${metric}`),
      details: trendDetails
    };
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
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
              <div className="space-y-4">
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
                
                {getMetricDetails(metric).details && (
                  <TrendDetails details={getMetricDetails(metric).details} />
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
