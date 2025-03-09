
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

  // Create sample data points for the last 24 hours
  const trendData = [
    { time: '24h ago', volume: Math.max(0, item.volume - (item.volume * (item.change / 100))) },
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
      </DialogContent>
    </Dialog>
  );
};
