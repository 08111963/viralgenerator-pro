
import React from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
}) => {
  const { t } = useTranslation();
  
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
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full mt-8" variant={highlighted ? "default" : "outline"} asChild>
        <Link to="/register">
          {highlighted ? t('pricing.cta.start') : t('pricing.cta.free')}
        </Link>
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
      features: t('pricing.features.base', { returnObjects: true }) as string[]
    },
    {
      name: t('pricing.tiers.pro.name'),
      price: "€26,99",
      description: t('pricing.tiers.pro.description'),
      features: t('pricing.features.pro', { returnObjects: true }) as string[],
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

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tiers.map((tier) => (
              <PricingTier key={tier.name} {...tier} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {t('pricing.questions.title')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t('pricing.questions.description')}
            </p>
            <Button variant="outline" asChild>
              <Link to="/demo">
                {t('home.cta.demo')}
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
