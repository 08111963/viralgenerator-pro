
import React from 'react';
import { useTranslation } from "react-i18next";
import { TrendingItem } from '@/hooks/useTrendingItems';
import { TrendingUp } from 'lucide-react';

interface TrendingListProps {
  items: TrendingItem[];
}

export const TrendingList = ({ items }: TrendingListProps) => {
  const { t } = useTranslation();

  return (
    <div className="max-h-[300px] overflow-y-auto">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">{item.name}</span>
            {item.isTrending && (
              <TrendingUp className="h-4 w-4 text-primary" />
            )}
            <span className="text-sm text-muted-foreground">
              {item.volume.toLocaleString()} {t('dashboard.trends.mentions')}
            </span>
          </div>
          <span className={`text-sm ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {item.change >= 0 ? '+' : ''}{item.change}%
          </span>
        </div>
      ))}
    </div>
  );
};
