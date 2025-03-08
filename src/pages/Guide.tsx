
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileDown, Home, LayoutDashboard, DollarSign, TrendingUp, Lightbulb, Clock, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

const Guide = () => {
  const { t, i18n } = useTranslation();

  const handleDownloadPDF = () => {
    // Create PDF content using formatted text
    const content = i18n.language === 'en' ? `
TrendAI - User Guide

1. Main Navigation
- Home: Main page with features overview
- Dashboard: Control center for trend monitoring
- Pricing: View available plans

2. Dashboard
The dashboard is divided into three main sections:

Trend Monitoring
- Trending Hashtags: View most popular hashtags
- Keywords: Monitor most used keywords
- Trending Topics: Analysis of main topics (Premium)

Premium Features
- API Key: Programmatic data access
- Content Generator: Optimized content creation
- Predictive Analysis: Future trend forecasts

3. Pricing and Plans
Basic Plan:
- Basic trend analysis
- Hashtag monitoring
- Weekly reports
- 1 social account
- Email support

Pro Plan:
- All Basic features
- Advanced predictive analysis
- AI content generation
- 5 social accounts
- Priority support
- API access

4. Additional Features
- Notifications for new trends
- Multilanguage support (Italian/English)
` : `
TrendAI - Guida Utente

1. Navigazione Principale
- Home: Pagina principale con panoramica delle funzionalità
- Dashboard: Centro di controllo per il monitoraggio dei trend
- Prezzi: Visualizzazione dei piani disponibili

2. Dashboard
La dashboard è divisa in tre sezioni principali:

Monitoraggio Trend
- Hashtag in Tendenza: Visualizza gli hashtag più popolari
- Parole Chiave: Monitora le keywords più utilizzate
- Argomenti in Tendenza: Analisi dei topic principali (Premium)

Funzionalità Premium
- API Key: Accesso programmatico ai dati
- Generatore di Contenuti: Creazione contenuti ottimizzati
- Analisi Predittiva: Previsioni sui trend futuri

3. Piani e Prezzi
Piano Base:
- Analisi di base dei trend
- Monitoraggio hashtag
- Report settimanali
- 1 account social
- Supporto email

Piano Pro:
- Tutte le funzionalità Base
- Analisi predittiva avanzata
- Generazione contenuti AI
- 5 account social
- Supporto prioritario
- Accesso API

4. Funzionalità Aggiuntive
- Notifiche per nuovi trend
- Supporto multilingua (Italiano/Inglese)
`;

    // Create a Blob with the content
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = i18n.language === 'en' ? 'TrendAI-User-Guide.txt' : 'TrendAI-Guida-Utente.txt';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const benefitsData = [
    {
      section: t('guide.sections.home.title'),
      icon: Home,
      description: t('guide.sections.home.description'),
      benefits: t('guide.sections.home.benefits', { returnObjects: true }) as string[]
    },
    {
      section: t('guide.sections.dashboard.title'),
      icon: LayoutDashboard,
      description: t('guide.sections.dashboard.description'),
      benefits: t('guide.sections.dashboard.benefits', { returnObjects: true }) as string[]
    },
    {
      section: t('guide.sections.pricing.title'),
      icon: DollarSign,
      description: t('guide.sections.pricing.description'),
      benefits: t('guide.sections.pricing.benefits', { returnObjects: true }) as string[]
    }
  ];

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
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('guide.title')}</h1>
          <Button onClick={handleDownloadPDF} variant="outline">
            <FileDown className="h-4 w-4 mr-2" />
            {t('guide.downloadButton')}
          </Button>
        </div>

        <div className="space-y-12">
          {/* App Benefits */}
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

          {/* App Sections */}
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
                      {section.benefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="text-muted-foreground">{benefit}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Detailed Guide */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">{t('guide.detailedGuide.title')}</h2>
            <div className="prose prose-slate max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('guide.detailedGuide.mainNavigation.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {t('guide.detailedGuide.mainNavigation.items', { returnObjects: true }).map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('guide.detailedGuide.dashboard.title')}</h2>
                <p className="mb-4">{t('guide.detailedGuide.dashboard.description')}</p>
                
                <h3 className="text-xl font-semibold mb-3">{t('guide.detailedGuide.dashboard.trendMonitoring.title')}</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  {t('guide.detailedGuide.dashboard.trendMonitoring.items', { returnObjects: true }).map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mb-3">{t('guide.detailedGuide.dashboard.premiumFeatures.title')}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {t('guide.detailedGuide.dashboard.premiumFeatures.items', { returnObjects: true }).map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('guide.detailedGuide.pricing.title')}</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-3">{t('guide.detailedGuide.pricing.basic.title')}</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {t('guide.detailedGuide.pricing.basic.items', { returnObjects: true }).map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-3">{t('guide.detailedGuide.pricing.pro.title')}</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {t('guide.detailedGuide.pricing.pro.items', { returnObjects: true }).map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('guide.detailedGuide.additionalFeatures.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {t('guide.detailedGuide.additionalFeatures.items', { returnObjects: true }).map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Guide;
