import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { PlatformSelector } from './content-optimizer/PlatformSelector';
import { TemplateForm } from './content-optimizer/TemplateForm';
import { OptimizedContent } from './content-optimizer/OptimizedContent';
import { useTrendingItems } from "@/hooks/useTrendingItems";
import { useQueryClient } from "@tanstack/react-query";

export const ContentOptimizer = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [optimizedContent, setOptimizedContent] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [scheduledTime, setScheduledTime] = useState<Date | undefined>(undefined);
  const [templateName, setTemplateName] = useState('');
  const { data: trends = [] } = useTrendingItems('hashtags');

  const handleOptimize = async () => {
    if (!content.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci del contenuto da ottimizzare",
        variant: "destructive",
      });
      return;
    }

    setIsOptimizing(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error("Devi essere autenticato");

      const { data, error } = await supabase.functions.invoke('generate-optimized-content', {
        body: { content, trends, platform },
      });

      if (error) throw error;
      setOptimizedContent(data.optimizedContent);
      
      toast({
        title: "Contenuto ottimizzato",
        description: "Il contenuto è stato ottimizzato con successo",
      });
    } catch (error) {
      console.error('Errore:', error);
      toast({
        title: "Errore",
        description: "Errore durante l'ottimizzazione del contenuto",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const saveTemplate = async () => {
    if (!templateName || !content) {
      toast({
        title: "Errore",
        description: "Inserisci nome del template e contenuto",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error("Devi essere autenticato");

      const { error } = await supabase
        .from('content_templates')
        .insert({
          name: templateName,
          template: content,
          user_id: session.session.user.id
        });

      if (error) throw error;

      toast({
        title: "Template salvato",
        description: "Il template è stato salvato con successo",
      });
      setTemplateName('');
    } catch (error) {
      console.error('Errore:', error);
      toast({
        title: "Errore",
        description: "Errore durante il salvataggio del template",
        variant: "destructive",
      });
    }
  };

  const handleSchedule = async () => {
    if (!optimizedContent || !scheduledTime) {
      toast({
        title: "Errore",
        description: "Seleziona contenuto e orario di pubblicazione",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error("Devi essere autenticato");

      const { error } = await supabase
        .from('scheduled_posts')
        .insert({
          content: optimizedContent,
          platform,
          scheduled_time: scheduledTime.toISOString(),
          trend_data: JSON.stringify(trends),
          user_id: session.session.user.id
        });

      if (error) throw error;

      toast({
        title: "Post programmato",
        description: "Il post è stato programmato con successo",
      });
    } catch (error) {
      console.error('Errore:', error);
      toast({
        title: "Errore",
        description: "Errore durante la programmazione del post",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Ottimizzazione Contenuti
        </CardTitle>
        <CardDescription>
          Ottimizza i tuoi contenuti utilizzando i trend attuali
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <PlatformSelector 
            platform={platform}
            onPlatformChange={setPlatform}
          />

          <TemplateForm
            templateName={templateName}
            content={content}
            onTemplateNameChange={setTemplateName}
            onContentChange={setContent}
            onSaveTemplate={saveTemplate}
          />

          <Button 
            onClick={handleOptimize} 
            disabled={isOptimizing || !content.trim()}
          >
            {isOptimizing ? "Ottimizzazione..." : "Ottimizza contenuto"}
          </Button>

          <OptimizedContent
            optimizedContent={optimizedContent}
            onOptimizedContentChange={setOptimizedContent}
            scheduledTime={scheduledTime}
            onScheduledTimeChange={setScheduledTime}
            onSchedule={handleSchedule}
          />
        </div>
      </CardContent>
    </Card>
  );
};
