
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";

export const ShareSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const appUrl = window.location.href;

  const handleShare = (platform: string) => {
    console.log(`Sharing on ${platform}`);
    let shareUrl = '';
    
    // Customize the message for each platform
    const messages = {
      twitter: "Scopri TrendAI - Lo strumento definitivo per l'analisi dei trend social e la generazione di contenuti! 🚀 #SocialMedia #AI #DigitalMarketing",
      facebook: "Trasforma la tua strategia social con TrendAI - La tua soluzione AI per l'analisi dei trend e la generazione di contenuti virali! 🎯",
      linkedin: "Sono entusiasta di condividere TrendAI - Una piattaforma innovativa che aiuta le aziende a padroneggiare i trend social e creare contenuti coinvolgenti. Unisciti al futuro del digital marketing! 🌟 #AI #SocialMediaMarketing #Innovation"
    };
    
    const shareText = encodeURIComponent(messages[platform] || messages.twitter);
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(appUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}&quote=${shareText}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}&summary=${shareText}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
      toast({
        title: t('Condivisione avviata'),
        description: t(`Condivisione su ${platform}`),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Condividi TrendAI
        </CardTitle>
        <CardDescription>
          Aiutaci a far conoscere TrendAI al tuo network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleShare('twitter')}
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleShare('facebook')}
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleShare('linkedin')}
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
