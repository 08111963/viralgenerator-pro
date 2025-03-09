
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDashboardSettings, DashboardWidgetSettings } from "@/hooks/useDashboardSettings";

interface WidgetToggleProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const WidgetToggle = ({ label, checked, onToggle }: WidgetToggleProps) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm">{label}</span>
    <Switch
      checked={checked}
      onCheckedChange={onToggle}
      aria-label={`Toggle ${label}`}
    />
  </div>
);

export function DashboardSettings() {
  const { t } = useTranslation();
  const { widgetSettings, toggleWidget } = useDashboardSettings();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="w-4 h-4" />
          {t('dashboard.settings.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <WidgetToggle
            label={t('dashboard.widgets.weeklyReports')}
            checked={widgetSettings.weeklyReports}
            onToggle={() => toggleWidget('weeklyReports')}
          />
          <WidgetToggle
            label={t('dashboard.widgets.trending')}
            checked={widgetSettings.trending}
            onToggle={() => toggleWidget('trending')}
          />
          <WidgetToggle
            label={t('dashboard.widgets.features')}
            checked={widgetSettings.features}
            onToggle={() => toggleWidget('features')}
          />
          <WidgetToggle
            label={t('dashboard.widgets.analytics')}
            checked={widgetSettings.analytics}
            onToggle={() => toggleWidget('analytics')}
          />
          <WidgetToggle
            label={t('dashboard.widgets.predictive')}
            checked={widgetSettings.predictive}
            onToggle={() => toggleWidget('predictive')}
          />
          <WidgetToggle
            label={t('dashboard.widgets.share')}
            checked={widgetSettings.share}
            onToggle={() => toggleWidget('share')}
          />
        </div>
      </CardContent>
    </Card>
  );
}
