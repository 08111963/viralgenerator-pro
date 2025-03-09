
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TrendingItem } from '@/hooks/useTrendingItems';
import { TrendChart } from '@/components/dashboard/trends/TrendChart';
import { useTranslation } from 'react-i18next';

interface TrendDetailModalProps {
  item: TrendingItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TrendDetailModal = ({ item, isOpen, onClose }: TrendDetailModalProps) => {
  const { t } = useTranslation();

  if (!item) return null;

  // Create sample data points for a more detailed 24-hour view
  const trendData = [
    { time: '24h ago', volume: Math.max(0, item.volume - (item.volume * (item.change / 100))) },
    { time: '18h ago', volume: Math.max(0, item.volume - (item.volume * (item.change / 150))) },
    { time: '12h ago', volume: Math.max(0, item.volume - (item.volume * (item.change / 200))) },
    { time: '6h ago', volume: Math.max(0, item.volume - (item.volume * (item.change / 300))) },
    { time: 'Now', volume: item.volume },
  ];

  const metrics = {
    volume: {
      color: '#9b87f5',
      name: t('dashboard.trends.mentions')
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {item.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <TrendChart data={trendData} metrics={metrics} />
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="mb-2">
            Volume attuale: {item.volume.toLocaleString()} {t('dashboard.trends.mentions')}
          </p>
          <p>
            Variazione: <span className={item.change >= 0 ? 'text-green-500' : 'text-red-500'}>
              {item.change >= 0 ? '+' : ''}{item.change}%
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
