import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SmoothScroll } from '@/components/Common';

export const metadata: Metadata = {
  title: 'Yogic Hours - Heal In Every Hour',
  description:
    'Premium wellness and yoga platform offering personalized classes, therapy yoga, and meditation',
  keywords: ['yoga', 'wellness', 'meditation', 'fitness', 'healing'],
  authors: [{ name: 'Yogic Hours' }],
  creator: 'Yogic Hours',
  openGraph: {
    type: 'website',
    url: 'https://yogichours.com',
    title: 'Yogic Hours - Heal In Every Hour',
    description: 'Premium wellness and yoga platform',
    images: [
      {
        url: 'https://yogichours.com/og-image.jpg',
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
