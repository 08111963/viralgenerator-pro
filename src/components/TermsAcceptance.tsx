
import React from 'react';
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export const TermsAcceptance = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { session } = useAuth();

  const handleAcceptTerms = async () => {
    if (!session?.user.id) return;

    try {
      const { error } = await supabase.from('terms_acceptance').insert({
        user_id: session.user.id,
        accepted_at: new Date().toISOString(),
        version: '1.0'
      });

      if (error) throw error;

      toast({
        title: i18n.language === 'it' ? 'Termini accettati' : 'Terms accepted',
        description: i18n.language === 'it' 
          ? 'Grazie per aver accettato i nostri termini e la privacy policy'
          : 'Thank you for accepting our terms and privacy policy',
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: i18n.language === 'it' ? 'Errore' : 'Error',
        description: i18n.language === 'it'
          ? "Non è stato possibile salvare l'accettazione dei termini"
          : "Could not save terms acceptance",
      });
    }
  };

  return (
    <div className="mt-8 flex justify-center">
      <Button 
        onClick={handleAcceptTerms}
        disabled={!session}
        className="w-full max-w-sm"
      >
        {i18n.language === 'it' ? 'Accetta Termini e Privacy' : 'Accept Terms & Privacy'}
      </Button>
    </div>
  );
};
