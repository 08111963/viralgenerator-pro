
import { useTranslation } from "react-i18next";

export const DetailedGuide = () => {
  const { t } = useTranslation();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">{t('guide.detailedGuide.title')}</h2>
      <div className="prose prose-slate max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('guide.detailedGuide.mainNavigation.title')}</h2>
          <ul className="list-disc pl-6 space-y-2">
            {(t('guide.detailedGuide.mainNavigation.items', { returnObjects: true }) as string[]).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('guide.detailedGuide.dashboard.title')}</h2>
          <p className="mb-4">{t('guide.detailedGuide.dashboard.description')}</p>
          
          <h3 className="text-xl font-semibold mb-3">{t('guide.detailedGuide.dashboard.trendMonitoring.title')}</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            {(t('guide.detailedGuide.dashboard.trendMonitoring.items', { returnObjects: true }) as string[]).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-3">{t('guide.detailedGuide.dashboard.premiumFeatures.title')}</h3>
          <ul className="list-disc pl-6 space-y-2">
            {(t('guide.detailedGuide.dashboard.premiumFeatures.items', { returnObjects: true }) as string[]).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('guide.detailedGuide.pricing.title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{t('guide.detailedGuide.pricing.basic.title')}</h3>
              <ul className="list-disc pl-6 space-y-2">
                {(t('guide.detailedGuide.pricing.basic.items', { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{t('guide.detailedGuide.pricing.pro.title')}</h3>
              <ul className="list-disc pl-6 space-y-2">
                {(t('guide.detailedGuide.pricing.pro.items', { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('guide.detailedGuide.additionalFeatures.title')}</h2>
          <ul className="list-disc pl-6 space-y-2">
            {(t('guide.detailedGuide.additionalFeatures.items', { returnObjects: true }) as string[]).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};
