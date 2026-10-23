import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants';

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: '/',
      // JSON endpoints have no standalone value in search results, and the intake
      // endpoint accepts submissions — keep crawlers out of both.
      disallow: ['/api/'],
    },
  ],
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
});

export default robots;
