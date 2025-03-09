
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Info, Check, CircleDollarSign } from "lucide-react";

export const PremiumFeaturesTab = () => {
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
          {t('guide.detailedGuide.premiumFeatures.description')}
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5" />
            {t('guide.detailedGuide.premiumFeatures.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">{t('guide.detailedGuide.premiumFeatures.basic.title')}</h4>
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
              <h4 className="font-medium mb-2">{t('guide.detailedGuide.premiumFeatures.pro.title')}</h4>
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
    </div>
  );
};
