import { Footer, Header } from '@/components/Common';
import { SuryaNamaskarTracker } from '@/components/SuryaNamaskar';

const benefits = [
  'Improves mobility and spinal flexibility',
  'Supports digestion and circulation',
  'Builds morning energy and resilience',
  'Connects breath with movement for presence',
];

const SuryaNamaskarPage = () => {
  return (
    <main className="min-h-screen bg-[#f8faf9] text-[#143024]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Header />

      {/* ── HERO INTRO ── */}
      <section className="relative overflow-hidden bg-[#143024] px-6 py-24 text-white sm:px-12">
        <div className="pointer-events-none absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-[#be9227]/15 blur-[150px]" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#be9227]/25 bg-[#be9227]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#be9227] backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#be9227]" />
            Guided 12-Pose Practice
          </div>

          <h1 className="mt-6 font-luxury-serif text-5xl font-light italic leading-[1.1] text-white sm:text-7xl">
            Surya Namaskar <span className="gold-shimmer-text not-italic">Tracker</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Move through the traditional Sun Salutation with paced breath cues, Sanskrit mantras,
            and gentle voice guidance — a cinematic, self-paced practice for every morning.
          </p>

          <ul className="mx-auto mt-10 grid max-w-2xl gap-3 text-left text-sm text-white/75 sm:grid-cols-2">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#be9227]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── INTERACTIVE TRACKER ── */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8 sm:py-24">
        <SuryaNamaskarTracker />
      </section>

      <Footer />
    </main>
  );
};

export default SuryaNamaskarPage;
