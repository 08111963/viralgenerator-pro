
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LayoutDashboard, TrendingUp, PenTool } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AppSections = () => {
  const { t } = useTranslation();

  const sectionsData = [
    {
      section: t('guide.sections.dashboard.title'),
      icon: LayoutDashboard,
      description: t('guide.sections.dashboard.description'),
      benefits: (t('guide.sections.dashboard.benefits', { returnObjects: true }) ?? []) as string[]
    },
    {
      section: t('guide.sections.trends.title'),
      icon: TrendingUp,
      description: t('guide.sections.trends.description'),
      benefits: (t('guide.sections.trends.benefits', { returnObjects: true }) ?? []) as string[]
    },
    {
      section: t('guide.sections.content.title'),
      icon: PenTool,
      description: t('guide.sections.content.description'),
      benefits: (t('guide.sections.content.benefits', { returnObjects: true }) ?? []) as string[]
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">{t('guide.sections.title')}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectionsData.map((section, index) => (
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
