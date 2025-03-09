
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>{t('legal.privacy.title')}</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <div className="space-y-6">
            <section>
              <h2>{t('legal.privacy.collection.title')}</h2>
              <p>{t('legal.privacy.collection.description')}</p>
            </section>
            
            <section>
              <h2>{t('legal.privacy.use.title')}</h2>
              <p>{t('legal.privacy.use.description')}</p>
            </section>

            <section>
              <h2>{t('legal.privacy.cookies.title')}</h2>
              <p>{t('legal.privacy.cookies.description')}</p>
            </section>

            <section>
              <h2>{t('legal.privacy.security.title')}</h2>
              <p>{t('legal.privacy.security.description')}</p>
            </section>

            <section>
              <h2>{t('legal.privacy.rights.title')}</h2>
              <p>{t('legal.privacy.rights.description')}</p>
            </section>

            <section>
              <h2>{t('legal.privacy.contact.title')}</h2>
              <p>{t('legal.privacy.contact.description')}</p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
