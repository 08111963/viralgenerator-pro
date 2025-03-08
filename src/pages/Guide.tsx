
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const Guide = () => {
  const { t } = useTranslation();

  const handleDownloadPDF = () => {
    // Creiamo il contenuto del PDF utilizzando il testo formattato
    const content = `
TrendAI - Guida Utente

1. Navigazione Principale
- Home: Pagina principale con panoramica delle funzionalità
- Dashboard: Centro di controllo per il monitoraggio dei trend
- Prezzi: Visualizzazione dei piani disponibili
- Admin: Area riservata agli amministratori

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
- Dashboard personalizzabile
`;

    // Creiamo un Blob con il contenuto
    const blob = new Blob([content], { type: 'text/plain' });
    
    // Creiamo un URL per il download
    const url = window.URL.createObjectURL(blob);
    
    // Creiamo un elemento <a> per il download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TrendAI-Guida-Utente.txt';
    
    // Clicchiamo il link per avviare il download
    document.body.appendChild(link);
    link.click();
    
    // Puliamo
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Guida Utente</h1>
          <Button onClick={handleDownloadPDF} variant="outline">
            <FileDown className="h-4 w-4 mr-2" />
            Scarica Guida
          </Button>
        </div>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Navigazione Principale</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Home:</strong> Pagina principale con panoramica delle funzionalità</li>
              <li><strong>Dashboard:</strong> Centro di controllo per il monitoraggio dei trend</li>
              <li><strong>Prezzi:</strong> Visualizzazione dei piani disponibili</li>
              <li><strong>Admin:</strong> Area riservata agli amministratori</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Dashboard</h2>
            <p className="mb-4">La dashboard è divisa in tre sezioni principali:</p>
            
            <h3 className="text-xl font-semibold mb-3">Monitoraggio Trend</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Hashtag in Tendenza:</strong> Visualizza gli hashtag più popolari con grafici e statistiche</li>
              <li><strong>Parole Chiave:</strong> Monitora le keywords più utilizzate</li>
              <li><strong>Argomenti in Tendenza:</strong> (Premium) Analisi dei topic principali</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Funzionalità Premium</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>API Key:</strong> Accesso programmatico ai dati</li>
              <li><strong>Generatore di Contenuti:</strong> Creazione contenuti ottimizzati</li>
              <li><strong>Analisi Predittiva:</strong> Previsioni sui trend futuri</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Piani e Prezzi</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Piano Base</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Analisi di base dei trend</li>
                  <li>Monitoraggio hashtag</li>
                  <li>Report settimanali</li>
                  <li>1 account social</li>
                  <li>Supporto email</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Piano Pro</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Tutte le funzionalità Base</li>
                  <li>Analisi predittiva avanzata</li>
                  <li>Generazione contenuti AI</li>
                  <li>5 account social</li>
                  <li>Supporto prioritario</li>
                  <li>Accesso API</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Funzionalità Aggiuntive</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Notifiche:</strong> Attivazione notifiche per nuovi trend</li>
              <li><strong>Multilingua:</strong> Supporto per italiano e inglese</li>
              <li><strong>Dashboard Personalizzabile:</strong> Organizzazione personalizzata dei widget</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Guide;
