
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/auth";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface PremiumFeatureOverlayProps {
  children: React.ReactNode;
}

export const PremiumFeatureOverlay = ({ children }: PremiumFeatureOverlayProps) => {
  const { t } = useTranslation();
  const { session } = useAuth();
  const isAdmin = useAdminStatus();

  const { data: subscription } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      if (!session) return null;
      
      const { data, error } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        console.error("Error fetching subscription:", error);
        return null;
      }

      return data;
    },
    enabled: !!session
  });

  const hasPremiumAccess = isAdmin || subscription?.status === 'active';

  if (!session) {
    return (
      <div className="relative">
        {children}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-10">
          <div className="text-center p-4">
            <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">{t('dashboard.login.required')}</p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">{t('navigation.login')}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (hasPremiumAccess) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-10">
        <div className="text-center p-4">
          <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">{t('dashboard.premium.locked')}</p>
          <Button variant="outline" size="sm" asChild>
            <Link to="/pricing">{t('dashboard.premium.upgrade')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
