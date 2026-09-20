'use client';

import React from 'react';
import Link from 'next/link';

interface ToolItem {
  title: string;
  description: string;
  badge: string;
  icon: React.ReactNode;
  href?: string;
}

const tools: ToolItem[] = [
  {
    title: 'BMI Calculator',
    description:
      'Body mass index assessment for healthy weight tracking and personalized fitness planning.',
    badge: 'Fitness',
    href: '/wellness-tools?tool=bmi',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: 'BP & Heart Rate Analyzer',
    description:
      'Quick digital wellness check to monitor your blood pressure ranges and pulse metrics.',
    badge: 'Vitals',
    href: '/wellness-tools?tool=bp-analyzer',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Water Intake Tracker',
    description:
      'Stay optimally hydrated with a smart daily water target based on your physical activity.',
    badge: 'Hydration',
    href: '/wellness-tools?tool=water-tracker',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    title: 'Running Timer + Calories',
    description: 'Accurately time your cardio sessions and compute real-time active energy burn.',
    badge: 'Cardio',
    href: '/wellness-tools?tool=running-timer',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: 'Breathing Capacity Test',
    description: 'Evaluate your lung retention and control with guided breath testing sessions.',
    badge: 'Respiratory',
    href: '/wellness-tools?tool=breathing-test',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Pranayama & Asana Timer',
    description:
      'Structured interval timers for yogic breathing routines and prolonged pose retention.',
    badge: 'Yogic Care',
    href: '/wellness-tools?tool=pranayama-timer',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
];

const WellnessToolsSection = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(190, 146, 39, 0.4);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
        }

        .glass-card:hover .tool-arrow {
          transform: translateX(4px);
          color: #be9227;
        }

        .glass-card:hover .glass-icon-box {
          background: rgba(190, 146, 39, 0.2);
          border-color: rgba(190, 146, 39, 0.4);
          color: #be9227;
        }
      ` }} />

      <section
        className="section-y px-6 md:px-12 relative overflow-hidden bg-[#0f251c] text-white on-dark"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Subtle Ambient Background Lighting Spheres */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#be9227]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#143024] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ── HEADER ── */}
          <div className="mb-16 text-center max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-4 text-xs tracking-[0.25em] uppercase font-bold text-[#be9227] bg-[#be9227]/15 px-4 py-1.5 rounded-full border border-[#be9227]/25 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#be9227] animate-ping" />
              Free Toolkit
            </div>

            <h2 className="display-lg text-white">
              Interactive tools for <br />
              <span className="display-accent-light">better self-care.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-white/70 font-normal leading-relaxed">
              Practical, diagnostic, and habit-building tools engineered to monitor your daily
              vitals, breathing capacity, and physical progress.
            </p>
          </div>

          {/* ── GLASS CARDS GRID ── */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="glass-card rounded-3xl p-8 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Micro Accent Glow on Card Corner */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#be9227]/10 rounded-full blur-xl pointer-events-none transition-all group-hover:bg-[#be9227]/20" />

                <div>
                  {/* Top Header inside Card */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="glass-icon-box w-12 h-12 rounded-2xl bg-white/10 text-white border border-white/15 flex items-center justify-center transition-all duration-300">
                      {tool.icon}
                    </div>

                    <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-white/65 font-normal mb-8">
                    {tool.description}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={tool.href || '/wellness-tools'}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white/90 group-hover:text-[#be9227] transition-colors"
                  >
                    <span>Launch Tool</span>
                    <svg
                      className="tool-arrow w-4 h-4 transition-transform duration-300 text-white/50"
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

                  <span className="text-[10px] uppercase font-bold text-emerald-400/80 tracking-widest">
                    Free
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── BOTTOM CTA BANNER ── */}
          <div className="mt-16 text-center">
            <Link href="/wellness-tools">
              <button className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-[#be9227] px-10 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-[#be9227] hover:shadow-2xl hover:shadow-[#be9227]/30 hover:-translate-y-0.5">
                <span>Explore Full Wellness Toolkit</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WellnessToolsSection;
