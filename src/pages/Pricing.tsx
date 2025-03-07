
import React from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PricingTier = ({
  name,
  price,
  description,
  features,
  highlighted = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) => (
  <div className={`p-6 rounded-lg ${highlighted ? 'border-2 border-primary ring-2 ring-primary/10' : 'border'} bg-background`}>
    <h3 className="text-2xl font-bold">{name}</h3>
    <div className="mt-4 flex items-baseline">
      <span className="text-4xl font-bold">{price}</span>
      {price !== 'Personalizzato' && <span className="ml-1 text-muted-foreground">/mese</span>}
    </div>
    <p className="mt-4 text-muted-foreground">{description}</p>
    <ul className="mt-6 space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Button className="w-full mt-8" variant={highlighted ? "default" : "outline"} asChild>
      <Link to="/register">
        {highlighted ? "Inizia Ora" : "Prova Gratuita"}
      </Link>
    </Button>
  </div>
);

const Pricing = () => {
  const tiers = [
    {
      name: "Base",
      price: "€12",
      description: "Inizia con 7 giorni di prova gratuita",
      features: [
        "Analisi di base dei trend",
        "Monitoraggio hashtag",
        "Report settimanali",
        "1 account social",
        "Supporto email"
      ]
    },
    {
      name: "Pro",
      price: "€26,99",
      description: "Ideale per professionisti e team in crescita",
      features: [
        "Tutte le funzionalità Base",
        "Analisi predittiva avanzata",
        "Generazione contenuti AI",
        "5 account social",
        "Supporto prioritario",
        "API access"
      ],
      highlighted: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Prezzi semplici e trasparenti
            </h1>
            <p className="text-xl text-muted-foreground">
              Prova il piano Base gratuitamente per 7 giorni. Nessuna carta di credito richiesta.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tiers.map((tier) => (
              <PricingTier key={tier.name} {...tier} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Hai domande sui nostri piani?
            </h2>
            <p className="text-muted-foreground mb-8">
              Il nostro team è qui per aiutarti a trovare il piano perfetto per te.
            </p>
            <Button variant="outline" asChild>
              <Link to="/demo">
                Richiedi una Demo
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
