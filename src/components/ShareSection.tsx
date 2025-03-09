
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
      twitter: "Discover TrendAI - The ultimate tool for social media trend analysis and content generation! 🚀 #SocialMedia #AI #DigitalMarketing",
      facebook: "Transform your social media strategy with TrendAI - Your AI-powered solution for trend analysis and viral content generation! 🎯",
      linkedin: "Excited to share TrendAI - An innovative AI platform that helps businesses master social media trends and create engaging content. Join the future of digital marketing! 🌟 #AI #SocialMediaMarketing #Innovation"
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
        title: t('Share started'),
        description: t(`Sharing on ${platform}`),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share TrendAI
        </CardTitle>
        <CardDescription>
          Help us spread the word about TrendAI with your network
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
