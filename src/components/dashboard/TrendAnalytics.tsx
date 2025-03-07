import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Instagram, Twitter, Video, ArrowUp, ArrowDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const platformData = {
  twitter: [
    { topic: "AI Technology", sentiment: 0.8, growth: "+25%", volume: "125K", hashtags: ["#AI", "#Tech", "#Innovation", "#MachineLearning", "#FutureOfWork"] },
    { topic: "Climate Action", sentiment: 0.6, growth: "+15%", volume: "89K", hashtags: ["#ClimateChange", "#Sustainability", "#GreenTech", "#Renewable", "#Environment"] },
    { topic: "Digital Marketing", sentiment: 0.75, growth: "+20%", volume: "95K", hashtags: ["#Marketing", "#Digital", "#SocialMedia", "#ContentStrategy", "#Growth"] },
    { topic: "Remote Work", sentiment: 0.82, growth: "+18%", volume: "78K", hashtags: ["#RemoteWork", "#WFH", "#FutureOfWork", "#Productivity", "#WorkLife"] },
    { topic: "Blockchain", sentiment: 0.7, growth: "+30%", volume: "110K", hashtags: ["#Blockchain", "#Crypto", "#Web3", "#DeFi", "#NFT"] }
  ],
  instagram: [
    { topic: "Sustainable Fashion", sentiment: 0.9, growth: "+40%", volume: "200K", hashtags: ["#SustainableFashion", "#EcoFashion", "#SlowFashion", "#Sustainable", "#EthicalFashion"] },
    { topic: "Mental Health", sentiment: 0.7, growth: "+30%", volume: "150K", hashtags: ["#MentalHealth", "#Wellness", "#SelfCare", "#MindfulLiving", "#HealthyMind"] },
    { topic: "Food & Cooking", sentiment: 0.85, growth: "+35%", volume: "180K", hashtags: ["#FoodLover", "#Cooking", "#Foodie", "#HomeCooking", "#Recipe"] },
    { topic: "Fitness & Wellness", sentiment: 0.88, growth: "+28%", volume: "165K", hashtags: ["#Fitness", "#Wellness", "#HealthyLifestyle", "#Workout", "#FitLife"] },
    { topic: "Travel", sentiment: 0.92, growth: "+45%", volume: "220K", hashtags: ["#Travel", "#Wanderlust", "#Explore", "#Adventure", "#TravelPhotography"] }
  ],
  tiktok: [
    { topic: "Dance Challenge", sentiment: 0.95, growth: "+60%", volume: "500K", hashtags: ["#DanceChallenge", "#Viral", "#Dance", "#TikTokDance", "#Trending"] },
    { topic: "Educational Content", sentiment: 0.85, growth: "+45%", volume: "300K", hashtags: ["#LearnOnTikTok", "#Education", "#DidYouKnow", "#Facts", "#Learning"] },
    { topic: "Life Hacks", sentiment: 0.9, growth: "+50%", volume: "400K", hashtags: ["#LifeHack", "#Tricks", "#HowTo", "#DIY", "#Hack"] },
    { topic: "Beauty Tips", sentiment: 0.87, growth: "+42%", volume: "350K", hashtags: ["#Beauty", "#Makeup", "#Skincare", "#BeautyHacks", "#GlamLook"] },
    { topic: "Comedy Skits", sentiment: 0.93, growth: "+55%", volume: "450K", hashtags: ["#Comedy", "#Funny", "#Humor", "#Sketch", "#Entertainment"] }
  ],
};

const engagementData = {
  twitter: [
    { name: "Lun", value: 2400 },
    { name: "Mar", value: 3600 },
    { name: "Mer", value: 4000 },
    { name: "Gio", value: 3800 },
    { name: "Ven", value: 4200 }
  ],
  instagram: [
    { name: "Lun", value: 3200 },
    { name: "Mar", value: 4100 },
    { name: "Mer", value: 4800 },
    { name: "Gio", value: 4600 },
    { name: "Ven", value: 5200 }
  ],
  tiktok: [
    { name: "Lun", value: 5000 },
    { name: "Mar", value: 6200 },
    { name: "Mer", value: 7000 },
    { name: "Gio", value: 6800 },
    { name: "Ven", value: 7500 }
  ]
};

export const TrendAnalytics = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  useEffect(() => {
    // Aggiorna i dati ogni 5 minuti
    const updateInterval = setInterval(() => {
      // In un'implementazione reale, qui chiameremmo un'API per ottenere nuovi dati
      setLastUpdate(new Date());
      
      toast({
        title: "Dati aggiornati",
        description: "Le analisi dei trend sono state aggiornate",
      });
    }, 5 * 60 * 1000); // 5 minuti in millisecondi

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {t('dashboard.analytics.title')}
        </CardTitle>
        <CardDescription>
          {t('dashboard.analytics.subtitle')}
          <div className="text-xs text-muted-foreground mt-1">
            {t('dashboard.analytics.lastUpdate')}: {lastUpdate.toLocaleTimeString()}
          </div>
        </CardDescription>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="h-[200px]">
                  <p className="text-sm font-medium mb-2">{t('dashboard.analytics.metrics.engagement')}</p>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={engagementData[platform]}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[200px]">
                  <p className="text-sm font-medium mb-2">{t('dashboard.analytics.metrics.volume')}</p>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <XAxis dataKey="topic" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="volume" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                {data.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{item.topic}</h4>
                      <span className={`text-sm px-2 py-1 rounded ${
                        item.growth.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.growth}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {item.hashtags.map((hashtag, idx) => (
                        <span key={idx} className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {hashtag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Volume: {item.volume}</span>
                      <span>Sentiment: {(item.sentiment * 100).toFixed(0)}%</span>
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
