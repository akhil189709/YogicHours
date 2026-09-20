import Link from 'next/link';

// Each tile mirrors a mode that actually exists inside /meditation.
const JOURNEYS = [
  {
    title: 'Ambient Soundscapes',
    detail: 'Rain, ocean, forest & Tibetan bowls',
    glyph: 'M3 12c2 0 2-4 4-4s2 8 4 8 2-8 4-8 2 4 4 4',
  },
  {
    title: 'Guided Savasana',
    detail: 'Voice-narrated deep rest',
    glyph: 'M4 16h16M6 16a6 6 0 0112 0M12 6v2',
  },
  {
    title: 'Breathing Visuals',
    detail: 'Expand and release with the ring',
    glyph: 'M12 3a9 9 0 100 18 9 9 0 000-18zm0 5a4 4 0 100 8 4 4 0 000-8z',
  },
  {
    title: 'Dark Focus Timer',
    detail: 'Distraction-free stillness',
    glyph: 'M12 3a9 9 0 109 9 7 7 0 01-9-9z',
  },
];

const MeditationSection = () => {
  return (
    <section
      className="section-y relative overflow-hidden bg-[#081b11] px-6 text-white on-dark md:px-12"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#be9227]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <span className="eyebrow mb-5 text-[#d4af37]">Meditation Space</span>

          <h2 className="display-lg text-white">
            Calm your mind with <span className="display-accent-light">guided journeys.</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            Free ambient soundscapes, guided Savasana, breathing visuals, and a distraction-free
            dark focus mode — everything you need for a daily stillness practice.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/meditation"
              className="brand-btn-primary rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider"
            >
              Enter Meditation Space
            </Link>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d4af37]">
              Free, always
            </span>
          </div>
        </div>

        {/* ── Right: what is actually inside the space ── */}
        <div className="grid gap-4 sm:grid-cols-2">
          {JOURNEYS.map((journey) => (
            <div
              key={journey.title}
              className="divine-glass divine-glass-hover lift rounded-2xl p-6"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#d4af37]">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={journey.glyph} />
                </svg>
              </span>
              <h3 className="text-base font-semibold text-white">{journey.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">{journey.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeditationSection;
