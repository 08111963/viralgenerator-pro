
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContentGenerator = () => {
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
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Genera Varianti
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
