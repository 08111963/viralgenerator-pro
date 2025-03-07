
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const predictiveData = [
  { time: '12h', score: 400 },
  { time: '24h', score: 600 },
  { time: '36h', score: 800 },
  { time: '48h', score: 1000 },
  { time: '60h', score: 1200 },
  { time: '72h', score: 1500 },
];

export const PredictiveTrends = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Previsioni AI
        </CardTitle>
        <CardDescription>Trend previsti nelle prossime 72 ore</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={predictiveData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Trend in crescita</span>
            <span className="text-green-500">+45%</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Previsione basata su ML e analisi dei dati storici
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
