
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useTrendingItems } from "@/hooks/useTrendingItems";
import { supabase } from "@/integrations/supabase/client";
import { DateTimePicker } from "@/components/ui/date-time-picker";

export const ContentOptimizer = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [optimizedContent, setOptimizedContent] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [scheduledTime, setScheduledTime] = useState<Date | undefined>(undefined);
  const { data: trends = [] } = useTrendingItems('hashtag');

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
      const { data, error } = await supabase.functions.invoke('generate-optimized-content', {
        body: {
          content,
          trends,
          platform,
        },
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
      const { error } = await supabase
        .from('scheduled_posts')
        .insert([
          {
            content: optimizedContent,
            platform,
            scheduled_time: scheduledTime.toISOString(),
            trend_data: trends
          }
        ]);

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
          <div>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona piattaforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Contenuto originale</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Inserisci il tuo contenuto qui..."
              rows={4}
            />
          </div>

          <Button 
            onClick={handleOptimize} 
            disabled={isOptimizing || !content.trim()}
          >
            {isOptimizing ? "Ottimizzazione..." : "Ottimizza contenuto"}
          </Button>

          {optimizedContent && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contenuto ottimizzato</label>
                <Textarea
                  value={optimizedContent}
                  onChange={(e) => setOptimizedContent(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Programma pubblicazione</label>
                <div className="flex gap-4">
                  <DateTimePicker
                    date={scheduledTime}
                    setDate={setScheduledTime}
                  />
                  <Button 
                    onClick={handleSchedule}
                    disabled={!scheduledTime}
                    variant="outline"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Programma
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
