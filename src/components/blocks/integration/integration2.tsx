import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import {
  BadgeCheck,
  Layers3,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const cards = [
  {
    icon: Sparkles,
    translationKey: 'item-1',
  },
  {
    icon: Layers3,
    translationKey: 'item-2',
  },
  {
    icon: Workflow,
    translationKey: 'item-3',
  },
  {
    icon: BadgeCheck,
    translationKey: 'item-4',
  },
] as const;

export default function Integration2Section() {
  const t = useTranslations('HomePage.integration2');

  return (
    <section id="coming-soon">
      <div className="bg-muted/50 py-24">
        <div className="mx-auto max-w-5xl px-6 space-y-12">
          <div className="grid gap-6 sm:grid-cols-2">
            {cards.map(({ icon: Icon, translationKey }) => (
              <div
                key={translationKey}
                className="rounded-xl border bg-background p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4">
                  <Icon className="size-8 text-primary" />
                  <h3 className="text-lg font-semibold">
                    {t(`items.${translationKey}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`items.${translationKey}.description`)}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t(`items.${translationKey}.tag`) }
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-lg space-y-6 text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              {t('title')}
            </h2>
            <p className="text-muted-foreground">{t('description')}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <LocaleLink href={t('primaryLinkHref')}>
                  <span>{t('primaryButton')}</span>
                </LocaleLink>
              </Button>

              <Button asChild size="lg" variant="outline">
                <LocaleLink href={t('secondaryLinkHref')}>
                  <span>{t('secondaryButton')}</span>
                </LocaleLink>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {t('footnote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

