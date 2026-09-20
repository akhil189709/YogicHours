'use client';

import React from 'react';
import Link from 'next/link';
import { Footer, Header, WhatsAppButton } from '@/components/Common';

interface Program {
  title: string;
  subtitle: string;
  description: string;
  format: string;
  frequency: string;
  focusArea: string;
  slug: string;
  badge?: string;
  isFeatured?: boolean;
}

const programs: Program[] = [
  {
    title: 'Therapy Yoga',
    subtitle: 'Clinical Pain Relief & Injury Rehabilitation',
    description:
      'Specialized 1-on-1 therapeutic protocols targeting chronic back pain, post-injury recovery, joint stiffness, and postural correction.',
    format: 'In-Person & Online',
    frequency: '2-3 Sessions / Wk',
    focusArea: 'Rehabilitation & Posture',
    slug: '/booking?type=Therapy%20Yoga',
    badge: 'Most Requested',
    isFeatured: true,
  },
  {
    title: 'Yoga at Home',
    subtitle: 'Guided Home Practice System',
    description:
      'Structured self-guided routines complete with high-definition video walkthroughs, personalized scheduling, and continuous mentor accountability.',
    format: 'Self-Paced Portal',
    frequency: 'Daily Practice Plan',
    focusArea: 'Habit Building & Routine',
    slug: '/booking?type=Yoga%20at%20Home',
  },
  {
    title: 'Online 1-on-1 Classes',
    subtitle: 'Private Live Alignment Coaching',
    description:
      'Direct interactive sessions with senior master instructors tailored precisely to your unique mobility range, breath capacity, and goals.',
    format: 'Live HD Video Call',
    frequency: 'Flexible Scheduling',
    focusArea: 'Alignment & Precision',
    slug: '/booking?type=Online%201-on-1',
  },
  {
    title: 'Family & Couples Yoga',
    subtitle: 'Shared Mindful Connection',
    description:
      'Guided joint practices designed to reduce household stress, foster deeper emotional connection, and instill healthy habits together.',
    format: 'Private Group',
    frequency: 'Weekly Sessions',
    focusArea: 'Emotional Bond & Balance',
    slug: '/booking?type=Family%20Yoga',
  },
  {
    title: 'Corporate Wellness',
    subtitle: 'Executive & Team Resilience Programs',
    description:
      'Tailored workplace stress management workshops, desk-stretching modules, and leadership burnout recovery retreats.',
    format: 'On-Site or Hybrid',
    frequency: 'Custom Retainer',
    focusArea: 'Performance & Stress Control',
    slug: '/booking?type=Corporate%20Wellness',
    badge: 'Enterprise',
  },
];

const ServicesPage = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .service-card {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-card:hover {
          transform: translateY(-6px);
          border-color: rgba(190, 146, 39, 0.4);
          box-shadow: 0 24px 48px -12px rgba(20, 48, 36, 0.12);
        }

        .service-card:hover .service-title {
          color: #be9227;
        }

        .service-card:hover .arrow-icon {
          transform: translateX(4px);
          color: #be9227;
        }
      ` }} />

      <main
        className="min-h-screen bg-[#f8faf9] text-[#143024]"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <Header />

        {/* ── HERO HEADER BANNER ── */}
        <section className="relative py-24 px-6 sm:px-12 bg-[#143024] text-white overflow-hidden">
          {/* Subtle Lighting Orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#be9227]/15 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-bold text-[#be9227] bg-[#be9227]/15 px-4 py-1.5 rounded-full border border-[#be9227]/25 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#be9227] animate-pulse" />
              Structured Offerings
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Wellness programs <br />
              <span className="italic font-light text-[#be9227]">built for your life.</span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-white/70 font-normal leading-relaxed">
              From recovery-focused clinical therapy to executive corporate wellness, explore
              science-backed yoga routines designed for measurable health transformations.
            </p>
          </div>
        </section>

        {/* ── SERVICES & PROGRAMS GRID ── */}
        <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-12">
            {programs.map((program, idx) => {
              const isLarge = program.isFeatured;
              return (
                <article
                  key={program.title}
                  className={`service-card rounded-3xl bg-white border border-[#143024]/10 p-8 sm:p-10 shadow-xs flex flex-col justify-between relative overflow-hidden ${
                    isLarge
                      ? 'lg:col-span-12 bg-gradient-to-br from-white via-white to-[#be9227]/5 border-[#be9227]/30'
                      : 'lg:col-span-6'
                  }`}
                >
                  {/* Highlight Ribbon */}
                  {program.badge && (
                    <div className="absolute top-6 right-6">
                      <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#be9227]/10 text-[#be9227] border border-[#be9227]/20">
                        {program.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#143024]/40">
                      Program 0{idx + 1}
                    </span>

                    <h2 className="service-title text-3xl font-bold text-[#143024] mt-2 transition-colors duration-300">
                      {program.title}
                    </h2>

                    <p className="text-sm font-semibold text-[#be9227] mt-1">{program.subtitle}</p>

                    <p className="mt-4 text-sm sm:text-base text-[#143024]/70 leading-relaxed max-w-2xl">
                      {program.description}
                    </p>

                    {/* SaaS-Style Metric Chips */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <div className="px-3.5 py-1.5 rounded-xl bg-[#143024]/5 border border-[#143024]/10 text-xs font-medium text-[#143024]">
                        <span className="text-[#143024]/40 mr-1.5">Format:</span> {program.format}
                      </div>

                      <div className="px-3.5 py-1.5 rounded-xl bg-[#143024]/5 border border-[#143024]/10 text-xs font-medium text-[#143024]">
                        <span className="text-[#143024]/40 mr-1.5">Pacing:</span>{' '}
                        {program.frequency}
                      </div>

                      <div className="px-3.5 py-1.5 rounded-xl bg-[#143024]/5 border border-[#143024]/10 text-xs font-medium text-[#143024]">
                        <span className="text-[#143024]/40 mr-1.5">Focus:</span> {program.focusArea}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="mt-10 pt-6 border-t border-[#143024]/5 flex items-center justify-between">
                    <Link
                      href={program.slug}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#143024] hover:text-[#be9227] transition-colors group"
                    >
                      <span>Explore & Book Program</span>
                      <svg
                        className="arrow-icon w-4 h-4 transition-transform duration-300 text-[#143024]/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>

                    <span className="text-xs font-bold text-[#143024]/30 uppercase tracking-widest">
                      Yogic Hours Yoga
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ── CTA BANNER BOX ── */}
          <div className="mt-16 rounded-3xl bg-[#143024] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#be9227]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-[#be9227] border border-white/15">
                Need Guidance?
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold mt-4">
                Unsure which program fits your current health goals?
              </h3>
              <p className="text-white/70 text-sm sm:text-base mt-2">
                Consult with our senior therapists over WhatsApp or submit a health intake form for
                a custom recommendation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 shrink-0">
              <Link href="/booking" className="w-full sm:w-auto">
                <button className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#be9227] px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-[#be9227] hover:-translate-y-0.5">
                  <span>Book Consultation</span>
                </button>
              </Link>

              <WhatsAppButton
                variant="outline"
                size="md"
                message="Hi Yogic Hours, I would like to inquire about which services fit my health needs."
                className="w-full sm:w-auto justify-center bg-white/10 text-white border-white/20 hover:bg-white hover:text-[#143024] transition-all py-4 px-6 rounded-full font-bold text-base"
              />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ServicesPage;
