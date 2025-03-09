
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, Info } from "lucide-react";

export const DetailedGuide = () => {
  const { t } = useTranslation();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">{t('guide.detailedGuide.title')}</h2>
      
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <TabsTrigger value="dashboard">{t('guide.sections.dashboard.title')}</TabsTrigger>
          <TabsTrigger value="trends">{t('guide.sections.trends.title')}</TabsTrigger>
          <TabsTrigger value="content">{t('guide.sections.content.title')}</TabsTrigger>
          <TabsTrigger value="premium">{t('guide.detailedGuide.premiumFeatures.title')}</TabsTrigger>
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
                {(t('guide.detailedGuide.dashboard.trendMonitoring.items', { returnObjects: true }) as string[]).map((item, idx) => (
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
                {(t('guide.detailedGuide.dashboard.analytics.items', { returnObjects: true }) as string[]).map((item, idx) => (
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
                {(t('guide.sections.trends.benefits', { returnObjects: true }) as string[]).map((benefit, idx) => (
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
                {(t('guide.sections.content.benefits', { returnObjects: true }) as string[]).map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-1 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="premium" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('guide.detailedGuide.premiumFeatures.basic.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {(t('guide.detailedGuide.premiumFeatures.basic.items', { returnObjects: true }) as string[]).map((item, idx) => (
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
                <CardTitle>{t('guide.detailedGuide.premiumFeatures.pro.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {(t('guide.detailedGuide.premiumFeatures.pro.items', { returnObjects: true }) as string[]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};
