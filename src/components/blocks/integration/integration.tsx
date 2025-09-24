import { HeaderSection } from '@/components/layout/header-section';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { Film, Languages, Sparkles, AudioWaveform } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type * as React from 'react';

const cards = [
  {
    icon: Film,
    translationKey: 'item-1',
    link: '/#use-cases',
  },
  {
    icon: AudioWaveform,
    translationKey: 'item-2',
    link: '/#video-demo',
  },
  {
    icon: Sparkles,
    translationKey: 'item-3',
    link: '/#specs',
  },
  {
    icon: Languages,
    translationKey: 'item-4',
    link: '/#faqs',
  },
] as const;

export default function IntegrationSection() {
  const t = useTranslations('HomePage.integration');

  return (
    <section id="highlights" className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <HeaderSection
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          subtitleAs="h2"
          descriptionAs="p"
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, translationKey, link }) => (
            <IntegrationCard
              key={translationKey}
              title={t(`items.${translationKey}.title`)}
              description={t(`items.${translationKey}.description`)}
              link={link}
            >
              <Icon className="size-8" />
            </IntegrationCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const IntegrationCard = ({
  title,
  description,
  children,
  link = '#',
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  link?: string;
}) => {
  const t = useTranslations('HomePage.integration');

  return (
    <div className="p-6 bg-transparent hover:bg-accent dark:hover:bg-card rounded-xl border">
      <div className="relative flex flex-col gap-4">
        <div className="text-primary">{children}</div>

        <div className="space-y-2">
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-muted-foreground line-clamp-4 text-sm">
            {description}
          </p>
        </div>

        <div className="flex gap-3 border-t border-dashed pt-6">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-1 pr-2 shadow-none"
          >
            <LocaleLink href={link}>{t('learnMore')}</LocaleLink>
          </Button>
        </div>
      </div>
    </div>
  );
};

