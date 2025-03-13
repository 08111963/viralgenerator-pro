
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTrendingData } from "@/hooks/useTrendingData";
import { BarChart2, Hash, Key, FileText, RefreshCcw } from "lucide-react";
import { TrendingList } from "@/components/dashboard/TrendingList";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const { data = [], isLoading, isError } = useTrendingData(icon);
  const Icon = icons[icon] || BarChart2;

  const handleRefresh = () => {
    // Invalidate and refetch the query
    queryClient.invalidateQueries({
      queryKey: [`trending_${icon}`],
      exact: true
    });
  };

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

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500 py-4">
            Errore nel caricamento dei dati
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {title}
        </CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleRefresh}
          className="hover:bg-accent/50"
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <TrendingList items={data} />
      </CardContent>
    </Card>
  );
};
