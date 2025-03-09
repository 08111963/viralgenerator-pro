
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Check, BarChart, Layers, Settings } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const DashboardTab = () => {
  const { t } = useTranslation();

  const getTranslatedArray = (key: string): string[] => {
    const translation = t(key, { returnObjects: true });
    return Array.isArray(translation) ? translation : [];
  };

  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          {t('guide.sections.dashboard.description')}
        </AlertDescription>
      </Alert>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="monitoring">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>{t('guide.detailedGuide.dashboard.trendMonitoring.title')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 pt-2">
              {getTranslatedArray('guide.detailedGuide.dashboard.trendMonitoring.items').map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-1 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="analytics">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>{t('guide.detailedGuide.dashboard.analytics.title')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 pt-2">
              {getTranslatedArray('guide.detailedGuide.dashboard.analytics.items').map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-1 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="settings">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>{t('guide.detailedGuide.dashboard.settings.title')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 pt-2">
              {getTranslatedArray('guide.detailedGuide.dashboard.settings.items').map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-1 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
