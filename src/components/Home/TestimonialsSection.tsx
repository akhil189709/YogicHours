'use client';

import React from 'react';

interface Testimonial {
  name: string;
  role: string;
  location: string;
  rating: number;
  avatar: string;
  feedback: string;
  tag: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Anjali Sharma',
    role: 'VP of Human Resources',
    location: 'Mumbai',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    tag: 'Corporate Wellness',
    feedback:
      'The corporate wellness workshop completely transformed our team culture. Stress levels dropped significantly within a month, and the energy in our office sessions is electric.',
  },
  {
    name: 'Rahul Verma',
    role: 'Software Architect & Parent',
    location: 'Bengaluru',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    tag: 'Family Yoga',
    feedback:
      'Family yoga helped us truly reconnect with our children. The blend of playful movement and guided breathwork has become our favorite weekend ritual.',
  },
  {
    name: 'Priya Nair',
    role: 'Therapy Program Student',
    location: 'Delhi',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    tag: 'Therapy Yoga',
    feedback:
      'After years of chronic back pain, the targeted posture therapy eased my discomfort and restored my sleep within just three weeks. Indispensable care.',
  },
];

const TestimonialsSection = () => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .testimonial-item {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .testimonial-item:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(190, 146, 39, 0.3);
        }

        .testimonial-item:hover .quote-mark {
          color: #be9227;
          transform: scale(1.1) rotate(-6deg);
        }
      `,
        }}
      />

      <section
        className="section-y px-6 md:px-12 relative overflow-hidden bg-[#143024] text-white on-dark"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Subtle Ambient Light Orbs */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#be9227]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ── HEADER & COMMUNITY RATING ── */}
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-20 gap-8 pb-12 border-b border-white/10">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4 text-xs tracking-[0.25em] uppercase font-bold text-[#be9227] bg-[#be9227]/15 px-4 py-1.5 rounded-full border border-[#be9227]/25 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#be9227] animate-pulse" />
                Student Experiences
              </div>

              <h2 className="display-lg text-white">
                Real stories. <br />
                <span className="display-accent-light">Real transformation.</span>
              </h2>
            </div>

            {/* Overall Rating Pill */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-3xl backdrop-blur-xl">
              <div className="flex -space-x-3">
                {testimonials.map((t, idx) => (
                  <img
                    key={idx}
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#143024]"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-[#be9227]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-white/70 font-medium mt-1">
                  <strong className="text-white font-bold">4.9/5 Rating</strong> from 12,000+
                  students
                </p>
              </div>
            </div>
          </div>

          {/* ── NON-CARD EDITORIAL TESTIMONIALS LAYOUT ── */}
          <div className="space-y-12">
            {testimonials.map((item, index) => (
              <div
                key={item.name}
                className={`testimonial-item relative p-8 sm:p-12 rounded-[2.5rem] bg-white/[0.04] border border-white/10 backdrop-blur-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Background Decorative Quote Mark */}
                <span className="quote-mark absolute top-6 right-8 text-7xl font-serif text-white/5 transition-all duration-500 pointer-events-none select-none">
                  “
                </span>

                {/* Quote Content */}
                <div className="max-w-3xl relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#be9227]/10 border border-[#be9227]/20 text-[#be9227] text-xs font-semibold mb-4">
                    {item.tag}
                  </div>

                  <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/95 leading-relaxed tracking-tight">
                    “{item.feedback}”
                  </p>
                </div>

                {/* Author Details Block */}
                <div className="flex items-center gap-5 shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10 w-full lg:w-auto">
                  <div className="relative">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-[#be9227]/40 shadow-xl"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#be9227] text-white p-1 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{item.name}</h3>
                    <p className="text-sm text-[#be9227] font-medium mt-0.5">{item.role}</p>
                    <p className="text-xs text-white/50 font-normal mt-1 flex items-center gap-1">
                      <span>Verified Student</span>
                      <span>•</span>
                      <span>{item.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── FOOTER TRUST STATEMENT ──
          <div className="mt-16 text-center">
            <p className="text-sm text-white/60 font-light">
              Join thousands of practitioners experiencing conscious healing daily.{' '}
              <a
                href="/stories"
                className="text-[#be9227] font-semibold underline underline-offset-4 hover:text-white transition-colors"
              >
                Read all student reviews →
              </a>
            </p>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
