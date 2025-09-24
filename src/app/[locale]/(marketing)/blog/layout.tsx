import { websiteConfig } from '@/config/website';
import { notFound } from 'next/navigation';
import type { PropsWithChildren } from 'react';

export default function BlogSegmentLayout({ children }: PropsWithChildren) {
  if (!websiteConfig.blog.enable) {
    notFound();
  }

  return <>{children}</>;
}
