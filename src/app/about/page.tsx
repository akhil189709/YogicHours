import type { Metadata } from 'next';
import Link from 'next/link';
import PhotoCarousel from '@/components/About/PhotoCarousel';
import type { CarouselPhoto } from '@/components/About/PhotoCarousel';
import { Footer, Header, Reveal } from '@/components/Common';

export const metadata: Metadata = {
  title: 'About Us - Yogic Hours',
  description:
    'Meet Aditya Pratap Singh, founder of Yogic Hours, and the yoga therapists and wellness coaches who guide every program.',
};

interface TeamMember {
  name: string;
  role: string;
  experience: string;
  photos: CarouselPhoto[];
  bio: string[];
  credentials: string[];
  expertise: string[];
  belief: string;
}

// `position` keeps the person in frame when a wide photo is cropped into the 4:5 card;
// `contain` is used where the pose spans the whole width and a crop would cut off limbs.
const FOUNDER_PHOTOS: CarouselPhoto[] = [
  {
    src: '/Founder1 (6).jpeg',
    alt: 'Aditya Pratap Singh in a standing backbend in a grassy field',
    position: '50% 60%',
  },

  { src: '/Founder1 (2).jpeg', alt: 'Aditya Pratap Singh balancing in a handstand beside a river' },
  {
    src: '/Founder1 (1).jpeg',
    alt: 'Aditya Pratap Singh in an arm balance inside the yoga studio',
    fit: 'contain',
  },
  { src: '/Founder1 (3).jpeg', alt: 'Aditya Pratap Singh in a wheel pose on an open road' },
  {
    src: '/Founder1 (4).jpeg',
    alt: 'Aditya Pratap Singh in cobra pose on a red mat',
    fit: 'contain',
  },
  {
    src: '/Founder1 (5).jpeg',
    alt: 'Aditya Pratap Singh seated with his hands in reverse prayer, seen from behind',
  },
];

const FOUNDER_CREDENTIALS = [
  "Master's Degree in Yoga",
  "Bachelor's Degree in Yoga",
  'Certificate in Holistic Health Management (HHM)',
];

const FOUNDER_EXPERTISE = [
  'Therapeutic Yoga',
  'Yoga Therapy',
  'Pranayama',
  'Meditation',
  'Stress Management',
  'Lifestyle Wellness',
  'Corporate Wellness',
  'Holistic Health Coaching',
];

const TEAM: TeamMember[] = [
  {
    name: 'Shiya Shahi',
    role: 'International Yoga Teacher & Wellness Coach',
    experience: '6+ Years',
    photos: [
      {
        src: '/Shiya1.jpeg',
        alt: 'Shiya Shahi smiling in a side-balancing pose in a bright yoga hall',
        position: '68% 50%',
      },
      {
        src: '/Shiya2.jpeg',
        alt: 'Shiya Shahi in a lunge with one arm reaching up in a yoga hall',
        position: '55% 50%',
      },
      {
        src: '/Shiya3.jpeg',
        alt: 'Shiya Shahi in a crescent lunge with one arm raised in a garden',
        position: '36% 50%',
      },
      {
        src: '/Shiya4-crop.jpeg',
        alt: 'Shiya Shahi in a forearm balance with one leg raised',
        position: '34% 50%',
      },
      {
        src: '/Shiya5.jpeg',
        alt: 'Shiya Shahi in an arm balance with her legs lifted in a yoga studio',
        position: '62% 50%',
      },
    ],
    bio: [
      'Shiya Shahi is an experienced International Yoga Teacher & Wellness Coach with over 6 years of experience in guiding individuals toward greater strength, flexibility, balance, and holistic well-being. She brings valuable international experience from Dubai, working with diverse clients and wellness needs.',
      'With a personalized and mindful approach, she designs yoga practices that support physical fitness, recovery, relaxation, and overall well-being.',
    ],
    credentials: [
      'B.Sc. in Yogic Science',
      'M.Sc. in Yogic Science',
      'International experience — Dubai',
    ],
    expertise: [
      'Aerial Yoga',
      'Therapeutic Yoga',
      'Yogic Practices',
      'Flexibility Training',
      'Holistic Wellness',
    ],
    belief:
      'With a strong foundation in yogic science and international exposure, Shiya is passionate about making yoga an engaging, effective, and transformative part of modern life.',
  },

  {
    name: 'Pragya Devi',
    role: 'Yoga Teacher & Therapist',
    experience: '7+ Years',
    photos: [
      {
        src: '/pragya1.jpeg',
        alt: 'Pragya Devi in a seated yoga pose on a blue mat',
        position: '50% 30%',
        zoom: 1.3,
      },
      {
        src: '/pragya2.jpeg',
        alt: 'Pragya Devi in a low lunge with her arms raised',
        position: '50% 30%',
        zoom: 1.1,
      },
      {
        src: '/pragya3.jpeg',
        alt: 'Pragya Devi in a front split with her arms raised',
        position: '50% 30%',
      },
    ],
    bio: [
      'Pragya Devi is a passionate and experienced Yoga Teacher & Therapist with over 7 years of expertise in helping individuals achieve better health, balance, and well-being through the timeless practice of yoga.',
      'She focuses on creating personalized yoga programs that address individual health goals. Whether the aim is physical fitness, stress management, improved flexibility, or support for lifestyle-related disorders, she provides a holistic and compassionate approach to wellness.',
    ],
    credentials: [
      "Bachelor's Degree in Yoga",
      'P.G. Diploma in Yoga — Dev Sanskriti Vishwavidyalaya',
    ],
    expertise: ['Hatha Yoga', 'Ashtanga Yoga', 'Pranayama', 'Meditation', 'Therapeutic Yoga'],
    belief:
      'For Pragya, yoga is more than a profession — it is a way of life dedicated to inspiring healthier, happier, and more mindful living.',
  },
];

const CheckIcon = () => (
  <svg
    className="mt-0.5 h-4 w-4 shrink-0 text-[#be9227]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
  </svg>
);

const ExpertiseChips = ({ items, dark = false }: { items: string[]; dark?: boolean }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((item) => (
      <li
        key={item}
        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
          dark
            ? 'border-white/15 bg-white/5 text-white/80'
            : 'border-[#143024]/10 bg-[#143024]/[0.04] text-[#143024]/80'
        }`}
      >
        {item}
      </li>
    ))}
  </ul>
);

const AboutPage = () => {
  return (
    <main
      className="min-h-screen bg-[#f8faf9] text-[#143024]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <Header />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#143024] px-6 py-20 text-white sm:px-12 sm:py-24">
        <div className="pointer-events-none absolute right-0 top-0 h-[480px] w-[480px] rounded-full bg-[#be9227]/15 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#be9227]/25 bg-[#be9227]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#be9227]">
            <span className="h-2 w-2 rounded-full bg-[#be9227]" />
            About Yogic Hours
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            The people behind{' '}
            <span className="font-light italic text-[#be9227]">your practice.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            A team of qualified yoga therapists and wellness coaches making authentic yoga and
            holistic wellness a practical part of modern life — one hour at a time.
          </p>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:sticky lg:top-28">
              <PhotoCarousel
                photos={FOUNDER_PHOTOS}
                label="Photos of Aditya Pratap Singh"
                priority
              />

              <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-2 divide-x divide-[#143024]/10 rounded-2xl border border-[#143024]/10 bg-white/95 py-4 text-center shadow-xl">
                <div>
                  <p className="text-2xl font-bold text-[#be9227]">8+</p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#143024]/60">
                    Years Experience
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#be9227]">500+</p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#143024]/60">
                    Individuals Guided
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="pt-6 lg:col-span-7 lg:pt-0" delay={0.1}>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#be9227]">
              <span className="h-px w-10 bg-[#be9227]" />
              Meet the Founder
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Aditya Pratap Singh
            </h2>
            <p className="mt-2 text-lg font-medium text-[#be9227]">Founder &amp; Yoga Therapist</p>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-[#143024]/75 sm:text-lg">
              <p>
                With over 8 years of experience in Yoga, Therapeutic Wellness, and Holistic Health,
                Aditya Pratap Singh is the Founder of Yogic Hours, a wellness platform dedicated to
                helping people build healthier, more balanced and mindful lives.
              </p>
              <p>
                His expertise combines traditional yogic practices with a practical, personalized
                approach to modern health and wellness. Over the years, he has guided 500+
                individuals through personalized yoga and wellness programs designed around their
                unique health and lifestyle goals.
              </p>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#143024]/50">
                  Qualifications
                </h3>
                <ul className="mt-4 space-y-3">
                  {FOUNDER_CREDENTIALS.map((credential) => (
                    <li key={credential} className="flex gap-3 text-sm font-medium text-[#143024]">
                      <CheckIcon />
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#143024]/50">
                  Areas of Expertise
                </h3>
                <div className="mt-4">
                  <ExpertiseChips items={FOUNDER_EXPERTISE} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="relative overflow-hidden bg-[#081b11] px-6 py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#be9227]/10 blur-[130px]" />
        <Reveal className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#be9227]">
            His vision is simple
          </p>
          <blockquote className="font-luxury-serif mt-6 text-3xl font-light leading-snug text-white sm:text-4xl md:text-5xl">
            &ldquo;To make authentic yoga and holistic wellness a practical part of modern life,
            helping individuals transform their health, mindset, and quality of life —{' '}
            <span className="italic text-[#d4af37]">one hour at a time.</span>&rdquo;
          </blockquote>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            — Aditya Pratap Singh
          </p>
        </Reveal>
      </section>

      {/* ── TEAM ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#be9227]">Our Team</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Guided by qualified{' '}
            <span className="font-light italic text-[#be9227]">practitioners.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#143024]/70 sm:text-lg">
            Every teacher at Yogic Hours holds formal qualifications in yoga and brings years of
            hands-on experience designing personalized programs.
          </p>
        </Reveal>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {TEAM.map((member, index) => {
            const reversed = index % 2 === 1;
            return (
              <div key={member.name} className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
                <Reveal
                  direction={reversed ? 'right' : 'left'}
                  className={`lg:col-span-5 ${reversed ? 'lg:order-2' : ''}`}
                >
                  <div className="relative mx-auto max-w-md">
                    <PhotoCarousel photos={member.photos} label={`Photos of ${member.name}`} />

                    <div className="absolute -bottom-5 left-6 right-6 flex items-center justify-between rounded-2xl border border-[#143024]/10 bg-white/95 px-5 py-3.5 shadow-xl">
                      <span className="text-sm font-bold text-[#143024]">{member.name}</span>
                      <span className="rounded-full bg-[#be9227]/10 px-2.5 py-1 text-xs font-bold text-[#8a6a1c]">
                        {member.experience}
                      </span>
                    </div>
                  </div>
                </Reveal>

                <Reveal
                  delay={0.1}
                  direction={reversed ? 'left' : 'right'}
                  className={`pt-6 lg:col-span-7 lg:pt-0 ${reversed ? 'lg:order-1' : ''}`}
                >
                  <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#be9227]">
                    <span className="h-px w-10 bg-[#be9227]" />
                    Team Member
                  </p>
                  <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-lg font-medium text-[#be9227]">{member.role}</p>

                  <div className="mt-6 space-y-4 text-base leading-relaxed text-[#143024]/75">
                    {member.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#143024]/50">
                        Qualifications
                      </h4>
                      <ul className="mt-4 space-y-3">
                        {member.credentials.map((credential) => (
                          <li
                            key={credential}
                            className="flex gap-3 text-sm font-medium text-[#143024]"
                          >
                            <CheckIcon />
                            {credential}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#143024]/50">
                        Specializations
                      </h4>
                      <div className="mt-4">
                        <ExpertiseChips items={member.expertise} />
                      </div>
                    </div>
                  </div>

                  <p className="mt-8 border-l-2 border-[#be9227] pl-4 text-sm italic leading-relaxed text-[#143024]/70">
                    {member.belief}
                  </p>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-24 sm:px-8">
        <Reveal className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#143024] to-[#1f4734] px-8 py-14 text-center text-white shadow-[0_30px_80px_-30px_rgba(20,48,36,0.5)] sm:px-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#be9227]/20 blur-[100px]" />
            <h2 className="relative text-3xl font-bold sm:text-4xl">
              Begin your practice with our team.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/75">
              Book a session and we&apos;ll match you with the right teacher for your health and
              lifestyle goals.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="brand-btn-primary inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold"
              >
                Book a Session
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
