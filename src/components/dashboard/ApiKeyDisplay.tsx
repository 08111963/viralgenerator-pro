import { useQuery } from "@tanstack/react-query";
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Key, Copy, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { PremiumFeatureOverlay } from "@/components/dashboard/PremiumFeatureOverlay";

const ApiKeyDisplay = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const isAdmin = useAdminStatus();

  const { data: subscription, isLoading } = useQuery({
    queryKey: ["api-key"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      // If user is admin and no subscription exists, create a dummy one for display
      if (isAdmin) {
        const { data: existingSubscription } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (!existingSubscription) {
          const { data: newSubscription, error } = await supabase
            .from("subscriptions")
            .insert({
              user_id: session.user.id,
              status: 'active',
              api_key: 'admin_' + crypto.randomUUID().replace(/-/g, ''),
              api_key_created_at: new Date().toISOString()
            })
            .select()
            .single();

          if (error) {
            console.error("Error creating admin subscription:", error);
            throw error;
          }
          return newSubscription;
        }
        return existingSubscription;
      }

      const { data, error } = await supabase
        .from("subscriptions")
        .select("api_key, api_key_created_at, status")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching subscription:", error);
        throw error;
      }
      return data;
    },
    enabled: true
  });

  const copyApiKey = async () => {
    if (subscription?.api_key) {
      await navigator.clipboard.writeText(subscription.api_key);
      toast({
        title: t('dashboard.apiKey.copied'),
        description: t('dashboard.apiKey.copiedDesc'),
      });
    }
  };

  const ApiKeyCard = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          {t('dashboard.apiKey.title')}
        </CardTitle>
        <CardDescription>{t('dashboard.apiKey.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-muted p-2 rounded font-mono text-sm">
            {subscription?.api_key}
          </code>
          <Button variant="outline" size="icon" onClick={copyApiKey}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {t('dashboard.apiKey.createdAt')}: {' '}
          {new Date(subscription?.api_key_created_at).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );

  // Show loading state while checking admin status and fetching subscription
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  // Using PremiumFeatureOverlay to protect the API key display
  return (
    <PremiumFeatureOverlay>
      <ApiKeyCard />
    </PremiumFeatureOverlay>
  );
};

export default ApiKeyDisplay;
