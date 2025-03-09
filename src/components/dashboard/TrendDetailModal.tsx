
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
    { time: '24h fa', volume: Math.round(Math.max(0, item.volume - (item.volume * (item.change / 100)))) },
    { time: '20h fa', volume: Math.round(Math.max(0, item.volume - (item.volume * (item.change / 120)))) },
    { time: '16h fa', volume: Math.round(Math.max(0, item.volume - (item.volume * (item.change / 140)))) },
    { time: '12h fa', volume: Math.round(Math.max(0, item.volume - (item.volume * (item.change / 160)))) },
    { time: '8h fa', volume: Math.round(Math.max(0, item.volume - (item.volume * (item.change / 180)))) },
    { time: '4h fa', volume: Math.round(Math.max(0, item.volume - (item.volume * (item.change / 200)))) },
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
      <DialogContent className="sm:max-w-[750px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {item.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div style={{ height: '400px' }}>
            <TrendChart data={trendData} metrics={metrics} />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-muted-foreground/10">
            <p className="text-sm text-muted-foreground">{t('dashboard.trends.mentions')}</p>
            <p className="text-lg font-semibold">{item.volume.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border border-muted-foreground/10">
            <p className="text-sm text-muted-foreground">{t('dashboard.trends.change')}</p>
            <p className={`text-lg font-semibold ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {item.change >= 0 ? '+' : ''}{item.change}%
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

