
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Check, BarChart, Layers, Settings, Bell } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

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

      <div className="w-full rounded-lg overflow-hidden mb-6">
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
          alt="Dashboard example" 
          className="w-full h-48 object-cover"
        />
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="monitoring">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>{t('guide.detailedGuide.dashboard.trendMonitoring.title')}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
                  alt="Analytics visualization" 
                  className="w-full h-32 object-cover"
                />
              </div>
              <ul className="space-y-2">
                {getTranslatedArray('guide.detailedGuide.dashboard.trendMonitoring.items').map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-1 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notifications">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifiche</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                    alt="Browser settings" 
                    className="w-full h-32 object-cover"
                  />
                </div>
                <h4 className="font-medium mb-2">Come attivare le notifiche:</h4>
                <ol className="space-y-4">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold mr-2">1.</span>
                    <span>Clicca sull'icona del lucchetto (o del punto esclamativo) nella barra degli indirizzi del browser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold mr-2">2.</span>
                    <span>Cerca l'impostazione "Notifiche"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold mr-2">3.</span>
                    <span>Cambia l'impostazione da "Blocca" a "Consenti"</span>
                  </li>
                </ol>

                <div className="mt-4 space-y-2">
                  <p className="font-medium">Per browser specifici:</p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Chrome:</strong> Icona lucchetto → Impostazioni sito → Notifiche → Consenti</p>
                    <p><strong>Firefox:</strong> Icona scudo/punto esclamativo → Impostazioni notifiche → Consenti</p>
                    <p><strong>Safari:</strong> Preferenze → Siti web → Notifiche → Modifica permessi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
