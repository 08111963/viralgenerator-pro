
import { useState, useEffect } from 'react';

export interface DashboardWidgetSettings {
  weeklyReports: boolean;
  trending: boolean;
  features: boolean;
  analytics: boolean;
  predictive: boolean;
  share: boolean;
}

export type WidgetKey = keyof DashboardWidgetSettings;

const defaultSettings: DashboardWidgetSettings = {
  weeklyReports: true,
  trending: true,
  features: true,
  analytics: true,
  predictive: true,
  share: true,
};

const defaultOrder: WidgetKey[] = [
  'weeklyReports',
  'trending',
  'features',
  'analytics',
  'predictive',
  'share',
];

export function useDashboardSettings() {
  const [widgetSettings, setWidgetSettings] = useState<DashboardWidgetSettings>(() => {
    const saved = localStorage.getItem('dashboardWidgetSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [widgetOrder, setWidgetOrder] = useState<WidgetKey[]>(() => {
    const saved = localStorage.getItem('dashboardWidgetOrder');
    return saved ? JSON.parse(saved) : defaultOrder;
  });

  useEffect(() => {
    localStorage.setItem('dashboardWidgetSettings', JSON.stringify(widgetSettings));
  }, [widgetSettings]);

  useEffect(() => {
    localStorage.setItem('dashboardWidgetOrder', JSON.stringify(widgetOrder));
  }, [widgetOrder]);

  const toggleWidget = (widgetName: keyof DashboardWidgetSettings) => {
    setWidgetSettings(prev => ({
      ...prev,
      [widgetName]: !prev[widgetName]
    }));
  };

  const reorderWidgets = (newOrder: WidgetKey[]) => {
    setWidgetOrder(newOrder);
  };

  return {
    widgetSettings,
    widgetOrder,
    toggleWidget,
    reorderWidgets
  };
}
