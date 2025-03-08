
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/auth";
import { useAdminStatus } from "@/hooks/useAdminStatus";

interface PremiumFeatureOverlayProps {
  children: React.ReactNode;
}

export const PremiumFeatureOverlay = ({ children }: PremiumFeatureOverlayProps) => {
  const { t } = useTranslation();
  const { session } = useAuth();
  const isAdmin = useAdminStatus();

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

  if (isAdmin) {
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
