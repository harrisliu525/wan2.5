import { useTranslations } from 'next-intl';

const stepKeys = ['step-1', 'step-2', 'step-3'] as const;
const toolkitKeys = ['prompt-lab', 'audio-tips', 'share'] as const;
const demoKeys = ['demo-1', 'demo-2', 'demo-3', 'demo-4'] as const;

export function SpecSection() {
  const t = useTranslations('HomePage.specs');

  return (
    <section id="specs" className="px-4 py-16">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t('eyebrow')}
          </p>
          <h2 className="text-balance text-3xl font-semibold md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stepKeys.map((key, index) => (
            <div
              key={key}
              className="relative flex h-full flex-col gap-4 rounded-xl border bg-background p-6 shadow-sm"
            >
              <span className="absolute -top-4 left-6 flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/40">
                {index + 1}
              </span>
              <h3 className="pt-6 text-lg font-semibold">{t(`steps.${key}.title`)}</h3>
              <p className="text-sm text-muted-foreground">
                {t(`steps.${key}.description`)}
              </p>
              <div className="rounded-lg bg-muted/60 p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  {t(`steps.${key}.label`)}
                </p>
                <p className="mt-2">{t(`steps.${key}.example`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {toolkitKeys.map((key) => {
            const bullets = t.raw(`toolkit.${key}.bullets`) as string[];

            return (
              <div
                key={key}
                className="rounded-xl border bg-background p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">
                  {t(`toolkit.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {t(`toolkit.${key}.description`)}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {bullets.map((bullet, index) => (
                    <li key={`${key}-${index}`} className="flex gap-2">
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

        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <h3 className="text-lg font-semibold">{t('demos.title')}</h3>
          <p className="text-sm text-muted-foreground">{t('demos.description')}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {demoKeys.map((key) => (
              <div
                key={key}
                className="flex flex-col gap-2 rounded-lg border bg-card/60 p-4"
              >
                <p className="text-sm font-medium text-foreground">
                  {t(`demos.${key}.title`)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t(`demos.${key}.prompt`)}
                </p>
                <p className="text-xs font-medium text-primary">
                  {t(`demos.${key}.note`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
