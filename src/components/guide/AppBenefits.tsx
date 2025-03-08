
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, Lightbulb, Clock, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AppBenefits = () => {
  const { t } = useTranslation();

  const appBenefits = [
    {
      title: t('guide.appBenefits.anticipateTrends.title'),
      icon: TrendingUp,
      description: t('guide.appBenefits.anticipateTrends.description')
    },
    {
      title: t('guide.appBenefits.informedDecisions.title'),
      icon: Lightbulb,
      description: t('guide.appBenefits.informedDecisions.description')
    },
    {
      title: t('guide.appBenefits.timeSaving.title'),
      icon: Clock,
      description: t('guide.appBenefits.timeSaving.description')
    },
    {
      title: t('guide.appBenefits.competitiveAdvantage.title'),
      icon: Rocket,
      description: t('guide.appBenefits.competitiveAdvantage.description')
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">{t('guide.appBenefits.title')}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {appBenefits.map((benefit, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <benefit.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
