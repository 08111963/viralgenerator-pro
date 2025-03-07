import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Hash, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface TrendItem {
  id: string;
  name: string;
  volume: number;
  change: number;
}

export const AddTrendForm = ({ onAdd, type }: { onAdd: (item: TrendItem) => void; type: "hashtag" | "keyword" }) => {
  const [name, setName] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: TrendItem = {
      id: Date.now().toString(),
      name: type === "hashtag" ? (name.startsWith("#") ? name : `#${name}`) : name,
      volume: 0,
      change: 0
    };

    onAdd(newItem);
    setName("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {type === "hashtag" ? <Hash className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          {t(`dashboard.addTrend.${type}`)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {type === "hashtag" ? t('dashboard.addTrend.newHashtag') : t('dashboard.addTrend.newKeyword')}
            </Label>
            <div className="flex gap-2">
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={type === "hashtag" ? t('dashboard.addTrend.hashtagPlaceholder') : t('dashboard.addTrend.keywordPlaceholder')}
              />
              <Button type="submit" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
