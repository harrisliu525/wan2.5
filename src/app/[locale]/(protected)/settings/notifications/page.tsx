import { getTranslations } from 'next-intl/server';

export default async function NotificationPage() {
  const t = await getTranslations('SettingsNotificationsPage');

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-8">
        <div className="rounded-lg border border-dashed border-border/60 p-6 text-sm text-muted-foreground">
          {t('disabledMessage')}
        </div>
      </div>
    </div>
  );
}
