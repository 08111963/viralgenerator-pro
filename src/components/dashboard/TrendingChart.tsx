
import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingItem } from '@/hooks/useTrendingItems';

interface TrendingChartProps {
  items: TrendingItem[];
  type: "hashtag" | "keyword" | "topic";
}

const generateHistoricalData = (items: TrendingItem[]) => {
  return items.map((item) => ({
    name: item.name,
    volume: item.volume,
    previous: item.volume - (item.volume * (item.change / 100))
  }));
};

export const TrendingChart = ({ items, type }: TrendingChartProps) => {
  const chartData = generateHistoricalData(items);

  if (type === "hashtag") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="volume" stroke="#9b87f5" fill="#D6BCFA" />
          <Area type="monotone" dataKey="previous" stroke="#1A1F2C" fill="#F1F0FB" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="volume" fill="#9b87f5" />
        <Bar dataKey="previous" fill="#D6BCFA" />
      </BarChart>
    </ResponsiveContainer>
  );
};
