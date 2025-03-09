
import { useState, useEffect } from 'react';

export interface DashboardWidgetSettings {
  weeklyReports: boolean;
  trending: boolean;
  features: boolean;
  analytics: boolean;
  predictive: boolean;
  share: boolean;
}

const defaultSettings: DashboardWidgetSettings = {
  weeklyReports: true,
  trending: true,
  features: true,
  analytics: true,
  predictive: true,
  share: true,
};

export function useDashboardSettings() {
  const [widgetSettings, setWidgetSettings] = useState<DashboardWidgetSettings>(() => {
    const saved = localStorage.getItem('dashboardWidgetSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('dashboardWidgetSettings', JSON.stringify(widgetSettings));
  }, [widgetSettings]);

  const toggleWidget = (widgetName: keyof DashboardWidgetSettings) => {
    setWidgetSettings(prev => ({
      ...prev,
      [widgetName]: !prev[widgetName]
    }));
  };

  return {
    widgetSettings,
    toggleWidget
  };
}
