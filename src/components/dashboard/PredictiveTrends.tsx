import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, TrendingUp, TrendingDown, Minus, AlertTriangle, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { useTranslation } from "react-i18next";
import { usePredictiveTrends, TrendDetail } from "@/hooks/usePredictiveTrends";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium text-sm mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-sm flex items-center gap-2">
            <span style={{ color: entry.color }}>●</span>
            <span className="font-medium">{entry.name}:</span>
            <span>{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const PredictiveTrends = () => {
  const [activeMetric, setActiveMetric] = useState("followers");
  const { t } = useTranslation();
  const { data: trendsData, isLoading, error } = usePredictiveTrends();

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

  const metrics = {
    followers: { color: "#8B5CF6", name: "Follower" },     // Viola vivace
    engagement: { color: "#D946EF", name: "Contenuti" },   // Rosa magenta
    popularity: { color: "#0EA5E9", name: "Hashtag" }      // Blu oceano
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
            <TabsTrigger value="followers">Follower</TabsTrigger>
            <TabsTrigger value="engagement">Contenuti</TabsTrigger>
            <TabsTrigger value="popularity">Hashtag</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendsData}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#e2e8f0" 
                    horizontal={true}
                    vertical={true}
                  />
                  <XAxis 
                    dataKey="time"
                    tick={{ fill: 'currentColor' }}
                    tickLine={{ stroke: 'currentColor' }}
                  />
                  <YAxis 
                    tick={{ fill: 'currentColor' }}
                    tickLine={{ stroke: 'currentColor' }}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    formatter={(value) => <span className="text-sm">{value}</span>}
                  />
                  {Object.entries(metrics).map(([key, { color, name }]) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={color}
                      name={name}
                      strokeWidth={2}
                      dot={{ r: 4, fill: color }}
                      activeDot={{ r: 6, fill: color }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {trendsData?.[0]?.trends && trendsData[0].trends[activeMetric as keyof typeof trendsData[0]["trends"]] && (
              <TrendDetails details={trendsData[0].trends[activeMetric as keyof typeof trendsData[0]["trends"]]} />
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
