
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTrendingItems } from "@/hooks/useTrendingItems";
import { BarChart2, Hash, Key, FileText } from "lucide-react";
import { TrendingList } from "@/components/dashboard/TrendingList";

type IconType = "hashtags" | "keywords" | "topics";

interface TrendingCardProps {
  title: string;
  icon: IconType;
}

const icons = {
  hashtags: Hash,
  keywords: Key,
  topics: FileText,
};

export const TrendingCard: React.FC<TrendingCardProps> = ({ title, icon }) => {
  const { data = [], isLoading } = useTrendingItems(icon);
  const Icon = icons[icon] || BarChart2;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium animate-pulse bg-gray-200 h-4 w-24" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <TrendingList items={data} />
      </CardContent>
    </Card>
  );
};
