
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
  const { accounts, isLoading, addAccount, removeAccount } = useSocialAccounts();
  const [platform, setPlatform] = useState<string>('');
  const [accountName, setAccountName] = useState('');
  const { toast } = useToast();

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
        <CardHeader>
          <CardTitle>{t('dashboard.social.title')}</CardTitle>
          <CardDescription>
            {t('dashboard.social.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="flex gap-4">
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('dashboard.social.selectPlatform')} />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder={t('dashboard.social.accountName')}
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={addAccount.isPending}>
                {t('dashboard.social.add')}
              </Button>
            </div>
          </form>

          {isLoading ? (
            <div className="text-center py-4">{t('loading')}</div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              {t('dashboard.social.noAccounts')}
            </div>
          ) : (
            <div className="space-y-2">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-2 rounded-lg border">
                  <div>
                    <span className="font-medium">{account.platform}</span>
                    <span className="text-muted-foreground ml-2">{account.account_name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAccount.mutate(account.id)}
                    disabled={removeAccount.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </PremiumFeatureOverlay>
  </Card>
