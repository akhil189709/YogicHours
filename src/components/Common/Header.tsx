'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/services', label: 'Services' },
  // { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const;

const PRACTICE_LINKS = [
  { href: '/wellness-tools', label: 'Wellness Tools', hint: 'BMI, BP, hydration & more' },
  { href: '/surya-namaskar', label: 'Surya Namaskar Tracker', hint: 'Guided 12-pose practice' },
  { href: '/meditation', label: 'Meditation Space', hint: 'Soundscapes & guided Savasana' },
  { href: '/wisdom-library', label: 'Yogic Wisdom Library', hint: 'Free learning resources' },
  { href: '/health-intake', label: 'Health Intake Form', hint: 'Start your wellness plan' },
] as const;

/* ── Active-link Component with Liquid-Glass Active Pill ── */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        active
          ? 'liquid-glass-pill text-[#8a6a1c] font-semibold'
          : 'text-[#143024] hover:text-[#be9227] hover:bg-black/5'
      }`}
    >
      {children}
    </Link>
  );
}

/* ── Scrolled-state hook for floating glass header ── */
function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

const Header = () => {
  const scrolled = useScrolled();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const pathname = usePathname();
  const practiceActive = PRACTICE_LINKS.some((link) => pathname === link.href);

  return (
    <>
      {/* Global CSS Styles for Liquid Glass & Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* The blur radius is intentionally identical in both states. Animating
           backdrop-filter re-rasterizes the blurred region every frame, which is
           the single most expensive thing a sticky header can do while scrolling.
           Only paint-cheap properties (background, shadow, border) transition. */
        .glass-header {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 10px 30px -10px rgba(20, 48, 36, 0);
          transform: translateZ(0);
          will-change: background-color, box-shadow;
          transition:
            background-color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .glass-header-scrolled {
          background: rgba(255, 255, 255, 0.82);
          border-bottom-color: rgba(0, 0, 0, 0.02);
          box-shadow: 0 10px 30px -10px rgba(20, 48, 36, 0.1);
        }

        /* Apple-style "Liquid Glass" material: translucent base + heavy
           blur/saturate + a thin specular highlight along the top edge that
           reads as light catching a curved glass surface. */
        .liquid-glass {
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow:
            0 8px 32px rgba(20, 48, 36, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            inset 0 -1px 0 rgba(20, 48, 36, 0.04);
        }

        /* The Practice dropdown is opaque on purpose: it sits over page content,
           and a translucent panel let that content read through the links. */
        .dropdown-panel {
          background: #ffffff;
          border: 1px solid rgba(20, 48, 36, 0.1);
          box-shadow:
            0 8px 32px rgba(20, 48, 36, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .liquid-glass-pill {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(190, 146, 39, 0.35);
          box-shadow:
            0 4px 16px rgba(190, 146, 39, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            inset 0 -1px 0 rgba(190, 146, 39, 0.08);
        }

      `,
        }}
      />

      <header
        className={`glass-header sticky top-0 z-50 w-full py-4 ${
          scrolled ? 'glass-header-scrolled' : ''
        }`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          {/* ── 1. LOGO / BRANDING ── */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="Yogic Hours — Heal In Every Hour"
              width={802}
              height={594}
              priority
              className="h-14 w-auto object-contain sm:h-16"
            />
          </Link>

          {/* ── 2. DESKTOP NAVIGATION LINKS ── */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {NAV_LINKS.slice(0, 3).map(({ href, label }) => (
              <li key={href}>
                <NavLink href={href}>{label}</NavLink>
              </li>
            ))}

            <li
              className="relative"
              onMouseEnter={() => setPracticeOpen(true)}
              onMouseLeave={() => setPracticeOpen(false)}
            >
              <button
                // The list opens this panel on hover, so on a mouse a click would land
                // on an already-open panel and toggle it straight shut. Only input that
                // never triggered the hover — touch, and keyboard (detail === 0) — toggles.
                onClick={(event) => {
                  const hasHover =
                    typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
                  if (!hasHover || event.detail === 0) setPracticeOpen((prev) => !prev);
                }}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  practiceActive
                    ? 'liquid-glass-pill text-[#8a6a1c] font-semibold'
                    : 'text-[#143024] hover:text-[#be9227] hover:bg-black/5'
                }`}
                aria-expanded={practiceOpen}
              >
                Practice
                <svg
                  className={`h-3.5 w-3.5 transition-transform ${practiceOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {practiceOpen && (
                <div className="dropdown-panel absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 rounded-2xl p-2">
                  {PRACTICE_LINKS.map(({ href, label, hint }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setPracticeOpen(false)}
                      className="block rounded-xl px-4 py-2.5 transition hover:bg-[#be9227]/10"
                    >
                      <span className="block text-sm font-semibold text-[#143024]">{label}</span>
                      <span className="block text-xs text-[#143024]/55">{hint}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {NAV_LINKS.slice(3).map(({ href, label }) => (
              <li key={href}>
                <NavLink href={href}>{label}</NavLink>
              </li>
            ))}
          </ul>

          {/* ── 3. CTAs ── */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              {/* Schedule Button */}
              <Link href="/schedule" className="hidden sm:inline-block">
                <button className="px-5 py-2.5 rounded-xl border border-[#be9227] text-[#be9227] hover:bg-[#be9227] hover:text-white text-sm font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md">
                  Schedule
                </button>
              </Link>

              {/* Book Now Pill — liquid glass */}
              <Link
                href="/booking"
                className="liquid-glass-pill flex items-center gap-2 text-sm font-medium text-[#143024] hover:text-[#be9227] transition-colors px-4 py-2 rounded-full"
              >
                <span>Book Now</span>
              </Link>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-xl text-[#143024] hover:bg-black/5 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* ── 4. MOBILE NAVIGATION DRAWER ── */}
        {mobileMenuOpen && (
          <div className="liquid-glass md:hidden border-b border-black/10 px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-base font-medium text-[#143024] hover:text-[#be9227] transition-colors border-b border-black/5"
              >
                {label}
              </Link>
            ))}

            <p className="pt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#be9227]">
              Practice
            </p>
            {PRACTICE_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-base font-medium text-[#143024] hover:text-[#be9227] transition-colors border-b border-black/5 last:border-none"
              >
                {label}
              </Link>
            ))}

            <Link href="/schedule" className="mt-2 w-full">
              <button className="w-full py-3 rounded-xl bg-[#be9227] text-white font-semibold text-sm shadow-md hover:bg-[#a67e1f] transition-colors">
                View Schedule
              </button>
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
