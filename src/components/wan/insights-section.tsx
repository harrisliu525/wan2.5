import { useTranslations } from 'next-intl';

const cardKeys = ['card-1', 'card-2', 'card-3'] as const;

export function InsightsSection() {
  const t = useTranslations('HomePage.insights');

  return (
    <section id="insights" className="px-4 py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t('eyebrow')}
          </p>
          <h2 className="text-balance text-3xl font-semibold md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cardKeys.map((key) => {
            const bullets = t.raw(`items.${key}.bullets`) as string[];

            return (
              <div key={key} className="rounded-xl border bg-background p-6 shadow-sm">
                <h3 className="text-lg font-semibold">
                  {t(`items.${key}.title`)}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span
                        className="mt-1 size-1.5 rounded-full bg-primary"
                        aria-hidden
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
