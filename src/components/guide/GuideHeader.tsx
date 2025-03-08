import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export const GuideHeader = () => {
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

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = i18n.language === 'en' ? 'TrendAI-User-Guide.txt' : 'TrendAI-Guida-Utente.txt';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">{t('guide.title')}</h1>
      <Button onClick={handleDownloadPDF} variant="outline">
        <FileDown className="h-4 w-4 mr-2" />
        {t('guide.downloadButton')}
      </Button>
    </div>
  );
};
