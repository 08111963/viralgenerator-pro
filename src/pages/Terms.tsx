
import React from "react";
import { Navigation } from "@/components/Navigation";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h3>1. Raccolta dei Dati</h3>
                  <p>Raccogliamo i seguenti tipi di informazioni:</p>
                  <ul>
                    <li>Informazioni di registrazione dell'account (email, nome utente)</li>
                    <li>Dati di utilizzo del servizio e preferenze</li>
                    <li>Informazioni tecniche del dispositivo</li>
                    <li>Cookie e identificatori del dispositivo</li>
                  </ul>

                  <h3>2. Utilizzo dei Dati</h3>
                  <p>Utilizziamo i dati raccolti per:</p>
                  <ul>
                    <li>Fornire e migliorare i nostri servizi</li>
                    <li>Personalizzare l'esperienza utente</li>
                    <li>Analizzare l'utilizzo della piattaforma</li>
                    <li>Inviare comunicazioni di servizio</li>
                    <li>Prevenire frodi e abusi</li>
                  </ul>

                  <h3>3. Protezione dei Dati</h3>
                  <p>Adottiamo misure di sicurezza tecniche e organizzative per proteggere i tuoi dati personali, inclusi:</p>
                  <ul>
                    <li>Crittografia dei dati in transito e a riposo</li>
                    <li>Controlli degli accessi rigorosi</li>
                    <li>Monitoraggio regolare della sicurezza</li>
                  </ul>

                  <h3>4. I Tuoi Diritti</h3>
                  <p>Hai diritto a:</p>
                  <ul>
                    <li>Accedere ai tuoi dati personali</li>
                    <li>Richiedere la rettifica dei dati inesatti</li>
                    <li>Richiedere la cancellazione dei dati</li>
                    <li>Opporti al trattamento dei dati</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold">Privacy Policy</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h3>1. Data Collection</h3>
                  <p>We collect the following types of information:</p>
                  <ul>
                    <li>Account registration information (email, username)</li>
                    <li>Service usage data and preferences</li>
                    <li>Device technical information</li>
                    <li>Cookies and device identifiers</li>
                  </ul>

                  <h3>2. Data Usage</h3>
                  <p>We use the collected data to:</p>
                  <ul>
                    <li>Provide and improve our services</li>
                    <li>Personalize user experience</li>
                    <li>Analyze platform usage</li>
                    <li>Send service communications</li>
                    <li>Prevent fraud and abuse</li>
                  </ul>

                  <h3>3. Data Protection</h3>
                  <p>We implement appropriate security measures to protect your personal data, including:</p>
                  <ul>
                    <li>Encryption of data in transit and at rest</li>
                    <li>Strict access controls</li>
                    <li>Regular security monitoring</li>
                  </ul>

                  <h3>4. Your Rights</h3>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Access your personal data</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to data processing</li>
                  </ul>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="terms" className="space-y-4">
            {i18n.language === 'it' ? (
              <>
                <h2 className="text-2xl font-semibold">Termini di Utilizzo</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h3>1. Accettazione dei Termini</h3>
                  <p>Utilizzando il nostro servizio, accetti questi termini di utilizzo.</p>

                  <h3>2. Utilizzo del Servizio</h3>
                  <p>Ti impegni a:</p>
                  <ul>
                    <li>Fornire informazioni accurate durante la registrazione</li>
                    <li>Mantenere la sicurezza delle tue credenziali di accesso</li>
                    <li>Utilizzare il servizio in conformità con le leggi applicabili</li>
                    <li>Non interferire con il funzionamento del servizio</li>
                  </ul>

                  <h3>3. Contenuti degli Utenti</h3>
                  <p>Quando pubblichi contenuti:</p>
                  <ul>
                    <li>Mantieni i diritti sui tuoi contenuti</li>
                    <li>Ci concedi una licenza per utilizzarli nel servizio</li>
                    <li>Sei responsabile dei contenuti che pubblichi</li>
                  </ul>

                  <h3>4. Limitazioni di Responsabilità</h3>
                  <p>Il servizio è fornito "così com'è" e non offriamo garanzie specifiche.</p>

                  <h3>5. Modifiche ai Termini</h3>
                  <p>Ci riserviamo il diritto di modificare questi termini con un preavviso adeguato.</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold">Terms of Use</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h3>1. Acceptance of Terms</h3>
                  <p>By using our service, you agree to these terms of use.</p>

                  <h3>2. Service Usage</h3>
                  <p>You agree to:</p>
                  <ul>
                    <li>Provide accurate information during registration</li>
                    <li>Maintain the security of your login credentials</li>
                    <li>Use the service in compliance with applicable laws</li>
                    <li>Not interfere with the service operation</li>
                  </ul>

                  <h3>3. User Content</h3>
                  <p>When posting content:</p>
                  <ul>
                    <li>You retain rights to your content</li>
                    <li>You grant us a license to use it in the service</li>
                    <li>You are responsible for the content you post</li>
                  </ul>

                  <h3>4. Liability Limitations</h3>
                  <p>The service is provided "as is" and we make no specific warranties.</p>

                  <h3>5. Terms Modifications</h3>
                  <p>We reserve the right to modify these terms with appropriate notice.</p>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Terms;
