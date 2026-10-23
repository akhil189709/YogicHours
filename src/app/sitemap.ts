import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants';
import { blogPosts } from '@/services/db/store';

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = NonNullable<SitemapEntry['changeFrequency']>;

type StaticRoute = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

// Every indexable page the site renders, most important first.
// `priority` is relative within this list only: it tells Google which of our own pages
// to favour when it cannot crawl everything, not how we rank against other sites.
const STATIC_ROUTES: StaticRoute[] = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/schedule', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/booking', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/wellness-tools', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/surya-namaskar', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/meditation', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/wisdom-library', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/health-intake', changeFrequency: 'yearly', priority: 0.6 },

  // The journal is live and renders real articles, but it is currently commented out of
  // both the header and the footer. Remove this entry and the `blogEntries` block below
  // if the blog should stay out of search until it is linked from the navigation.
  { path: '/blog', changeFrequency: 'weekly', priority: 0.6 },
];

const sitemap = (): MetadataRoute.Sitemap => {
  // Static pages carry no per-page timestamp, so the build time is the honest answer to
  // "when did this last change" — a redeploy is what changes them.
  const builtAt = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: builtAt,
      changeFrequency,
      priority,
    }),
  );

  const blogEntries: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.createdAt),
      changeFrequency: 'yearly',
      priority: 0.5,
    }));

  return [...staticEntries, ...blogEntries];
};

export default sitemap;
