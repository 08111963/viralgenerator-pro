import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Hash, MessageCircle, Radio, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTrendingItems } from "@/hooks/useTrendingItems";
import { TrendingChart } from "./TrendingChart";
import { TrendingList } from "./TrendingList";
import { Progress } from "@/components/ui/progress";
import { TrendValidationTooltip } from "./TrendValidationTooltip";
import { TrendDetailModal } from "./TrendDetailModal";

interface TrendingCardProps {
  title: string;
  icon: "hashtags" | "keywords" | "topics";
}

const getIcon = (icon: "hashtags" | "keywords" | "topics") => {
  switch (icon) {
    case "hashtags":
      return <Hash className="h-4 w-4" />;
    case "keywords":
      return <MessageCircle className="h-4 w-4" />;
    case "topics":
      return <TrendingUp className="h-4 w-4" />;
    default:
      return null;
  }
};

export const TrendingCard = ({ title, icon }: TrendingCardProps) => {
  const { t } = useTranslation();
  const { data: items = [], isLoading, isError } = useTrendingItems(icon);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  if (isError) {
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
          <div className="flex items-center justify-center h-[200px] text-red-500">
            {t('dashboard.trends.error')}
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

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {getIcon(icon)}
              {title}
            </CardTitle>
            <CardDescription>{t('dashboard.trends.lastMonth')}</CardDescription>
          </div>
          <div className="flex items-center gap-1 text-xs text-primary">
            <Radio className="h-3 w-3 animate-pulse" />
            {t('dashboard.trends.realtime')}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[200px] w-full mb-4">
            <TrendingChart items={items} type={icon} />
          </div>
          
          {items.some(item => item.confidence < 70) && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-400">
              <AlertTriangle className="h-4 w-4" />
              {t('dashboard.trends.lowConfidence')}
            </div>
          )}

          <div className="space-y-2">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{item.name}</span>
                  <TrendValidationTooltip issues={item.validationIssues}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Affidabilità:
                      </span>
                      <Progress 
                        value={item.confidence} 
                        className={`w-20 ${
                          item.confidence > 70 ? "bg-green-500" :
                          item.confidence > 40 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                      />
                    </div>
                  </TrendValidationTooltip>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span>Volume: {item.volume.toLocaleString()}</span>
                  <span className={item.change >= 0 ? "text-green-600" : "text-red-600"}>
                    {item.change >= 0 ? "+" : ""}{item.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <TrendDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
      />
    </Card>
  );
};
