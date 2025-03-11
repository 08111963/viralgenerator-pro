
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash, Key, FileText, TrendingUp, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTrendingSearch, TrendingItemType } from "@/hooks/useTrendingSearch";

export const TrendingSearch = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TrendingItemType>('hashtags');
  
  const { results, isLoading, error } = useTrendingSearch(activeTab, searchQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {t('dashboard.trends.search')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder={t('dashboard.trends.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TrendingItemType)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hashtags" className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                {t('dashboard.trends.hashtags')}
              </TabsTrigger>
              <TabsTrigger value="keywords" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                {t('dashboard.trends.keywords')}
              </TabsTrigger>
              <TabsTrigger value="topics" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {t('dashboard.trends.topics')}
              </TabsTrigger>
            </TabsList>

            {['hashtags', 'keywords', 'topics'].map((type) => (
              <TabsContent key={type} value={type} className="mt-4">
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : error ? (
                  <div className="text-center text-red-500 py-4">{error}</div>
                ) : results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {item.volume.toLocaleString()} {t('dashboard.trends.mentions')}
                          </span>
                        </div>
                        <span
                          className={`text-sm ${
                            item.change_percentage >= 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {item.change_percentage >= 0 ? '+' : ''}
                          {item.change_percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    {searchQuery
                      ? t('dashboard.trends.noResults')
                      : t('dashboard.trends.startTyping')}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
