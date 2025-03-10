
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
import { useDashboardSettings, DashboardWidgetSettings, WidgetKey } from "@/hooks/useDashboardSettings";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableWidget } from "./SortableWidget";

interface WidgetToggleProps {
  widgetKey: WidgetKey;
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const WidgetToggle = ({ widgetKey, label, checked, onToggle }: WidgetToggleProps) => {
  return (
    <SortableWidget id={widgetKey}>
      <div className="flex items-center justify-between py-2 px-2">
        <span className="text-sm">{label}</span>
        <Switch
          checked={checked}
          onCheckedChange={onToggle}
          aria-label={`Toggle ${label}`}
        />
      </div>
    </SortableWidget>
  );
};

export function DashboardSettings() {
  const { t } = useTranslation();
  const { widgetSettings, toggleWidget, widgetOrder, reorderWidgets } = useDashboardSettings();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = widgetOrder.indexOf(active.id as WidgetKey);
      const newIndex = widgetOrder.indexOf(over.id as WidgetKey);
      const newOrder = arrayMove(widgetOrder, oldIndex, newIndex);
      reorderWidgets(newOrder);
    }
  };

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
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={widgetOrder} strategy={verticalListSortingStrategy}>
              {widgetOrder.map((widgetKey) => (
                <WidgetToggle
                  key={widgetKey}
                  widgetKey={widgetKey}
                  label={widgetKey === 'zapierIntegration' ? 'Zapier Integration' : t(`dashboard.widgets.${widgetKey}`)}
                  checked={widgetSettings[widgetKey]}
                  onToggle={() => toggleWidget(widgetKey)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
