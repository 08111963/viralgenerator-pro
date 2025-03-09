
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface LegalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export const LegalDialog = ({ isOpen, onClose, type }: LegalDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {type === 'terms' ? t('legal.terms.title') : t('legal.privacy.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {type === 'terms' ? (
            <>
              <section>
                <h2 className="text-lg font-semibold">{t('legal.terms.agreement.title')}</h2>
                <p>{t('legal.terms.agreement.description')}</p>
              </section>
              
              <section>
                <h2 className="text-lg font-semibold">{t('legal.terms.usage.title')}</h2>
                <p>{t('legal.terms.usage.description')}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">{t('legal.terms.intellectual.title')}</h2>
                <p>{t('legal.terms.intellectual.description')}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">{t('legal.terms.termination.title')}</h2>
                <p>{t('legal.terms.termination.description')}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">{t('legal.terms.liability.title')}</h2>
                <p>{t('legal.terms.liability.description')}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">{t('legal.terms.contact.title')}</h2>
                <p>{t('legal.terms.contact.description')}</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-lg font-semibold">{t('legal.privacy.collection.title')}</h2>
                <p>{t('legal.privacy.collection.description')}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">{t('legal.privacy.use.title')}</h2>
                <p>{t('legal.privacy.use.description')}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">{t('legal.privacy.cookies.title')}</h2>
                <p>{t('legal.privacy.cookies.description')}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">{t('legal.privacy.security.title')}</h2>
                <p>{t('legal.privacy.security.description')}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">{t('legal.privacy.rights.title')}</h2>
                <p>{t('legal.privacy.rights.description')}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">{t('legal.privacy.contact.title')}</h2>
                <p>{t('legal.privacy.contact.description')}</p>
              </section>
            </>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose}>
            {t('common.accept')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
