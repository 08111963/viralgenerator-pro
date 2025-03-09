
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Navigation } from "@/components/Navigation";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{t('legal.privacy.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.collection.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('legal.privacy.collection.description')}</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.use.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('legal.privacy.use.description')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.cookies.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('legal.privacy.cookies.description')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.security.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('legal.privacy.security.description')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.rights.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('legal.privacy.rights.description')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.contact.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('legal.privacy.contact.description')}</p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
