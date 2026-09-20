import Link from 'next/link';
import { Footer, Header, WhatsAppButton } from '@/components/Common';

const scheduleHighlights = [
  {
    title: 'Morning mobility',
    detail: 'Gentle breathwork and joint-friendly movement to start the day with clarity.',
  },
  {
    title: 'Clinical support',
    detail: 'One-on-one sessions tailored for recovery, stress relief, and posture care.',
  },
  {
    title: 'Flexible timings',
    detail: 'Choose early morning, midday, or evening slots based on your routine.',
  },
];

const weeklySchedule = [
  {
    day: 'Monday',
    time: '06:30 AM',
    session: 'Breath & Mobility Flow',
  },
  {
    day: 'Wednesday',
    time: '07:00 PM',
    session: 'Restorative Yoga Therapy',
  },
  {
    day: 'Friday',
    time: '08:00 AM',
    session: 'Strength & Alignment',
  },
  {
    day: 'Sunday',
    time: '10:00 AM',
    session: 'Family Wellness Circle',
  },
];

const SchedulePage = () => {
  return (
    <main
      className="min-h-screen bg-[#f8faf9] text-[#143024]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <Header />

      <section className="relative overflow-hidden bg-[#143024] px-6 py-20 text-white sm:px-10 lg:px-16">
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-[#be9227]/15 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#be9227]/30 bg-[#be9227]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#be9227]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#be9227]" />
              Wellness schedule
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              A calm, structured routine for your next step in wellness.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Explore our recurring sessions, discover the right format for your goals, and reserve
              your preferred slot in minutes.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#be9227]">
              Need help choosing?
            </p>
            <p className="mt-2 max-w-sm text-sm text-white/75">
              Our team can guide you toward the best session for stress relief, mobility, or
              recovery.
            </p>
            <div className="mt-5">
              <WhatsAppButton
                className="justify-center rounded-xl border border-[#be9227] px-4 py-2.5 text-sm font-semibold"
                message="Hi Yogic Hours, I would like help choosing the right wellness session."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#143024]/10 bg-white p-7 shadow-[0_15px_45px_-20px_rgba(20,48,36,0.15)] sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#be9227]">
                  Weekly rhythm
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[#143024]">
                  Sessions designed around your pace.
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              {weeklySchedule.map((item) => (
                <div
                  key={item.day}
                  className="flex flex-col gap-2 rounded-2xl border border-[#143024]/10 bg-[#f8faf9] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#143024]">{item.day}</p>
                    <p className="text-sm text-[#143024]/65">{item.session}</p>
                  </div>
                  <span className="rounded-full border border-[#be9227]/20 bg-[#be9227]/10 px-3 py-1 text-sm font-semibold text-[#be9227]">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-[#143024]/10 bg-white p-7 shadow-[0_15px_45px_-20px_rgba(20,48,36,0.15)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#be9227]">
                What you can expect
              </p>
              <h3 className="mt-3 text-2xl font-bold text-[#143024]">
                A simple path from discovery to booking.
              </h3>
              <div className="mt-5 space-y-4">
                {scheduleHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#143024]/10 bg-[#f8faf9] p-4"
                  >
                    <h4 className="text-base font-semibold text-[#143024]">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-[#143024]/70">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#143024]/10 bg-gradient-to-br from-[#143024] to-[#1f4734] p-7 text-white shadow-[0_15px_45px_-20px_rgba(20,48,36,0.4)] sm:p-8">
              <h3 className="text-2xl font-bold">Ready to reserve your slot?</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Pick the session format that suits your wellness goals and book your next
                appointment.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center rounded-xl bg-[#be9227] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#be9227]"
                >
                  Book a session
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Explore services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SchedulePage;
