import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const planKeys = ['plan-1', 'plan-2', 'plan-3'] as const;

function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:');
}

export function WanPricingTable() {
  const t = useTranslations('HomePage.pricing');

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {planKeys.map((key) => {
        const features = t.raw(`plans.${key}.features`) as string[];
        const href = t(`plans.${key}.href`);
        const featured = Boolean(t.raw(`plans.${key}.featured`));
        const label = t(`plans.${key}.cta`);
        const external = isExternalHref(href);

        return (
          <div
            key={key}
            className="flex h-full flex-col gap-4 rounded-xl border bg-background p-6 shadow-sm"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {t(`plans.${key}.label`)}
            </span>
            <h3 className="text-xl font-semibold">{t(`plans.${key}.title`)}</h3>
            <p className="text-sm text-muted-foreground">
              {t(`plans.${key}.description`)}
            </p>
            <p className="text-lg font-semibold text-foreground">
              {t(`plans.${key}.price`)}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span
                    className="mt-1 size-1.5 rounded-full bg-primary"
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4">
              <Button asChild size="sm" variant={featured ? 'default' : 'outline'}>
                {external ? (
                  <a href={href} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                ) : (
                  <LocaleLink href={href}>{label}</LocaleLink>
                )}
              </Button>
            </div>
          </div>
        );
      })}

      <div className="rounded-xl border bg-background p-6 shadow-sm lg:col-span-3">
        <h3 className="text-lg font-semibold">{t('notes.title')}</h3>
        <p className="text-sm text-muted-foreground">{t('notes.description')}</p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {(t.raw('notes.items') as string[]).map((item) => (
            <li key={item} className="flex gap-2">
              <span
                className="mt-1 size-1.5 rounded-full bg-primary"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
