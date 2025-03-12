
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { useSocialAccounts } from "@/hooks/useSocialAccounts";
import { PremiumFeatureOverlay } from "@/components/dashboard/PremiumFeatureOverlay";

const PLATFORMS = ['Twitter', 'Instagram', 'LinkedIn', 'Facebook', 'TikTok'];

export const SocialAccountsManager = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { accounts, isLoading, addAccount, removeAccount } = useSocialAccounts();
  const [platform, setPlatform] = useState<string>('');
  const [accountName, setAccountName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!platform || !accountName) {
      toast({
        title: t('Error'),
        description: t('Please fill in all fields'),
        variant: "destructive",
      });
      return;
    }

    addAccount.mutate({ platform, accountName }, {
      onSuccess: () => {
        setPlatform('');
        setAccountName('');
      }
    });
  };

  return (
    <PremiumFeatureOverlay>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">{t('dashboard.social.title')}</CardTitle>
          <CardDescription className="text-xs">{t('dashboard.social.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="w-[120px] h-8 text-sm">
                <SelectValue placeholder={t('dashboard.social.selectPlatform')} />
              </SelectTrigger>
              <SelectContent>
                {PLATFORMS.map(p => (
                  <SelectItem key={p} value={p} className="text-sm">{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder={t('dashboard.social.accountName')}
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="flex-1 h-8 text-sm"
            />
            <Button type="submit" size="sm" disabled={addAccount.isPending}>
              {t('dashboard.social.add')}
            </Button>
          </form>

          {isLoading ? (
            <div className="text-center py-2 text-sm">{t('loading')}</div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-2 text-sm text-muted-foreground">
              {t('dashboard.social.noAccounts')}
            </div>
          ) : (
            <div className="space-y-1">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-1.5 text-sm rounded-md hover:bg-muted">
                  <div>
                    <span className="font-medium">{account.platform}</span>
                    <span className="text-muted-foreground ml-2">{account.account_name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeAccount.mutate(account.id)}
                    disabled={removeAccount.isPending}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </PremiumFeatureOverlay>
  );
};
