
import React from 'react';
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

export const TermsAcceptance = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleAcceptTerms = async () => {
    console.log('Button clicked, session:', session); // Debug log

    if (!session?.user.id) {
      console.log('No session or user ID found'); // Debug log
      toast({
        variant: "destructive",
        title: i18n.language === 'it' ? 'Errore' : 'Error',
        description: i18n.language === 'it'
          ? 'Devi essere autenticato per accettare i termini'
          : 'You must be logged in to accept terms',
      });
      return;
    }

    try {
      console.log('Attempting to insert terms acceptance for user:', session.user.id); // Debug log
      
      const { data, error } = await supabase.from('terms_acceptance').insert([{
        user_id: session.user.id,
        version: '1.0'
      }]);

      console.log('Supabase response:', { data, error }); // Debug log

      if (error) {
        console.error('Supabase error details:', error); // Detailed error log
        throw error;
      }

      toast({
        title: i18n.language === 'it' ? 'Termini accettati' : 'Terms accepted',
        description: i18n.language === 'it' 
          ? 'Grazie per aver accettato i nostri termini e la privacy policy'
          : 'Thank you for accepting our terms and privacy policy',
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error accepting terms:', error);
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
