
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Info, Settings, Layers, BarChart, CircleDollarSign } from "lucide-react";

export const DetailedGuide = () => {
  const { t } = useTranslation();

  const getTranslatedArray = (key: string): string[] => {
    const translation = t(key, { returnObjects: true });
    return Array.isArray(translation) ? translation : [];
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">{t('guide.detailedGuide.title')}</h2>
      
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="dashboard">{t('guide.sections.dashboard.title')}</TabsTrigger>
          <TabsTrigger value="trends">{t('guide.sections.trends.title')}</TabsTrigger>
          <TabsTrigger value="content">{t('guide.sections.content.title')}</TabsTrigger>
          <TabsTrigger value="features">Funzionalità Premium</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
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
                  <span>Impostazioni Dashboard</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  Personalizza la tua dashboard in base alle tue esigenze:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-1 text-green-500" />
                    <span>Configura gli alert per i trend rilevanti</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-1 text-green-500" />
                    <span>Personalizza i widget visualizzati</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-1 text-green-500" />
                    <span>Imposta le metriche prioritarie</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t('guide.sections.trends.description')}
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Come Utilizzare il Monitoraggio Trend</CardTitle>
              <CardDescription>
                Scopri come sfruttare al meglio l'analisi dei trend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {getTranslatedArray('guide.sections.trends.benefits').map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-1 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t('guide.sections.content.description')}
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Generazione Contenuti Ottimizzati</CardTitle>
              <CardDescription>
                Utilizza l'AI per creare contenuti efficaci
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {getTranslatedArray('guide.sections.content.benefits').map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-1 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Scopri le funzionalità premium di TrendAI
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5" />
                Piano Premium
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Piano Base</h4>
                  <ul className="space-y-2">
                    {getTranslatedArray('guide.detailedGuide.premiumFeatures.basic.items').map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Piano Pro</h4>
                  <ul className="space-y-2">
                    {getTranslatedArray('guide.detailedGuide.premiumFeatures.pro.items').map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-1 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};
