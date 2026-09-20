import Link from 'next/link';
import { SURYA_NAMASKAR_POSES } from '@/components/SuryaNamaskar/poses';

// Breath cue → the dot colour that marks it in the sequence grid.
const BREATH_TONE: Record<string, string> = {
  Inhale: '#2f6b4d',
  Exhale: '#be9227',
  Hold: '#8a6a1c',
  Neutral: 'rgba(20, 48, 36, 0.3)',
};

const SuryaNamaskarSection = () => {
  return (
    <section
      className="section-y bg-white px-6 md:px-12"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <span className="eyebrow mb-5">Surya Namaskar Tracker</span>

          <h2 className="display-lg text-[#143024]">
            Improve strength, flexibility, and{' '}
            <span className="display-accent">breath together.</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#143024]/70">
            A fully guided sun salutation practice — pose-by-pose voice cues, Sanskrit mantras,
            adjustable pacing, and a live calorie tracker, all in one immersive fullscreen session.
          </p>

          <ul className="mt-9 space-y-3.5">
            {[
              'Count 1–12 poses with breath-synced timing',
              'Sanskrit mantras with optional voice guidance',
              'Adjustable speed & live calorie tracking',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-[#143024]/75">
                <svg
                  className="mt-1 h-4 w-4 shrink-0 text-[#be9227]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {point}
              </li>
            ))}
          </ul>

          <Link
            href="/surya-namaskar"
            className="brand-btn-primary mt-10 inline-flex rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider"
          >
            Start the Practice
          </Link>
        </div>

        {/* ── Right: the canonical 12-step sequence, straight from the tracker's data ── */}
        <div className="rounded-[2rem] border border-[#143024]/10 bg-[#f8faf9] p-7 shadow-sm sm:p-9">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="display-md text-[#143024]">The 12 Poses</h3>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#be9227]">
              One Round
            </span>
          </div>

          <ol className="mt-7 grid gap-x-5 gap-y-3.5 sm:grid-cols-2">
            {SURYA_NAMASKAR_POSES.map((pose) => (
              <li key={pose.step} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#143024] shadow-xs ring-1 ring-[#143024]/10">
                  {pose.step}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[#143024]">
                    {pose.sanskritName}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#143024]/55">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: BREATH_TONE[pose.breathCue] }}
                    />
                    {pose.breathCue}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <hr className="gold-rule my-7" />

          <p className="text-sm leading-relaxed text-[#143024]/65">
            Track your rounds, breath, and posture as you build a sustainable daily sequence with
            guidance from our experts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuryaNamaskarSection;
