
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ContentGenerator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<string[]>([]);

  const generateVariants = async () => {
    setIsGenerating(true);
    try {
      // Simula il tempo di generazione
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Per ora generiamo delle varianti statiche 
      const newVariants = [
        "Come l'AI sta trasformando il futuro del lavoro 🚀 #AIRevolution #FutureOfWork",
        "5 modi in cui l'AI sta cambiando il mondo del lavoro 💡 #ArtificialIntelligence #Innovation",
        "L'impatto dell'AI sul mondo professionale: trend e opportunità 📈 #AITechnology #WorkTrends"
      ];
      
      setVariants(newVariants);
      
      toast({
        title: "Varianti Generate",
        description: "Nuove varianti di contenuto sono state create",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile generare le varianti",
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
          Generatore Contenuti
        </CardTitle>
        <CardDescription>Suggerimenti per contenuti virali</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Idea Post #1</h4>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Trending</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              "Come l'AI sta rivoluzionando il modo in cui lavoriamo 🚀 #AITechnology #Innovation"
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={generateVariants}
                disabled={isGenerating}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {isGenerating ? "Generazione..." : "Genera Varianti"}
              </Button>
            </div>
          </div>

          {variants.length > 0 && (
            <div className="space-y-3">
              <h5 className="font-medium text-sm">Varianti Generate:</h5>
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
