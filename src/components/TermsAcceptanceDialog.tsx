import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

interface TermsAcceptanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsAcceptanceDialog = ({ isOpen, onClose }: TermsAcceptanceDialogProps) => {
  const { t } = useTranslation();

  const handleAccept = () => {
    localStorage.setItem('termsAccepted', 'true');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {t('legal.terms.title')}
          </DialogTitle>
        </DialogHeader>

        <Card className="mt-4">
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">{t('legal.terms.agreement.title')}</h2>
              <p className="text-muted-foreground">{t('legal.terms.agreement.description')}</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">{t('legal.terms.usage.title')}</h2>
              <p className="text-muted-foreground">{t('legal.terms.usage.description')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">{t('legal.terms.intellectual.title')}</h2>
              <p className="text-muted-foreground">{t('legal.terms.intellectual.description')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">{t('legal.terms.termination.title')}</h2>
              <p className="text-muted-foreground">{t('legal.terms.termination.description')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">{t('legal.terms.liability.title')}</h2>
              <p className="text-muted-foreground">{t('legal.terms.liability.description')}</p>
            </section>
          </CardContent>
        </Card>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleAccept}>
            {t('common.accept')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
