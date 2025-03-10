import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export interface SocialAccount {
  id: string;
  platform: string;
  account_name: string;
  created_at: string;
}

export const useSocialAccounts = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // Get current subscription status
  const { data: subscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching subscription:', error);
        return null;
      }

      return data;
    }
  });

  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ['social-accounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('social_accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: t('Error'),
          description: t('Failed to fetch social accounts'),
          variant: "destructive",
        });
        return [];
      }

      return data;
    }
  });

  const addAccount = useMutation({
    mutationFn: async ({ platform, accountName, accessToken }: { platform: string, accountName: string, accessToken?: string }) => {
      // Check account limit based on subscription status
      if (accounts.length >= (subscription?.status === 'active' ? 5 : 1)) {
        throw new Error(t('dashboard.social.limitReached'));
      }

      const { error } = await supabase
        .from('social_accounts')
        .insert([{ 
          platform, 
          account_name: accountName,
          access_token: accessToken 
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-accounts'] });
      toast({
        title: t('Success'),
        description: t('Social account added successfully'),
      });
    },
    onError: (error: Error) => {
      toast({
        title: t('Error'),
        description: error.message || t('Failed to add social account'),
        variant: "destructive",
      });
    }
  });

  const removeAccount = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('social_accounts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-accounts'] });
      toast({
        title: t('Success'),
        description: t('Social account removed successfully'),
      });
    },
    onError: () => {
      toast({
        title: t('Error'),
        description: t('Failed to remove social account'),
        variant: "destructive",
      });
    }
  });

  return {
    accounts,
    isLoading,
    addAccount,
    removeAccount
  };
};
