
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navigation = () => {
  const { t } = useTranslation();

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TrendAI</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground/60 hover:text-foreground transition-colors">
            {t('navigation.home')}
          </Link>
          <Link to="/dashboard" className="text-foreground/60 hover:text-foreground transition-colors">
            {t('navigation.dashboard')}
          </Link>
          <Link to="/pricing" className="text-foreground/60 hover:text-foreground transition-colors">
            {t('navigation.pricing')}
          </Link>
          <Link to="/guide" className="text-foreground/60 hover:text-foreground transition-colors">
            Guida
          </Link>
          <Link to="/admin" className="text-foreground/60 hover:text-foreground transition-colors">
            {t('navigation.admin')}
          </Link>
          <Link to="/terms" className="text-foreground/60 hover:text-foreground transition-colors text-sm">
            {t('legal.terms.title')}
          </Link>
          <Link to="/privacy" className="text-foreground/60 hover:text-foreground transition-colors text-sm">
            {t('legal.privacy.title')}
          </Link>
          <LanguageSwitcher />
          <Button variant="outline" asChild>
            <Link to="/login">{t('navigation.login')}</Link>
          </Button>
          <Button asChild>
            <Link to="/register">{t('navigation.register')}</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
