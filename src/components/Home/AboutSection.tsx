'use client';

import React from 'react';

const AboutSection = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes aboutFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .about-fade > * { animation: aboutFadeUp .6s ease both; }
        .about-fade > *:nth-child(1) { animation-delay: .05s; }
        .about-fade > *:nth-child(2) { animation-delay: .10s; }
        .about-fade > *:nth-child(3) { animation-delay: .15s; }
        .about-fade > *:nth-child(4) { animation-delay: .20s; }
        .about-fade > *:nth-child(5) { animation-delay: .25s; }

        .about-phil-card { transition: transform .25s ease, box-shadow .25s; }
        .about-phil-card:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(20, 48, 36, 0.08); }

        .about-prog-card { transition: transform .25s ease, box-shadow .25s; }
        .about-prog-card:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(190, 146, 39, 0.12); }

        .about-hero-card-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 100px;
          background: rgba(190, 146, 39, 0.15); color: #be9227;
          font-size: .7rem; letter-spacing: .12em; text-transform: uppercase;
          margin-bottom: 1rem; border: 1px solid rgba(190, 146, 39, 0.25);
          font-weight: 600;
        }
      ` }} />

      <section
        className="section-y px-6 md:px-12 relative overflow-hidden"
        style={{ background: '#f8faf9', fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Subtle Background Accent Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#be9227]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#143024]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-screen-xl mx-auto grid gap-12 lg:grid-cols-2 items-center relative z-10">
          {/* ── LEFT COLUMN ── */}
          <div className="about-fade flex flex-col gap-0">
            {/* Eyebrow Tag */}
            <div
              className="inline-flex items-center gap-2 mb-4 text-xs tracking-[.25em] uppercase font-bold"
              style={{ color: '#be9227' }}
            >
              <span className="w-8 h-[2px] rounded-full" style={{ background: '#be9227' }} />
              Our Story
            </div>

            {/* Headline */}
            <h2 className="display-lg mb-5 text-[#143024]">
              A healing practice rooted in{' '}
              <span className="display-accent">wisdom</span> &amp; modern care.
            </h2>

            {/* Body Description */}
            <p className="text-base leading-relaxed mb-6 max-w-lg text-[#143024]/70 font-normal">
              <strong className="font-semibold text-[#143024]">Yogic Hours Yoga</strong> blends
              ancient yoga teachings with evidence-based therapy and modern wellness design—helping
              every student feel energised, centred, and supported through personalized practice.
            </p>

            {/* Attribute Pills */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {[
                { label: 'Evidence-based', dot: '#be9227' },
                { label: 'Trauma-informed', dot: '#143024' },
                { label: 'Holistic care', dot: '#10b981' },
              ].map(({ label, dot }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs"
                  style={{
                    border: '1px solid rgba(20, 48, 36, 0.1)',
                    background: '#ffffff',
                    color: '#143024',
                  }}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dot }} />
                  {label}
                </span>
              ))}
            </div>

            {/* Philosophy & Approach Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Philosophy',
                  body: 'Healing begins with awareness, consistency, and guided transformation from within.',
                  accent: 'linear-gradient(90deg, #be9227, #be9227)',
                },
                {
                  title: 'Approach',
                  body: 'Private care, group energy, breathwork, and mindful technology for measurable wellness.',
                  accent: 'linear-gradient(90deg, #2a503f, #143024)',
                },
              ].map(({ title, body, accent }) => (
                <div
                  key={title}
                  className="about-phil-card rounded-2xl pt-5 pb-6 px-6 relative overflow-hidden shadow-xs"
                  style={{ background: '#ffffff', border: '1px solid rgba(20, 48, 36, 0.08)' }}
                >
                  {/* Top Accent Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[4px]"
                    style={{ background: accent }}
                  />
                  <h3 className="text-base font-bold mt-1 mb-2" style={{ color: '#143024' }}>
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#143024]/70">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-4">
            {/* Hero / Certified Experts Card */}
            <div
              className="rounded-3xl p-8 relative overflow-hidden shadow-xl"
              style={{ background: '#143024' }}
            >
              {/* Decorative Subtle Glowing Circle */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'rgba(190, 146, 39, 0.15)' }}
              />

              <span className="about-hero-card-tag">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Certified Experts
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-3 text-white">
                Advanced Healing Specialists
              </h3>

              <p className="text-sm leading-relaxed mb-6 text-white/70">
                Our instructors hold advanced certifications in yoga therapy, breathwork,
                meditation, and clinical wellness.
              </p>

              <div className="flex flex-wrap gap-2">
                {['Yoga Therapy', 'Breathwork', 'Meditation', 'Clinical Wellness'].map((cert) => (
                  <span
                    key={cert}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Program Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Yoga at Home',
                  body: 'Custom home practice plans tailored for every age and pace.',
                  iconBg: 'rgba(190, 146, 39, 0.1)',
                  iconColor: '#be9227',
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  ),
                },
                {
                  title: 'Therapy Yoga',
                  body: 'Specialized programs for injury recovery and deep stress relief.',
                  iconBg: 'rgba(20, 48, 36, 0.1)',
                  iconColor: '#143024',
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  ),
                },
              ].map(({ title, body, iconBg, iconColor, icon }) => (
                <div
                  key={title}
                  className="about-prog-card rounded-2xl p-6 shadow-xs"
                  style={{ background: '#ffffff', border: '1px solid rgba(20, 48, 36, 0.08)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
                    style={{ background: iconBg, color: iconColor }}
                  >
                    {icon}
                  </div>
                  <h4 className="text-base font-bold mb-1.5" style={{ color: '#143024' }}>
                    {title}
                  </h4>
                  <p className="text-xs leading-relaxed text-[#143024]/65">{body}</p>
                </div>
              ))}
            </div>

            {/* Statistics Strip */}
            <div
              className="rounded-2xl px-6 py-5 flex items-center justify-between gap-2 shadow-xs"
              style={{ background: '#ffffff', border: '1px solid rgba(20, 48, 36, 0.08)' }}
            >
              {[
                { num: '12K+', label: 'Students' },
                { num: '45+', label: 'Experts' },
                { num: '28', label: 'Programs' },
                { num: '8yr', label: 'Practice' },
              ].map(({ num, label }, i, arr) => (
                <React.Fragment key={label}>
                  <div className="text-center flex-1">
                    <div
                      className="text-2xl sm:text-3xl font-extrabold leading-none tracking-tight"
                      style={{ color: '#be9227' }}
                    >
                      {num}
                    </div>
                    <div
                      className="text-[10px] sm:text-xs tracking-wider uppercase font-semibold mt-1"
                      style={{ color: '#143024' }}
                    >
                      {label}
                    </div>
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-8 shrink-0 bg-black/10" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
