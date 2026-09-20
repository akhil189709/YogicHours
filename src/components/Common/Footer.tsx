import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { CONTACT_INFO, SOCIAL_MEDIA } from '@/constants';
import WhatsAppButton from './WhatsAppButton';

const FOOTER_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/schedule', label: 'Schedule' },
  // { href: '/blog', label: 'Blog' },
  // { href: '/wisdom-library', label: 'Wisdom Library' },
  { href: '/contact', label: 'Contact' },
] as const;

const TOOL_LINKS = [
  { href: '/wellness-tools', label: 'Wellness Tools' },
  { href: '/surya-namaskar', label: 'Surya Namaskar Tracker' },
  { href: '/meditation', label: 'Meditation Space' },
  { href: '/wisdom-library', label: 'Yogic Wisdom Library' },
  { href: '/health-intake', label: 'Health Intake Form' },
] as const;

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: SOCIAL_MEDIA.INSTAGRAM.url,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.25.06 2.1.25 2.85.55.77.3 1.42.7 2.07 1.35a5.6 5.6 0 0 1 1.35 2.07c.3.75.49 1.6.55 2.85.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.06 1.25-.25 2.1-.55 2.85a5.6 5.6 0 0 1-1.35 2.07 5.6 5.6 0 0 1-2.07 1.35c-.75.3-1.6.49-2.85.55-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.25-.06-2.1-.25-2.85-.55a5.6 5.6 0 0 1-2.07-1.35 5.6 5.6 0 0 1-1.35-2.07c-.3-.75-.49-1.6-.55-2.85C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.06-1.25.25-2.1.55-2.85A5.6 5.6 0 0 1 4.17 2.23a5.6 5.6 0 0 1 2.07-1.35c.75-.3 1.6-.49 2.85-.55C10.34 2.2 10.74 2.2 12 2.2zm0 1.8c-3.14 0-3.51.01-4.75.07-1.02.05-1.57.22-1.94.36-.49.19-.83.42-1.2.79-.37.37-.6.71-.79 1.2-.14.37-.31.92-.36 1.94C3.01 9.4 3 9.77 3 12s.01 2.6.07 3.84c.05 1.02.22 1.57.36 1.94.19.49.42.83.79 1.2.37.37.71.6 1.2.79.37.14.92.31 1.94.36 1.24.06 1.6.07 4.75.07s3.51-.01 4.75-.07c1.02-.05 1.57-.22 1.94-.36.49-.19.83-.42 1.2-.79.37-.37.6-.71.79-1.2.14-.37.31-.92.36-1.94.06-1.24.07-1.6.07-3.84s-.01-2.6-.07-3.84c-.05-1.02-.22-1.57-.36-1.94a3.2 3.2 0 0 0-.79-1.2 3.2 3.2 0 0 0-1.2-.79c-.37-.14-.92-.31-1.94-.36C15.6 4.01 15.23 4 12 4zm0 3.8a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4zm0 1.8a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8zm5.34-1.99a.98.98 0 1 1-1.96 0 .98.98 0 0 1 1.96 0z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: SOCIAL_MEDIA.FACEBOOK.url,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M13.5 21v-7.9h2.65l.4-3.08H13.5V8.05c0-.89.25-1.5 1.52-1.5h1.63V3.8c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.95 1.43-3.95 4.06v2.27H7.66v3.08h2.67V21h3.17z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: SOCIAL_MEDIA.YOUTUBE.url,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22 12s0-3.2-.41-4.74a2.78 2.78 0 0 0-1.96-1.96C18.1 5 12 5 12 5s-6.1 0-7.63.3a2.78 2.78 0 0 0-1.96 1.96C2 8.8 2 12 2 12s0 3.2.41 4.74a2.78 2.78 0 0 0 1.96 1.96C5.9 19 12 19 12 19s6.1 0 7.63-.3a2.78 2.78 0 0 0 1.96-1.96C22 15.2 22 12 22 12zM10 15.2V8.8L15.5 12 10 15.2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: SOCIAL_MEDIA.LINKEDIN.url,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
] as const;

const Footer = () => {
  return (
    <footer
      className="bg-[#143024] py-16 text-white"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr_0.9fr_0.9fr]">
          <div className="space-y-4">
            <Link
              href="/"
              aria-label="Yogic Hours home"
              className="inline-flex items-center justify-center rounded-3xl bg-white px-6 py-4 shadow-lg shadow-black/20 transition hover:shadow-[#be9227]/25"
            >
              <Image
                src="/logo.png"
                alt="Yogic Hours — Heal In Every Hour"
                width={802}
                height={594}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <div>
              <p className="max-w-sm text-sm leading-relaxed text-white/70">
                Curated wellness experiences that feel effortless, elegant, and deeply
                transformative.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-glass flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:text-[#be9227]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#be9227]">
              Explore
            </h4>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#be9227]">
              Free Practice Tools
            </h4>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              {TOOL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#be9227]">
              Connect
            </h4>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <p>Email: {CONTACT_INFO.EMAIL}</p>
              <p>
                Phone:{' '}
                <a href={CONTACT_INFO.PHONE_LINK} className="transition hover:text-white">
                  {CONTACT_INFO.PHONE}
                </a>
              </p>
              <div className="pt-2">
                <WhatsAppButton
                  variant="solid"
                  size="sm"
                  label={`WhatsApp: ${CONTACT_INFO.WHATSAPP}`}
                  className="w-full justify-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter card — dark liquid-glass panel, matching the header's material */}
        {/* <div className="footer-glass mt-10 rounded-[28px] p-8">
          <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#be9227]">
            Stay Inspired
          </h4>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75">
            Subscribe to the Yogic Hours newsletter for meditations, wellness tips, and
            transformative practices delivered weekly.
          </p>
          <form className="mt-6 flex flex-col gap-3 sm:max-w-md sm:flex-row">
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 rounded-2xl border border-white/15 bg-[#143024]/80 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#be9227]/50"
            />
            <button
              type="submit"
              className="rounded-2xl bg-[#be9227] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a67e1f]"
            >
              Subscribe
            </button>
          </form>
        </div> */}

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-center text-sm text-white/50 sm:flex-row sm:justify-between sm:text-left">
          <p>&copy; {new Date().getFullYear()} Yogic Hours. All rights reserved.</p>
          <p>yogichours.com</p>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .footer-glass {
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 12px 40px rgba(0, 0, 0, 0.25);
        }
      `,
        }}
      />
    </footer>
  );
};

export default Footer;
