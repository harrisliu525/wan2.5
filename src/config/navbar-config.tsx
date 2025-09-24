'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import {
  AudioLines,
  BookMarked,
  FileText,
  ListChecks,
  ShieldCheck,
  TestTube,
  Workflow,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { websiteConfig } from './website';

/**
 * Get navbar config with translations
 *
 * NOTICE: used in client components only
 *
 * docs:
 * https://wan-25.video/docs
 */
export function useNavbarLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.navbar');

  const aiItems: NestedMenuItem[] = [
    {
      title: t('ai.items.text.title'),
      description: t('ai.items.text.description'),
      icon: <BookMarked className="size-4 shrink-0" />,
      href: `${Routes.Root}#specs`,
      external: false,
    },
    {
      title: t('ai.items.image.title'),
      description: t('ai.items.image.description'),
      icon: <ListChecks className="size-4 shrink-0" />,
      href: `${Routes.Root}#prompts`,
      external: false,
    },
    {
      title: t('ai.items.chat.title'),
      description: t('ai.items.chat.description'),
      icon: <TestTube className="size-4 shrink-0" />,
      href: `${Routes.Root}#insights`,
      external: false,
    },
    {
      title: t('ai.items.video.title'),
      description: t('ai.items.video.description'),
      icon: <Workflow className="size-4 shrink-0" />,
      href: `${Routes.Root}#api`,
      external: false,
    },
    {
      title: t('ai.items.audio.title'),
      description: t('ai.items.audio.description'),
      icon: <AudioLines className="size-4 shrink-0" />,
      href: `${Routes.Root}#audio`,
      external: false,
    },
  ];

  return [
    {
      title: t('features.title'),
      href: `${Routes.Root}#features`,
      external: false,
    },
    ...(websiteConfig.blog.enable
      ? [
          {
            title: t('blog.title'),
            href: Routes.Blog,
            external: false,
          },
        ]
      : []),
    ...(websiteConfig.docs.enable
      ? [
          {
            title: t('docs.title'),
            href: Routes.Docs,
            external: false,
          },
        ]
      : []),
    {
      title: t('ai.title'),
      items: aiItems,
    },
    {
      title: t('pages.title'),
      items: [
        {
          title: t('pages.items.privacyPolicy.title'),
          description: t('pages.items.privacyPolicy.description'),
          icon: <ShieldCheck className="size-4 shrink-0" />,
          href: Routes.PrivacyPolicy,
          external: false,
        },
        {
          title: t('pages.items.termsOfService.title'),
          description: t('pages.items.termsOfService.description'),
          icon: <FileText className="size-4 shrink-0" />,
          href: Routes.TermsOfService,
          external: false,
        },
      ],
    },
  ];
}
