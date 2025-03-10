
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Webhook } from "lucide-react";

export const ZapierIntegration = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTestWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Errore",
        description: "Inserisci l'URL del webhook Zapier",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Test webhook Zapier:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          source: "TrendHub",
          event: "test_webhook",
          data: {
            message: "Test di connessione webhook"
          }
        }),
      });

      toast({
        title: "Richiesta Inviata",
        description: "La richiesta è stata inviata a Zapier. Controlla la cronologia del tuo Zap per confermare l'attivazione.",
      });
    } catch (error) {
      console.error("Errore nell'invio del webhook:", error);
      toast({
        title: "Errore",
        description: "Impossibile attivare il webhook Zapier. Verifica l'URL e riprova.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Webhook className="h-5 w-5" />
          Integrazione Zapier
        </CardTitle>
        <CardDescription>
          Connetti la tua app con altri strumenti tramite Zapier
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTestWebhook} className="space-y-4">
          <div>
            <Input
              type="url"
              placeholder="Inserisci l'URL del tuo webhook Zapier"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="mb-2"
            />
            <p className="text-sm text-muted-foreground">
              Crea un Zap su Zapier utilizzando il trigger "Webhook" e incolla qui l'URL del webhook
            </p>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Testing..." : "Testa Webhook"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
