
import React from "react";
import { Navigation } from "@/components/Navigation";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TermsAcceptance } from "@/components/TermsAcceptance";

const Terms = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-8">{t('navigation.terms')}</h1>
        
        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="privacy">
              {i18n.language === 'it' ? 'Privacy' : 'Privacy Policy'}
            </TabsTrigger>
            <TabsTrigger value="terms">
              {i18n.language === 'it' ? 'Termini di Utilizzo' : 'Terms of Use'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="privacy" className="space-y-4">
            {i18n.language === 'it' ? (
              <>
                <h2 className="text-2xl font-semibold">Informativa sulla Privacy</h2>
                <p>Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h3>1. Raccolta dei Dati</h3>
                  <p>Raccogliamo i seguenti tipi di informazioni:</p>
                  <ul>
                    <li>Informazioni di registrazione dell'account</li>
                    <li>Dati di utilizzo del servizio</li>
                    <li>Informazioni tecniche del dispositivo</li>
                  </ul>

                  <h3>2. Utilizzo dei Dati</h3>
                  <p>Utilizziamo i dati raccolti per:</p>
                  <ul>
                    <li>Fornire e migliorare i nostri servizi</li>
                    <li>Personalizzare l'esperienza utente</li>
                    <li>Analizzare l'utilizzo della piattaforma</li>
                  </ul>

                  <h3>3. Protezione dei Dati</h3>
                  <p>Adottiamo misure di sicurezza appropriate per proteggere i tuoi dati personali.</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold">Privacy Policy</h2>
                <p>Last updated: {new Date().toLocaleDateString('en-US')}</p>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h3>1. Data Collection</h3>
                  <p>We collect the following types of information:</p>
                  <ul>
                    <li>Account registration information</li>
                    <li>Service usage data</li>
                    <li>Device technical information</li>
                  </ul>

                  <h3>2. Data Usage</h3>
                  <p>We use the collected data to:</p>
                  <ul>
                    <li>Provide and improve our services</li>
                    <li>Personalize user experience</li>
                    <li>Analyze platform usage</li>
                  </ul>

                  <h3>3. Data Protection</h3>
                  <p>We implement appropriate security measures to protect your personal data.</p>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="terms" className="space-y-4">
            {i18n.language === 'it' ? (
              <>
                <h2 className="text-2xl font-semibold">Termini di Utilizzo</h2>
                <p>Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h3>1. Accettazione dei Termini</h3>
                  <p>Utilizzando il nostro servizio, accetti questi termini di utilizzo.</p>

                  <h3>2. Utilizzo del Servizio</h3>
                  <p>Ti impegni a:</p>
                  <ul>
                    <li>Fornire informazioni accurate</li>
                    <li>Mantenere la sicurezza del tuo account</li>
                    <li>Rispettare le leggi applicabili</li>
                  </ul>

                  <h3>3. Limitazioni di Responsabilità</h3>
                  <p>Il servizio è fornito "così com'è" senza garanzie di alcun tipo.</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold">Terms of Use</h2>
                <p>Last updated: {new Date().toLocaleDateString('en-US')}</p>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h3>1. Acceptance of Terms</h3>
                  <p>By using our service, you agree to these terms of use.</p>

                  <h3>2. Service Usage</h3>
                  <p>You agree to:</p>
                  <ul>
                    <li>Provide accurate information</li>
                    <li>Maintain account security</li>
                    <li>Comply with applicable laws</li>
                  </ul>

                  <h3>3. Liability Limitations</h3>
                  <p>The service is provided "as is" without warranties of any kind.</p>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>

        <TermsAcceptance />
      </main>
    </div>
  );
};

export default Terms;
