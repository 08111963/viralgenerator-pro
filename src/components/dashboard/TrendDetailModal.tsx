
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

  const trendData = [
    { time: '24h fa', volume: Math.max(0, item.volume - (item.volume * (item.change / 100))) },
    { time: '18h fa', volume: Math.max(0, item.volume - (item.volume * (item.change / 150))) },
    { time: '12h fa', volume: Math.max(0, item.volume - (item.volume * (item.change / 200))) },
    { time: '9h fa', volume: Math.max(0, item.volume - (item.volume * (item.change / 250))) },
    { time: '6h fa', volume: Math.max(0, item.volume - (item.volume * (item.change / 300))) },
    { time: '3h fa', volume: Math.max(0, item.volume - (item.volume * (item.change / 350))) },
    { time: 'Ora', volume: item.volume },
  ];

  const metrics = {
    volume: {
      color: '#8b5cf6',
      name: t('dashboard.trends.mentions')
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {item.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <TrendChart data={trendData} metrics={metrics} />
        </div>
        <div className="mt-6 space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">{t('dashboard.trends.mentions')}</p>
              <p className="text-lg font-semibold">{item.volume.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">{t('dashboard.trends.change')}</p>
              <p className={`text-lg font-semibold ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.change >= 0 ? '+' : ''}{item.change}%
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
