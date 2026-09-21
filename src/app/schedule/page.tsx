import Image from 'next/image';
import Link from 'next/link';
import { Cormorant_Garamond } from 'next/font/google';
import { Footer, Header, WhatsAppButton } from '@/components/Common';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
});

type IconProps = { className?: string };

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const SunIcon = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
  </svg>
);

const BoltIcon = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);

const LotusIcon = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path d="M12 4c2.5 2.5 3 6.5 0 12-3-5.5-2.5-9.5 0-12z" />
    <path d="M3 9c3.5 0 6 3 6.5 8-3.5 0-6.3-2.5-6.5-8z" />
    <path d="M21 9c-3.5 0-6 3-6.5 8 3.5 0 6.3-2.5 6.5-8z" />
    <path d="M6 20.5h12" />
  </svg>
);

const FaceIcon = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 11c.8.8 1.7.8 2.5 0M13 11c.8.8 1.7.8 2.5 0M10 15.5c1.3.8 2.7.8 4 0" />
  </svg>
);

const GroupIcon = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M16 14.2c3 .3 5 2.4 5 5.8" />
  </svg>
);

const BriefcaseIcon = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
  </svg>
);

const MoonIcon = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
);

const HeartIcon = ({ className }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path d="M12 20s-7-4.4-9-9.2C1.6 7.3 4 4 7.2 4c2 0 3.6 1.1 4.8 3 1.2-1.9 2.8-3 4.8-3C20 4 22.4 7.3 21 10.8 19 15.6 12 20 12 20z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Content (from the client's schedule)                                */
/* ------------------------------------------------------------------ */

const sessions = [
  {
    time: '6:00 AM',
    title: 'Refresh & Energize',
    description:
      'Gentle yet effective practice to wake up your body, boost energy and set a positive tone for the day.',
    points: ['Gentle Asanas', 'Breathwork', 'Mobility & Stretching', 'Relaxation'],
    image: '/one.jpg',
    Icon: SunIcon,
    bg: '#fbf1dd',
    iconBg: '#f8e3b0',
    iconColor: '#d99a1e',
  },
  {
    time: '7:00 AM',
    title: 'Power Flow',
    description: 'High intensity practice to build strength, improve stamina and increase focus.',
    points: ['Dynamic Asanas', 'Core & Strength', 'Breath Control', 'Cool Down'],
    image: '/two.jpg',
    Icon: BoltIcon,
    bg: '#fdebe0',
    iconBg: '#f9c9a6',
    iconColor: '#e8752a',
  },
  {
    time: '8:30 AM',
    title: 'Strong & Steady',
    description: 'A high intensity class to improve flexibility, endurance and overall fitness.',
    points: ['Power Yoga', 'Core Strength', 'Balance & Stability', 'Relaxation'],
    image: '/three.jpg',
    Icon: LotusIcon,
    bg: '#efebf6',
    iconBg: '#ddd3ee',
    iconColor: '#7a5bb0',
  },
  {
    time: '10:30 AM',
    title: 'Yoga, Face & Breath',
    description:
      'A perfect blend of yoga, face yoga and breathing practices for inner balance, healthy skin and overall wellness.',
    points: ['Yoga Asanas', 'Face Yoga', 'Breathing Techniques', 'Relaxation'],
    image: '/four.jpg',
    Icon: FaceIcon,
    bg: '#fbe8e8',
    iconBg: '#f6c8cf',
    iconColor: '#d0546a',
  },
  {
    time: '5:00 PM',
    title: 'Ladies Special',
    description: 'A dedicated batch for women to stay fit, healthy and confident.',
    points: ['Gentle Yoga', 'Strength & Toning', 'Hormonal Balance', 'Relaxation'],
    image: '/five.jpg',
    Icon: GroupIcon,
    bg: '#f8e6ec',
    iconBg: '#ecc6d8',
    iconColor: '#a44a78',
  },
  {
    time: '6:30 PM',
    title: 'Corporate Wellness',
    description:
      'Simple, effective practices to release stress, improve posture and bring balance after a busy workday.',
    points: ['Stretching & Mobility', 'Breathwork', 'Stress Relief', 'Guided Relaxation'],
    image: '/six.jpg',
    Icon: BriefcaseIcon,
    bg: '#e6eff5',
    iconBg: '#bfe0e8',
    iconColor: '#2f7f93',
  },
  {
    time: '8:30 PM',
    title: 'Face Yoga & Relaxation',
    description: 'Nourish your face, calm your mind and prepare for deep, restful sleep.',
    points: ['Face Yoga', 'Massage Techniques', 'Breathing', 'Yoga Nidra'],
    image: '/seven.jpg',
    Icon: MoonIcon,
    bg: '#e4ebf5',
    iconBg: '#c7d6ea',
    iconColor: '#3b5f8f',
  },
];

const assurances = [
  { title: 'Expert Guidance', detail: 'Safe & Effective Practices', Icon: LotusIcon },
  { title: 'Small Groups', detail: 'Personal Attention', Icon: GroupIcon },
  { title: 'Holistic Wellness', detail: 'Body · Mind · Beauty', Icon: HeartIcon },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const SchedulePage = () => {
  return (
    <main
      className="min-h-screen bg-[#fbf8f2] text-[#143024]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <Header />

      {/* Hero */}
      <section className="overflow-hidden bg-gradient-to-r from-[#f7eddc] via-[#fbf3e6] to-[#f3d9b5]">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-6 pt-14 sm:px-10 lg:grid-cols-[1fr_1fr] lg:gap-0 lg:pt-0">
          <div className="lg:py-16">
            <p className="text-sm font-medium tracking-[0.3em] text-[#be9227]">
              YOGIC HOURS · HEAL IN EVERY HOUR
            </p>
            <h1
              className={`${serif.className} mt-5 text-5xl font-medium italic leading-[1.15] text-[#143024]/85 sm:text-6xl`}
            >
              Better Health
              <br />
              Brighter Mind
              <br />
              Natural Glow
            </h1>
            <div className="mt-6 h-px w-16 bg-[#be9227]" />
            <Link
              href="/booking"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#143024] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1f4734] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#be9227]"
            >
              Book a session
            </Link>
          </div>

          <div className="relative -mx-6 h-64 sm:-mx-10 lg:mx-0 lg:h-[340px] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]">
            <Image
              src="/hero2.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[60%_80%]"
            />
          </div>
        </div>
      </section>

      {/* Title */}
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-14 text-center sm:px-10">
        <h2 className={`${serif.className} text-4xl font-semibold text-[#143024] sm:text-5xl`}>
          Daily Group Sessions
        </h2>
        <p className="mt-3 text-sm font-medium tracking-[0.35em] text-[#143024]">MONDAY – FRIDAY</p>
        <p className={`${serif.className} mt-3 text-lg italic text-[#143024]/75 sm:text-xl`}>
          Simple Practices <span className="mx-2 text-[#be9227]">|</span> Real Results{' '}
          <span className="mx-2 text-[#be9227]">|</span> A Healthier You
        </p>
      </section>

      {/* Sessions */}
      <section
        aria-label="Daily group sessions, Monday to Friday"
        className="mx-auto max-w-6xl px-4 pb-10 sm:px-8"
      >
        <ol className="space-y-4">
          {sessions.map(
            ({ time, title, description, points, image, Icon, bg, iconBg, iconColor }) => (
              <li key={time}>
                <article
                  className="flex flex-col overflow-hidden rounded-2xl border border-[#143024]/5 lg:flex-row lg:items-stretch"
                  style={{ backgroundColor: bg }}
                >
                  {/* Photo: top on mobile, right side on desktop */}
                  <div className="relative h-44 w-full shrink-0 lg:order-last lg:h-auto lg:min-h-[136px] lg:w-[280px] lg:[mask-image:linear-gradient(to_right,transparent,black_35%)]">
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 280px, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-0 lg:p-0">
                    {/* Time */}
                    <div className="flex items-center gap-4 lg:w-[220px] lg:shrink-0 lg:flex-col lg:items-start lg:gap-2 lg:px-7 lg:py-6">
                      <span
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: iconBg, color: iconColor }}
                      >
                        <Icon className="h-7 w-7" />
                      </span>
                      <div>
                        <p className="text-2xl font-semibold leading-none text-[#143024] sm:text-[28px]">
                          {time}
                        </p>
                        <p className="mt-1.5 text-xs font-medium tracking-[0.2em] text-[#143024]/60">
                          MON – FRI
                        </p>
                      </div>
                    </div>

                    <div className="my-6 hidden w-px self-stretch bg-[#143024]/15 lg:block" />

                    {/* Title + description */}
                    <div className="lg:flex-1 lg:px-8 lg:py-6">
                      <h3
                        className={`${serif.className} text-2xl font-semibold text-[#143024] sm:text-[28px]`}
                      >
                        {title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#143024]/70">
                        {description}
                      </p>
                    </div>

                    <div className="my-6 hidden w-px self-stretch bg-[#143024]/15 lg:block" />

                    {/* What's covered */}
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 lg:w-[210px] lg:shrink-0 lg:grid-cols-1 lg:gap-y-1.5 lg:px-7 lg:py-6">
                      {points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2 text-sm text-[#143024]/80"
                        >
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 shrink-0 rounded-full bg-[#143024]/60"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            )
          )}
        </ol>
      </section>

      {/* Assurances */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-8">
        <ul className="grid gap-5 rounded-2xl bg-[#f3e8d0] px-6 py-5 sm:grid-cols-3 sm:gap-0 sm:px-4">
          {assurances.map(({ title, detail, Icon }, index) => (
            <li
              key={title}
              className={`flex items-center justify-center gap-4 sm:py-1 ${
                index > 0 ? 'sm:border-l sm:border-[#143024]/15' : ''
              }`}
            >
              <Icon className="h-9 w-9 shrink-0 text-[#be9227]" />
              <div>
                <p className="text-sm font-semibold text-[#143024]">{title}</p>
                <p className="text-xs text-[#143024]/65">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Closing call to action */}
      <section className="bg-[#143024] px-6 py-16 text-center text-white sm:px-10">
        <div className="mx-auto max-w-3xl">
          <p className={`${serif.className} text-3xl italic text-[#e3c268] sm:text-4xl`}>
            Small Steps Every Day = Big Changes Over Time
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            Pick the session that fits your day and reserve your spot. Not sure which one to choose?
            Message us and we will help you find the right batch.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-xl bg-[#be9227] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a67f20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book a session
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore services
            </Link>
            <WhatsAppButton
              className="justify-center rounded-xl border border-[#be9227] px-6 py-3 text-sm font-semibold"
              message="Hi Yogic Hours, I would like help choosing the right group session."
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SchedulePage;
