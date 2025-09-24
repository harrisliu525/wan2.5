import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function CallToActionSection() {
  const t = useTranslations('HomePage.calltoaction');

  const officialLinks = [
    { href: 'https://zaodian.quark.cn', label: t('officialLinks.zaodian') },
    { href: 'https://tongyi.aliyun.com/wan/generate', label: t('officialLinks.tongyi') },
  ];

  return (
    <section id="call-to-action" className="px-4 py-24 bg-muted/50">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-muted-foreground">{t('description')}</p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <LocaleLink href={t('primaryHref')}>
                <span>{t('primaryButton')}</span>
              </LocaleLink>
            </Button>

            <Button asChild size="lg" variant="outline">
              <LocaleLink href={t('secondaryHref')}>
                <span>{t('secondaryButton')}</span>
              </LocaleLink>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground/80">
            {officialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="mt-4 text-[11px] text-muted-foreground/80">{t('disclaimer')}</p>
        </div>
      </div>
    </section>
  );
}
