
import React from "react";
import { Navigation } from "@/components/Navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/auth";
import { TrendingSection } from "@/components/dashboard/TrendingSection";
import { FeatureSection } from "@/components/dashboard/FeatureSection";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { PredictiveTrends } from "@/components/dashboard/PredictiveTrends";
import { ShareSection } from "@/components/ShareSection";
import { WeeklyReports } from "@/components/dashboard/WeeklyReports";
import { DashboardSettings } from "@/components/dashboard/DashboardSettings";
import { useDashboardSettings, WidgetKey } from "@/hooks/useDashboardSettings";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableWidget } from "@/components/dashboard/SortableWidget";

const Dashboard = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { session } = useAuth();
  const { widgetSettings, widgetOrder, reorderWidgets } = useDashboardSettings();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleNotificationToggle = async () => {
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        toast({
          title: t('dashboard.notifications.enabled'),
          description: t('dashboard.notifications.description'),
        });
      } else {
        toast({
          title: t('Error'),
          description: t('dashboard.notifications.denied'),
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error enabling notifications:", error);
      toast({
        title: t('Error'),
        description: t('dashboard.notifications.error'),
        variant: "destructive"
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = widgetOrder.indexOf(active.id as WidgetKey);
      const newIndex = widgetOrder.indexOf(over.id as WidgetKey);
      const newOrder = arrayMove(widgetOrder, oldIndex, newIndex);
      reorderWidgets(newOrder);
    }
  };

  const widgetComponents: Record<WidgetKey, React.ReactNode> = {
    weeklyReports: <WeeklyReports />,
    trending: <TrendingSection />,
    features: <FeatureSection />,
    analytics: <AnalyticsSection />,
    predictive: <PredictiveTrends />,
    share: <ShareSection />
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
          <div className="flex items-center gap-4">
            <Button onClick={handleNotificationToggle} variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              {t('dashboard.notifications.enable')}
            </Button>
            <DashboardSettings />
          </div>
        </div>
        
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={widgetOrder} strategy={rectSortingStrategy}>
            <div className="grid gap-6">
              {widgetOrder.map((widgetKey) => (
                widgetSettings[widgetKey] && (
                  <SortableWidget key={widgetKey} id={widgetKey}>
                    {widgetComponents[widgetKey]}
                  </SortableWidget>
                )
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </main>
    </div>
  );
};

export default Dashboard;
