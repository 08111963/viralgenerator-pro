
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'it' ? 'en' : 'it';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="w-24 gap-1"
    >
      <span className={i18n.language === 'it' ? 'font-bold' : 'text-muted-foreground'}>IT</span>
      <span className="text-muted-foreground">/</span>
      <span className={i18n.language === 'en' ? 'font-bold' : 'text-muted-foreground'}>EN</span>
    </Button>
  );
};
