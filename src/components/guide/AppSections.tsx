
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Home, LayoutDashboard, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AppSections = () => {
  const { t } = useTranslation();

  const benefitsData = [
    {
      section: t('guide.sections.home.title'),
      icon: Home,
      description: t('guide.sections.home.description'),
      benefits: (t('guide.sections.home.benefits', { returnObjects: true }) ?? []) as string[]
    },
    {
      section: t('guide.sections.dashboard.title'),
      icon: LayoutDashboard,
      description: t('guide.sections.dashboard.description'),
      benefits: (t('guide.sections.dashboard.benefits', { returnObjects: true }) ?? []) as string[]
    },
    {
      section: t('guide.sections.pricing.title'),
      icon: DollarSign,
      description: t('guide.sections.pricing.description'),
      benefits: (t('guide.sections.pricing.benefits', { returnObjects: true }) ?? []) as string[]
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">{t('guide.sections.title')}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {benefitsData.map((section, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <section.icon className="h-5 w-5 text-primary" />
                <CardTitle>{section.section}</CardTitle>
              </div>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {section.benefits?.map((benefit: string, idx: number) => (
                  <li key={idx} className="text-muted-foreground">{benefit}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
