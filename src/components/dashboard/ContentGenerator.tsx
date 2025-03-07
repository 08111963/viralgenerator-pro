
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export const ContentGenerator = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<string[]>([]);
  const [userContent, setUserContent] = useState("");

  const generateVariants = async () => {
    if (!userContent.trim()) {
      toast({
        title: t('dashboard.content.variants.error'),
        description: t('dashboard.content.variants.error'),
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newVariants = [
        `${userContent} 🚀 #Innovation #Tech #Future`,
        `${userContent} 💡 #Business #Growth #Success`,
        `${userContent} 📈 #Development #Progress #Goals`,
        `${userContent} 🌟 #Inspiration #Motivation #Achievement`,
        `${userContent} 💪 #Leadership #Excellence #Vision`,
        `${userContent} 🎯 #Strategy #Planning #Results`,
        `${userContent} 🔥 #Passion #Drive #Ambition`,
        `${userContent} 🌍 #Global #Impact #Change`,
      ];
      
      setVariants(newVariants);
      
      toast({
        title: t('dashboard.content.variants.added'),
        description: t('dashboard.content.variants.success'),
      });
    } catch (error) {
      toast({
        title: t('Error'),
        description: t('dashboard.content.variants.error'),
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          {t('dashboard.content.title')}
        </CardTitle>
        <CardDescription>{t('dashboard.content.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">{t('dashboard.content.input.label')}</Label>
                <Input
                  id="content"
                  placeholder={t('dashboard.content.input.placeholder')}
                  value={userContent}
                  onChange={(e) => setUserContent(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={generateVariants}
                  disabled={isGenerating || !userContent.trim()}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {isGenerating ? t('dashboard.content.button.generating') : t('dashboard.content.button.generate')}
                </Button>
              </div>
            </div>
          </div>

          {variants.length > 0 && (
            <div className="space-y-3">
              <h5 className="font-medium text-sm">{t('dashboard.content.variants.title')}</h5>
              {variants.map((variant, index) => (
                <div key={index} className="p-3 border rounded-lg bg-muted/50">
                  <p className="text-sm">{variant}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
