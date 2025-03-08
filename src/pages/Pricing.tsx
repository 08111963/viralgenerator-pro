import React from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { TrendingUp, Hash, FileText, UserRound, CheckCircle2, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FeatureItem = ({ text, icon: Icon }: { text: string; icon: React.ElementType }) => (
  <li className="flex items-start">
    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-2" />
    <span className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      {text}
    </span>
  </li>
);

const getFeatureIcon = (feature: string) => {
  const iconMap: { [key: string]: React.ElementType } = {
    'Analisi di base dei trend': TrendingUp,
    'Basic trend analysis': TrendingUp,
    'Monitoraggio hashtag': Hash,
    'Hashtag monitoring': Hash,
    'Report settimanali': FileText,
    'Weekly reports': FileText,
    '1 account social': UserRound,
    '1 social account': UserRound,
  };
  return iconMap[feature] || CheckCircle2;
};

const PricingTier = ({
  name,
  price,
  description,
  features,
  priceId,
  highlighted = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  priceId?: string;
  highlighted?: boolean;
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const handleCheckout = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast({
          title: "Accesso richiesto",
          description: "Per favore accedi prima di procedere con l'acquisto",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch('https://vpgwwpiqwbxgsovjpzhh.supabase.co/functions/v1/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error('Errore durante il checkout');
      }

      const { url, error } = await response.json();
      
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il checkout",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`p-6 rounded-lg ${highlighted ? 'border-2 border-primary ring-2 ring-primary/10' : 'border'} bg-background`}>
      <h3 className="text-2xl font-bold">{name}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="ml-1 text-muted-foreground">/month</span>}
      </div>
      <p className="mt-4 text-muted-foreground">{description}</p>
      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <FeatureItem key={index} text={feature} icon={getFeatureIcon(feature)} />
        ))}
      </ul>
      <Button 
        className="w-full mt-8" 
        variant={highlighted ? "default" : "outline"}
        onClick={priceId ? handleCheckout : undefined}
        asChild={!priceId}
      >
        {priceId ? (
          <span>{highlighted ? t('pricing.cta.start') : t('pricing.cta.free')}</span>
        ) : (
          <Link to="/register">
            {highlighted ? t('pricing.cta.start') : t('pricing.cta.free')}
          </Link>
        )}
      </Button>
    </div>
  );
};

const Pricing = () => {
  const { t } = useTranslation();

  const tiers = [
    {
      name: t('pricing.tiers.base.name'),
      price: "€12",
      description: t('pricing.tiers.base.description'),
      features: t('pricing.features.base', { returnObjects: true }) as string[],
      priceId: "price_1OvKv8KCRGitJMKFPlxnOxiR"
    },
    {
      name: t('pricing.tiers.pro.name'),
      price: "€26,99",
      description: t('pricing.tiers.pro.description'),
      features: t('pricing.features.pro', { returnObjects: true }) as string[],
      priceId: "price_1OvKv8KCRGitJMKF7YtP8V9x",
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
              {t('pricing.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('pricing.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {tiers.map((tier) => (
              <PricingTier key={tier.name} {...tier} />
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">{t('pricing.faq.title')}</h2>
            <Accordion type="single" collapsible className="w-full">
              {(t('pricing.faq.questions', { returnObjects: true }) as Array<{ q: string; a: string }>).map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
