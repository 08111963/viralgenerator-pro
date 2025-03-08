
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
    mutationFn: async ({ platform, accountName }: { platform: string, accountName: string }) => {
      const { error } = await supabase
        .from('social_accounts')
        .insert([{ platform, account_name: accountName }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-accounts'] });
      toast({
        title: t('Success'),
        description: t('Social account added successfully'),
      });
    },
    onError: () => {
      toast({
        title: t('Error'),
        description: t('Failed to add social account'),
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
