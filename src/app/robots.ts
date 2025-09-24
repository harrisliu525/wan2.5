import type { MetadataRoute } from 'next';
import { getBaseUrl } from '../lib/urls/urls';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/*',
        '/_next/*',
        '/settings/*',
        '/dashboard/*',
        '/blog',
        '/blog/*',
        '/docs',
        '/docs/*',
        '/about',
        '/about/*',
        '/changelog',
        '/changelog/*',
        '/cookie',
        '/cookie/*',
        '/contact',
        '/contact/*',
        '/waitlist',
        '/waitlist/*',
        '/magicui',
        '/magicui/*',
        '/test',
        '/test/*',
        '/auth/register',
        '/auth/register/*',
        '/ai/chat',
        '/ai/chat/*',
        '/ai/text',
        '/ai/text/*',
        '/ai/audio',
        '/ai/audio/*',
        '/ai/video',
        '/ai/video/*',
      ],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
