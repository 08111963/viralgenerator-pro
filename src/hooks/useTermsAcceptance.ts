
import { useEffect, useState } from 'react';
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export const useTermsAcceptance = () => {
  const { session } = useAuth();
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTermsAcceptance = async () => {
      if (!session?.user.id) {
        setHasAcceptedTerms(false);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('terms_acceptance')
          .select('accepted_at')
          .eq('user_id', session.user.id)
          .single();

        if (error) throw error;
        setHasAcceptedTerms(!!data);
      } catch (error) {
        console.error('Error checking terms acceptance:', error);
        setHasAcceptedTerms(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkTermsAcceptance();
  }, [session?.user.id]);

  return { hasAcceptedTerms, isLoading };
};
