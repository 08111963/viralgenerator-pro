
import React from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart2, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Domina i Trend Social con l'Intelligenza Artificiale
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Analizza, predici e crea contenuti virali con la potenza dell'AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">
                  Inizia Gratuitamente
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/demo">
                  Richiedi una Demo
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-accent/10">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Funzionalità Principali
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<TrendingUp className="h-8 w-8 text-primary" />}
                title="Monitoraggio Real-time"
                description="Monitora hashtag e trend in tempo reale su tutti i social media principali"
              />
              <FeatureCard
                icon={<BarChart2 className="h-8 w-8 text-primary" />}
                title="Analisi Predittiva"
                description="Anticipa i trend futuri con la nostra AI avanzata"
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-primary" />}
                title="Contenuti Virali"
                description="Genera contenuti ottimizzati per massimizzare l'engagement"
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Report Personalizzati"
                description="Ottieni insights dettagliati sul tuo pubblico target"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="p-6 rounded-lg bg-background border transition-all hover:shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
