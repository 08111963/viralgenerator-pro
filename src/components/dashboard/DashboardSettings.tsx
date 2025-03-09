
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useDashboardSettings, DashboardWidgetSettings } from "@/hooks/useDashboardSettings";

interface WidgetToggleProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const WidgetToggle = ({ label, checked, onToggle }: WidgetToggleProps) => (
  <div className="flex items-center justify-between py-2 px-2">
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>{t('dashboard.settings.title')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
