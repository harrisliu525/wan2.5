import CallToActionSection from '@/components/blocks/calltoaction/calltoaction';
import FaqSection from '@/components/blocks/faqs/faqs';
import FeaturesSection from '@/components/blocks/features/features';
import Features2Section from '@/components/blocks/features/features2';
import Features3Section from '@/components/blocks/features/features3';
import HeroSection from '@/components/blocks/hero/hero';
import IntegrationSection from '@/components/blocks/integration/integration';
import Integration2Section from '@/components/blocks/integration/integration2';
import { ApiSection } from '@/components/wan/api-section';
import { InsightsSection } from '@/components/wan/insights-section';
import { SpecSection } from '@/components/wan/spec-section';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

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

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <SpecSection />

      <IntegrationSection />

      <FeaturesSection />

      <ApiSection />

      <Features2Section />

      <InsightsSection />

      <Features3Section />

      <Integration2Section />


      <FaqSection />

      <CallToActionSection />
    </div>
  );
}
