
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
    const shareText = encodeURIComponent("Check out ViralGenerator Pro - an amazing tool for social trend analysis! 📈");
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(appUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
      toast({
        title: t('Condivisione avviata'),
        description: t(`Condivisione su ${platform} in corso`),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          {t('Condividi ViralGenerator Pro')}
        </CardTitle>
        <CardDescription>
          {t('Aiutaci a far conoscere ViralGenerator Pro condividendolo con la tua rete')}
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

