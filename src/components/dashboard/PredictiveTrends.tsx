import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, TrendingUp, TrendingDown, Minus, AlertTriangle, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from "react-i18next";
import { usePredictiveTrends, TrendDetail } from "@/hooks/usePredictiveTrends";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

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
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const { t } = useTranslation();
  const { data: trendsData, isLoading, error } = usePredictiveTrends();

  // Effect to handle real-time updates
  useEffect(() => {
    if (trendsData) {
      const now = new Date();
      setLastUpdateTime(now);
      toast({
        description: `${t('dashboard.predictions.dataUpdated')} ${now.toLocaleTimeString()}`,
      });
    }
  }, [trendsData, t]);

  console.log('PredictiveTrends render:', { trendsData, isLoading, error });

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          {t('dashboard.predictions.title')}
        </CardTitle>
        <CardDescription>
          {t('dashboard.predictions.subtitle')}
          <div className="text-xs text-muted-foreground mt-1">
            Ultimo aggiornamento: {lastUpdateTime.toLocaleTimeString()}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="followers" onValueChange={setActiveMetric}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="followers">Follower</TabsTrigger>
            <TabsTrigger value="engagement">Contenuti</TabsTrigger>
            <TabsTrigger value="popularity">Hashtag</TabsTrigger>
          </TabsList>

          {["followers", "engagement", "popularity"].map((metric) => (
            <TabsContent key={metric} value={metric}>
              <div className="space-y-4">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendsData}>
                      <XAxis dataKey="time" />
                      <YAxis domain={['auto', 'auto']} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey={metric}
                        stroke="#8884d8" 
                        strokeWidth={2}
                        dot={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {trendsData[0]?.trends && trendsData[0].trends[metric as keyof typeof trendsData[0]["trends"]] && (
                  <TrendDetails details={trendsData[0].trends[metric as keyof typeof trendsData[0]["trends"]]} />
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
