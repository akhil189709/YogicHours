import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SmoothScroll } from '@/components/Common';
import { SITE_URL } from '@/constants';

export const metadata: Metadata = {
  // Resolves every relative URL in metadata (canonical, OG images) against the live
  // origin, which is what crawlers need in order to de-duplicate pages.
  metadataBase: new URL(SITE_URL),
  title: 'Yogic Hours - Heal In Every Hour',
  description:
    'Premium wellness and yoga platform offering personalized classes, therapy yoga, and meditation',
  keywords: ['yoga', 'wellness', 'meditation', 'fitness', 'healing'],
  authors: [{ name: 'Yogic Hours' }],
  creator: 'Yogic Hours',
  // No `alternates.canonical` here on purpose: child routes inherit it, so a value set
  // in the root layout would declare every page a duplicate of the homepage. A canonical
  // has to be set per route, or left out so each page self-canonicalises.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Yogic Hours',
    title: 'Yogic Hours - Heal In Every Hour',
    description: 'Premium wellness and yoga platform',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- pages-router rule; the root layout covers every route */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400;1,600&family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@200;300;400;500;600&display=swap"
        />
      </head>
      <body className="bg-[#f8faf9] text-[#143024] antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
