
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Hash, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTrendingItems } from "@/hooks/useTrendingItems";
import { TrendingChart } from "./TrendingChart";
import { TrendingList } from "./TrendingList";

interface TrendingCardProps {
  title: string;
  icon: "hashtag" | "keyword" | "topic";
}

const getIcon = (icon: "hashtag" | "keyword" | "topic") => {
  switch (icon) {
    case "hashtag":
      return <Hash className="h-4 w-4" />;
    case "keyword":
      return <MessageCircle className="h-4 w-4" />;
    case "topic":
      return <TrendingUp className="h-4 w-4" />;
    default:
      return null;
  }
};

export const TrendingCard = ({ title, icon }: TrendingCardProps) => {
  const { t } = useTranslation();
  const { data: items = [], isLoading } = useTrendingItems(icon);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getIcon(icon)}
            {title}
          </CardTitle>
          <CardDescription>{t('dashboard.trends.lastDay')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <div className="animate-pulse h-4 w-24 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getIcon(icon)}
            {title}
          </CardTitle>
          <CardDescription>{t('dashboard.trends.lastDay')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
            {t('dashboard.trends.noData')}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getIcon(icon)}
          {title}
        </CardTitle>
        <CardDescription>{t('dashboard.trends.lastDay')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[200px] w-full mb-4">
            <TrendingChart items={items} type={icon} />
          </div>
          <TrendingList items={items} />
        </div>
      </CardContent>
    </Card>
  );
};
