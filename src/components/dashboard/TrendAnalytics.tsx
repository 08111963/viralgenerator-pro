
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Instagram, Twitter, Video } from "lucide-react";

const platformData = {
  twitter: [
    { topic: "AI Technology", sentiment: 0.8, growth: "+25%", volume: "125K" },
    { topic: "Climate Action", sentiment: 0.6, growth: "+15%", volume: "89K" },
  ],
  instagram: [
    { topic: "Sustainable Fashion", sentiment: 0.9, growth: "+40%", volume: "200K" },
    { topic: "Mental Health", sentiment: 0.7, growth: "+30%", volume: "150K" },
  ],
  tiktok: [
    { topic: "Dance Challenge", sentiment: 0.95, growth: "+60%", volume: "500K" },
    { topic: "Educational Content", sentiment: 0.85, growth: "+45%", volume: "300K" },
  ],
};

export const TrendAnalytics = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Analisi dei Trend
        </CardTitle>
        <CardDescription>Monitoraggio in tempo reale dei trend sui social media</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="twitter">
          <TabsList className="mb-4">
            <TabsTrigger value="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              Twitter
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              Instagram
            </TabsTrigger>
            <TabsTrigger value="tiktok" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              TikTok
            </TabsTrigger>
          </TabsList>

          {Object.entries(platformData).map(([platform, data]) => (
            <TabsContent key={platform} value={platform}>
              <div className="space-y-4">
                {data.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.topic}</h4>
                      <p className="text-sm text-muted-foreground">Volume: {item.volume}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-green-500">{item.growth}</span>
                      <div className="text-sm">
                        Sentiment: {(item.sentiment * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
