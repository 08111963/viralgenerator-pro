
import React from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart2, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const trendData = [
  { name: 'Gen', value: 400 },
  { name: 'Feb', value: 600 },
  { name: 'Mar', value: 800 },
  { name: 'Apr', value: 1000 },
  { name: 'Mag', value: 1200 },
];

const predictiveData = [
  { name: 'Lun', value: 30 },
  { name: 'Mar', value: 45 },
  { name: 'Mer', value: 65 },
  { name: 'Gio', value: 80 },
  { name: 'Ven', value: 100 },
];

const engagementData = [
  { name: 'Post', value: 35 },
  { name: 'Story', value: 25 },
  { name: 'Reels', value: 40 },
];

const reportData = [
  { name: '18-24', value: 2400 },
  { name: '25-34', value: 4500 },
  { name: '35-44', value: 3000 },
  { name: '45-54', value: 1500 },
];

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
                chart={
                  <ResponsiveContainer width="100%" height={120}>
                    <AreaChart data={trendData}>
                      <Area type="monotone" dataKey="value" stroke="#9b87f5" fill="#D6BCFA" />
                      <Tooltip />
                    </AreaChart>
                  </ResponsiveContainer>
                }
              />
              <FeatureCard
                icon={<BarChart2 className="h-8 w-8 text-primary" />}
                title="Analisi Predittiva"
                description="Anticipa i trend futuri con la nostra AI avanzata"
                chart={
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={predictiveData}>
                      <Line type="monotone" dataKey="value" stroke="#9b87f5" />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                }
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-primary" />}
                title="Contenuti Virali"
                description="Genera contenuti ottimizzati per massimizzare l'engagement"
                chart={
                  <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                      <Pie data={engagementData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={25} outerRadius={40} fill="#9b87f5" />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                }
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Report Personalizzati"
                description="Ottieni insights dettagliati sul tuo pubblico target"
                chart={
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={reportData}>
                      <Bar dataKey="value" fill="#9b87f5" />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                }
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  chart 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  chart: React.ReactNode;
}) => {
  return (
    <div className="p-6 rounded-lg bg-background border transition-all hover:shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="mt-4">
        {chart}
      </div>
    </div>
  );
};

export default Index;

