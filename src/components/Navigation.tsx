
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "@/lib/auth";

export const Navigation = () => {
  const { t } = useTranslation();
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TrendAI</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {session ? (
            <>
              <Link to="/dashboard" className="text-foreground/60 hover:text-foreground transition-colors">
                {t('navigation.dashboard')}
              </Link>
              <Link to="/reports" className="text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {t('navigation.reports')}
              </Link>
            </>
          ) : (
            <>
              <Link to="/features" className="text-foreground/60 hover:text-foreground transition-colors">
                {t('navigation.features')}
              </Link>
              <Link to="/pricing" className="text-foreground/60 hover:text-foreground transition-colors">
                {t('navigation.pricing')}
              </Link>
            </>
          )}
          <Link to="/guide" className="text-foreground/60 hover:text-foreground transition-colors">
            {t('navigation.guide')}
          </Link>
          <LanguageSwitcher />
          {!session && (
            <>
              <Button variant="outline" onClick={handleLoginClick}>
                {t('navigation.login')}
              </Button>
              <Button onClick={handleRegisterClick}>
                {t('navigation.register')}
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
