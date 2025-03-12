
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { TrendingItem } from '@/hooks/useTrendingItems';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrendDetailModal } from './TrendDetailModal';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';

interface TrendingListProps {
  items: TrendingItem[];
}

export const TrendingList = ({ items }: TrendingListProps) => {
  const { t, i18n } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<TrendingItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: TrendingItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="max-h-[300px] overflow-y-auto space-y-2">
        {items.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className="w-full justify-between hover:bg-accent/50 py-2 px-4"
            onClick={() => handleItemClick(item)}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{item.name}</span>
              {item.isTrending && (
                <TrendingUp className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {item.volume.toLocaleString()} {t('dashboard.trends.mentions')}
              </span>
              <span className={`text-sm ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.change >= 0 ? '+' : ''}{item.change}%
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </Button>
        ))}

        {items.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            {t('dashboard.trends.noData')}
          </div>
        )}
      </div>

      <TrendDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
      />
    </>
  );
};
