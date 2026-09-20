'use client';

import React from 'react';

interface BenefitItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const benefits: BenefitItem[] = [
  {
    title: 'Personalized Wellness Plans',
    description:
      'Tailored strategies and custom flows built around your specific body goals, lifestyle, and pace.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    title: 'Certified Experts',
    description:
      'Deeply trained instructors with advanced certifications across traditional yoga, therapy, and biomechanics.',
    highlight: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
  {
    title: 'Therapy Based Healing',
    description:
      'Evidence-backed posture and restorative yoga programs engineered for sustainable pain and injury recovery.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Meditation + Breathwork',
    description:
      'Integrated Pranayama and guided mindfulness modules for nervous system reset and mental clarity.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: 'Wellness Tracking',
    description:
      'Data-driven progress insights, attendance metrics, and feedback loops for sustained personal transformation.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: 'Modern Tech + Ancient Yoga',
    description:
      'Smart digital tools and live virtual tracking combined with centuries-old traditional yogic wisdom.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

const WhyChooseUs = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .why-card {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
        }

        .why-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -15px rgba(20, 48, 36, 0.08);
        }
      ` }} />

      <section
        className="section-y px-6 md:px-12 relative overflow-hidden bg-[#f8faf9]"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Subtle Background Accent Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#be9227]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#143024]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ── HEADER ── */}
          <div className="mb-16 text-center max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-4 text-xs tracking-[0.25em] uppercase font-bold text-[#be9227] bg-[#be9227]/10 px-4 py-1.5 rounded-full border border-[#be9227]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#be9227]" />
              Why Choose Us
            </div>

            <h2 className="display-lg text-[#143024]">
              Premium wellness with <br />
              <span className="display-accent">measurable healing.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#143024]/70 font-normal leading-relaxed">
              Choose Yogic Hours Yoga for holistic care, certified master instructors, and
              progressive tools designed to guide your lifelong practice.
            </p>
          </div>

          {/* ── BENEFITS GRID ── */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              if (benefit.highlight) {
                return (
                  /* Featured Dark Card Accent */
                  <div
                    key={benefit.title}
                    className="why-card rounded-3xl p-8 bg-[#143024] text-white flex flex-col justify-between relative overflow-hidden shadow-xl"
                  >
                    {/* Glowing Accent Orb */}
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#be9227]/20 rounded-full blur-2xl pointer-events-none" />

                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#be9227] border border-white/15 flex items-center justify-center mb-6">
                        {benefit.icon}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>

                      <p className="text-sm leading-relaxed text-white/75 font-normal">
                        {benefit.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#be9227]">
                        Top Rated Instructors
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#be9227]" />
                    </div>
                  </div>
                );
              }

              return (
                /* Standard Light Card */
                <div
                  key={benefit.title}
                  className="why-card rounded-3xl border border-[#143024]/10 bg-[#f8faf9] p-8 flex flex-col justify-between hover:border-[#be9227]/40"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#be9227]/10 text-[#be9227] border border-[#be9227]/20 flex items-center justify-center mb-6">
                      {benefit.icon}
                    </div>

                    <h3 className="text-xl font-bold text-[#143024] mb-3">{benefit.title}</h3>

                    <p className="text-sm leading-relaxed text-[#143024]/70 font-normal">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── FOOTER STATS BANNER ── */}
          <div className="mt-16 rounded-3xl bg-[#f8faf9] border border-[#143024]/10 p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-extrabold text-[#143024]">99.4%</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#143024]/60 mt-1">
                Satisfaction Rate
              </p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#be9227]">12,000+</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#143024]/60 mt-1">
                Active Students
              </p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#143024]">500+</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#143024]/60 mt-1">
                Live Sessions / Mo
              </p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#be9227]">4.9 / 5</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#143024]/60 mt-1">
                Community Rating
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
