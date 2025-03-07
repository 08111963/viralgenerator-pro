
import { Navigation } from "@/components/Navigation";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Funzionalità</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard
            title="Analisi in Tempo Reale"
            description="Monitora i trend social media in tempo reale con aggiornamenti istantanei"
          />
          <FeatureCard
            title="Dashboard Personalizzabile"
            description="Crea dashboard personalizzate per monitorare le metriche più importanti per te"
          />
          <FeatureCard
            title="Report Automatizzati"
            description="Genera report dettagliati automaticamente con i dati più rilevanti"
          />
          <FeatureCard
            title="Intelligenza Artificiale"
            description="Utilizza l'AI per prevedere trend e ottimizzare i contenuti"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Features;
