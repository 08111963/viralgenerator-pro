import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, TrendingUp, TrendingDown, Minus, AlertTriangle, Loader2, Link } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from "react-i18next";
import { usePredictiveTrends, TrendDetail } from "@/hooks/usePredictiveTrends";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useSocialAccounts } from "@/hooks/useSocialAccounts";

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

const AnalysisOverview = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted rounded-lg">
      <div className="text-center">
        <div className="text-2xl font-bold">24</div>
        <div className="text-sm text-muted-foreground">Post Analizzati</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">1.2K</div>
        <div className="text-sm text-muted-foreground">Interazioni</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">15</div>
        <div className="text-sm text-muted-foreground">Hashtag</div>
      </div>
    </div>
  );
};

export const PredictiveTrends = () => {
  const [activeMetric, setActiveMetric] = useState("followers");
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const { t } = useTranslation();
  const { data: trendsData, isLoading, error } = usePredictiveTrends();
  const { data: socialAccounts } = useSocialAccounts();

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

  if (!socialAccounts || socialAccounts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            {t('dashboard.predictions.title')}
          </CardTitle>
          <CardDescription className="text-yellow-600">
            {t('dashboard.predictions.error.noSocial')}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    const errorMessage = error.message?.includes('Too Many Requests') 
      ? t('dashboard.predictions.error.rateLimit')
      : t('dashboard.predictions.error.generic');

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            {t('dashboard.predictions.title')}
          </CardTitle>
          <CardDescription className="text-red-500">{errorMessage}</CardDescription>
        </CardHeader>
      </Card>
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
            {t('dashboard.predictions.dataUpdated')} {lastUpdateTime.toLocaleTimeString()}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnalysisOverview />
        
        <Tabs defaultValue="followers" onValueChange={setActiveMetric}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="followers">{t('dashboard.predictions.metrics.followers')}</TabsTrigger>
            <TabsTrigger value="engagement">{t('dashboard.predictions.metrics.engagement')}</TabsTrigger>
            <TabsTrigger value="popularity">{t('dashboard.predictions.metrics.popularity')}</TabsTrigger>
          </TabsList>

          {["followers", "engagement", "popularity"].map((metric) => (
            <TabsContent key={metric} value={metric}>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t(`dashboard.predictions.descriptions.${metric}`)}
                </p>
                
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
