
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Info, Check } from "lucide-react";

export const ContentTab = () => {
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
          {t('guide.sections.content.description')}
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>{t('guide.sections.content.title')}</CardTitle>
          <CardDescription>
            {t('guide.sections.content.subtitle')}
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
    </div>
  );
};
