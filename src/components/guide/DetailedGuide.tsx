
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, Info } from "lucide-react";

export const DetailedGuide = () => {
  const { t } = useTranslation();

  // Helper function to safely handle array translations
  const getTranslatedArray = (key: string): string[] => {
    const translation = t(key, { returnObjects: true });
    return Array.isArray(translation) ? translation : [];
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">{t('guide.detailedGuide.title')}</h2>
      
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid grid-cols-3 gap-4">
          <TabsTrigger value="dashboard">{t('guide.sections.dashboard.title')}</TabsTrigger>
          <TabsTrigger value="trends">{t('guide.sections.trends.title')}</TabsTrigger>
          <TabsTrigger value="content">{t('guide.sections.content.title')}</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t('guide.sections.dashboard.description')}
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>{t('guide.detailedGuide.dashboard.trendMonitoring.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {getTranslatedArray('guide.detailedGuide.dashboard.trendMonitoring.items').map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-1 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('guide.detailedGuide.dashboard.analytics.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {getTranslatedArray('guide.detailedGuide.dashboard.analytics.items').map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-1 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t('guide.sections.trends.description')}
            </AlertDescription>
          </Alert>

          <Card>
            <CardContent className="pt-6">
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
            <CardContent className="pt-6">
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
      </Tabs>
    </section>
  );
};
