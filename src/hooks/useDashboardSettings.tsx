import { useState } from 'react';

export type WidgetKey = 
  | 'trending'
  | 'features'
  | 'analytics'
  | 'predictive'
  | 'share'
  | 'contentOptimizer'
  | 'zapierIntegration';

export interface DashboardWidgetSettings {
  trending: boolean;
  features: boolean;
  analytics: boolean;
  predictive: boolean;
  share: boolean;
  contentOptimizer: boolean;
  zapierIntegration: boolean;
}

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};

export const useDashboardSettings = () => {
  const [widgetSettings, setWidgetSettings] = useLocalStorage<DashboardWidgetSettings>(
    'dashboardWidgetSettings',
    {
      trending: true,
      features: true,
      analytics: true,
      predictive: true,
      share: true,
      contentOptimizer: true,
      zapierIntegration: true,
    }
  );

  const [widgetOrder, setWidgetOrder] = useLocalStorage<WidgetKey[]>(
    'dashboardWidgetOrder',
    [
      'trending',
      'features',
      'analytics',
      'predictive',
      'share',
      'contentOptimizer',
      'zapierIntegration',
    ]
  );

  const toggleWidget = (widgetKey: WidgetKey) => {
    setWidgetSettings((prevSettings) => ({
      ...prevSettings,
      [widgetKey]: !prevSettings[widgetKey],
    }));
  };

  const reorderWidgets = (newOrder: WidgetKey[]) => {
    setWidgetOrder(newOrder);
  };

  return {
    widgetSettings,
    toggleWidget,
    widgetOrder,
    reorderWidgets,
  };
};
