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
import { useNavigate } from 'react-router-dom';
import { useTermsAcceptance } from "@/hooks/useTermsAcceptance";

const Dashboard = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const { session } = useAuth();
  const navigate = useNavigate();
  const { hasAcceptedTerms, isLoading } = useTermsAcceptance();
  const { widgetSettings, widgetOrder, reorderWidgets } = useDashboardSettings();

  React.useEffect(() => {
    if (!isLoading && !hasAcceptedTerms) {
      toast({
        title: i18n.language === 'it' 
          ? 'Accettazione Termini Richiesta'
          : 'Terms Acceptance Required',
        description: i18n.language === 'it'
          ? 'Per favore accetta i termini e la privacy policy per continuare'
          : 'Please accept the terms and privacy policy to continue',
        variant: "destructive"
      });
      navigate('/terms');
    }
  }, [hasAcceptedTerms, isLoading, navigate, toast, i18n.language]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hasAcceptedTerms) {
    return null;
  }

  // Update document title and meta tags for SEO based on current language
  React.useEffect(() => {
    const title = i18n.language === 'it' 
      ? "Dashboard - ViralGenerator Pro | Analisi Trend Social"
      : "Dashboard - ViralGenerator Pro | Social Trend Analysis";
    
    document.title = title;
    
    const description = i18n.language === 'it'
      ? 'Accedi alla dashboard di ViralGenerator Pro per analizzare i trend social in tempo reale, generare contenuti virali e visualizzare previsioni AI personalizzate.'
      : 'Access the ViralGenerator Pro dashboard to analyze social trends in real-time, generate viral content, and view personalized AI predictions.';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'dashboard social media, analisi trend, contenuti virali, AI marketing, social media analytics, trend prediction');
  }, [i18n.language]);

  const handleNotificationToggle = async () => {
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        toast({
          title: t('dashboard.notifications.enabled'),
          description: t('dashboard.notifications.description'),
        });
        
        // Esempio di notifica
        new Notification("ViralGenerator Pro", {
          body: "Le notifiche sono state attivate con successo!",
          icon: "/favicon.ico"
        });
      } else {
        toast({
          title: "Permesso negato",
          description: "Per ricevere le notifiche, devi consentire l'accesso nelle impostazioni del browser.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Errore nell'attivazione delle notifiche:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore nell'attivazione delle notifiche.",
        variant: "destructive"
      });
    }
  };

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

  const widgetComponents: Record<WidgetKey, React.ReactNode> = {
    weeklyReports: <WeeklyReports />,
    trending: <TrendingSection key="trending" />,
    features: <FeatureSection key="features" />,
    analytics: <AnalyticsSection key="analytics" />,
    predictive: <PredictiveTrends key="predictive" />,
    share: <ShareSection key="share" />
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
