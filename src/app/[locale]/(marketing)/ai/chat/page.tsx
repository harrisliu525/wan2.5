import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  notFound();
}

export default function AIChatPage() {
  notFound();
}
