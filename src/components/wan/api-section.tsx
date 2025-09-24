import { LocaleLink } from '@/i18n/navigation';
import { ExternalLink, Play, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';

const stepKeys = ['step-1', 'step-2', 'step-3', 'step-4'] as const;
const resourceKeys = ['resource-1', 'resource-2', 'resource-3'] as const;

export function ApiSection() {
  const t = useTranslations('HomePage.api');

  return (
    <section id="video-demo" className="px-4 py-16">
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

        <div className="grid gap-6 md:grid-cols-2">
          {stepKeys.map((key, index) => (
            <div
              key={key}
              className="rounded-xl border bg-background p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 text-primary">
                <span className="flex size-8 items-center justify-center rounded-full border border-primary/40 text-sm font-semibold">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {t(`steps.${key}.title`)}
                </h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {t(`steps.${key}.description`)}
              </p>
              {t(`steps.${key}.cta`)
                ? (
                    <LocaleLink
                      href={t(`steps.${key}.href`)}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <span>{t(`steps.${key}.cta`)}</span>
                      <ExternalLink className="size-4" aria-hidden />
                    </LocaleLink>
                  )
                : null}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-xl border bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{t('video.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('video.description')}
                </p>
              </div>
              <Play className="size-6 text-primary" aria-hidden />
            </div>
            <div className="mt-4 aspect-video overflow-hidden rounded-xl border">
              <iframe
                src="https://www.youtube.com/embed/hyRFWDEX_EA"
                title="WAN 2.5 preview stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            </div>
          </div>

          <div className="rounded-xl border bg-background p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <UserRound className="size-6 text-primary" aria-hidden />
              <h3 className="text-lg font-semibold">
                {t('resources.title')}
              </h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('resources.description')}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {resourceKeys.map((key) => (
                <li key={key} className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">
                    {t(`resources.${key}.title`)}
                  </span>
                  <p>{t(`resources.${key}.description`)}</p>
                  <LocaleLink
                    href={t(`resources.${key}.href`)}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    {t(`resources.${key}.cta`)}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

