
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Navigation } from "@/components/Navigation";

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{t('legal.terms.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.agreement.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('legal.terms.agreement.description')}</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.usage.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('legal.terms.usage.description')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.intellectual.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('legal.terms.intellectual.description')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.termination.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('legal.terms.termination.description')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.liability.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('legal.terms.liability.description')}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.contact.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('legal.terms.contact.description')}</p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
