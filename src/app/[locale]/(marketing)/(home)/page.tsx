import { ImagePlayground } from '@/ai/image/components/ImagePlayground';
import { getRandomSuggestions } from '@/ai/image/lib/suggestions';
import CallToActionSection from '@/components/blocks/calltoaction/calltoaction';
import FaqSection from '@/components/blocks/faqs/faqs';
import FeaturesSection from '@/components/blocks/features/features';
import Features2Section from '@/components/blocks/features/features2';
import Features3Section from '@/components/blocks/features/features3';
import HeroSection from '@/components/blocks/hero/hero';
import IntegrationSection from '@/components/blocks/integration/integration';
import Integration2Section from '@/components/blocks/integration/integration2';
import PricingSection from '@/components/blocks/pricing/pricing';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

/**
 * https://next-intl.dev/docs/environments/actions-metadata-route-handlers#metadata-api
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    canonicalUrl: getUrlWithLocale('', locale),
  });
}

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <>
      <div className="flex flex-col">
        <HeroSection />

        <section className="mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center space-y-2">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                {t('generator.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('generator.description')}
              </p>
            </div>
            <ImagePlayground suggestions={getRandomSuggestions(5)} />
          </div>
        </section>

        <IntegrationSection />

        <FeaturesSection />

        <Features2Section />

        <Features3Section />

        <Integration2Section />

        <PricingSection />

        <FaqSection />

        <CallToActionSection />
      </div>
    </>
  );
}
