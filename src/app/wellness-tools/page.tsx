'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { Header, Footer } from '@/components/Common';
import {
  BMICalculator,
  BPAnalyzer,
  WaterTracker,
  RunningTimer,
  PranayamaTimer,
  BreathingCapacityTest,
} from '@/components/Tools';

type ToolCategory = 'all' | 'body' | 'vitals' | 'mind';

const TOOLS = [
  {
    id: 'bmi',
    name: 'BMI Calculator',
    component: <BMICalculator />,
    category: 'body',
    icon: '⚖️',
    badge: 'Body Composition',
  },
  {
    id: 'bp-analyzer',
    name: 'BP & Heart Rate Analyzer',
    component: <BPAnalyzer />,
    category: 'vitals',
    icon: '❤️',
    badge: 'Cardiovascular',
  },
  {
    id: 'water-tracker',
    name: 'Hydration Tracker',
    component: <WaterTracker />,
    category: 'body',
    icon: '💧',
    badge: 'Daily Intake',
  },
  {
    id: 'running-timer',
    name: 'Pacing & Run Timer',
    component: <RunningTimer />,
    category: 'vitals',
    icon: '🏃‍♂️',
    badge: 'Endurance',
  },
  {
    id: 'breathing-test',
    name: 'Breathing Capacity Test',
    component: <BreathingCapacityTest />,
    category: 'mind',
    icon: '🫁',
    badge: 'Respiratory',
  },
  {
    id: 'pranayama-timer',
    name: 'Pranayama & Asana Hold Timer',
    component: <PranayamaTimer />,
    category: 'mind',
    icon: '🧘‍♀️',
    badge: 'Breath Control',
  },
] as const;

const WellnessToolsPageInner = () => {
  const [activeTab, setActiveTab] = useState<ToolCategory>('all');
  const [highlightedTool, setHighlightedTool] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const toolRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lenis = useLenis();

  useEffect(() => {
    const requested = searchParams.get('tool');
    if (!requested) return;
    const match = TOOLS.find((tool) => tool.id === requested);
    if (!match) return;
    setActiveTab('all');
    setHighlightedTool(requested);
    requestAnimationFrame(() => {
      const target = toolRefs.current[requested];
      if (!target) return;
      // Go through Lenis when it is running — a native smooth scroll would be
      // fought by Lenis' own rAF loop and stutter.
      if (lenis) {
        lenis.scrollTo(target, { offset: -window.innerHeight / 2 + target.offsetHeight / 2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    const timeout = setTimeout(() => setHighlightedTool(null), 2600);
    return () => clearTimeout(timeout);
  }, [searchParams, lenis]);

  const filteredTools = useMemo(
    () => (activeTab === 'all' ? TOOLS : TOOLS.filter((tool) => tool.category === activeTab)),
    [activeTab]
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes breatheGlow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(255, 94, 26, 0.2);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes floatPerson {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }

        @keyframes sweepClock {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .tool-card {
          transition:
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tool-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 94, 26, 0.4);
          box-shadow: 0 25px 50px -12px rgba(20, 48, 36, 0.15);
        }

        .animated-breathe-ring {
          animation: breatheGlow 6s ease-in-out infinite;
        }

        .floating-avatar {
          animation: floatPerson 4s ease-in-out infinite;
        }

        .clock-second-hand {
          transform-origin: bottom center;
          animation: sweepClock 60s linear infinite;
        }
      ` }} />

      <main
        className="min-h-screen bg-[#f8faf9] text-[#143024]"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <Header />

        {/* ── HERO HEADER BANNER ── */}
        <section className="relative py-24 px-6 sm:px-12 bg-[#143024] text-white overflow-hidden">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#be9227]/15 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10 grid gap-10 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-bold text-[#be9227] bg-[#be9227]/15 px-4 py-1.5 rounded-full border border-[#be9227]/25 backdrop-blur-md mb-6">
                <span className="w-2 h-2 rounded-full bg-[#be9227] animate-pulse" />
                Precision Diagnostics & Timers
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Track your body, <br />
                <span className="italic font-light text-[#be9227]">breath, and vitals.</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-xl">
                A unified suite of clinical-grade digital meters, timers, and trackers engineered to
                measure your physical progress and daily mindfulness routines.
              </p>
            </div>

            {/* Right Hero Visual: Animated Clock & Avatar Component */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-2 border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center p-6 animated-breathe-ring">
                {/* Clock Face Markers */}
                <div className="absolute inset-4 rounded-full border border-dashed border-white/20" />

                {/* Clock Hands Illustration */}
                <div className="absolute w-1 h-24 bg-gradient-to-t from-[#be9227] to-amber-300 rounded-full top-12 left-[calc(50%-2px)] clock-second-hand shadow-lg" />
                <div className="absolute w-2 h-16 bg-white/80 rounded-full top-20 left-[calc(50%-4px)] shadow-md" />

                {/* Floating Person Silhouette Avatar */}
                <div className="floating-avatar text-center z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-tr from-[#be9227] to-amber-400 p-0.5 shadow-xl">
                    <div className="w-full h-full rounded-full bg-[#143024] flex items-center justify-center text-2xl sm:text-3xl">
                      🧘‍♀️
                    </div>
                  </div>
                  <span className="mt-3 block text-xs font-bold uppercase tracking-widest text-white/90">
                    Live Session Active
                  </span>
                  <span className="text-[10px] text-[#be9227] font-mono">16:8 Breath Cadence</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TOOL FILTER TABS ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-7 relative z-20">
          <div className="bg-white rounded-2xl border border-[#143024]/10 p-2 shadow-xl flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full sm:w-auto p-1">
              {[
                { id: 'all', label: 'All Instruments' },
                { id: 'body', label: 'Body & Hydration' },
                { id: 'vitals', label: 'Cardio & Vitals' },
                { id: 'mind', label: 'Mind & Pranayama' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ToolCategory)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#143024] text-white shadow-md'
                      : 'text-[#143024]/70 hover:bg-[#143024]/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2 px-4 text-xs font-semibold text-[#143024]/50 border-l border-[#143024]/10">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {TOOLS.length} Interactive Tools Available
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE TOOLS DISPLAY GRID ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-2">
            {filteredTools.map((tool, index) => (
              <div
                key={tool.id}
                ref={(el) => {
                  toolRefs.current[tool.id] = el;
                }}
                className={`tool-card rounded-3xl bg-white border p-6 sm:p-8 shadow-xs relative overflow-hidden flex flex-col justify-between ${
                  highlightedTool === tool.id
                    ? 'border-[#be9227] ring-4 ring-[#be9227]/20'
                    : 'border-[#143024]/10'
                } ${
                  tool.category === 'mind'
                    ? 'lg:col-span-2 bg-gradient-to-br from-white via-white to-amber-500/5'
                    : ''
                }`}
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#143024]/5">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-[#143024]/5 border border-[#143024]/10 flex items-center justify-center text-xl shrink-0">
                      {tool.icon}
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-[#143024]">{tool.name}</h2>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#be9227]">
                        {tool.badge}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#143024]/5 text-[#143024]/60">
                    Tool 0{index + 1}
                  </span>
                </div>

                {/* Embedded Interactive Component */}
                <div className="relative z-10">{tool.component}</div>

                {/* Card Footer Micro Bar */}
                <div className="mt-8 pt-4 border-t border-[#143024]/5 flex items-center justify-between text-xs text-[#143024]/40 font-medium">
                  <span>Interactive Real-time Feedback</span>
                  <span className="flex items-center gap-1 text-[#be9227] font-bold">
                    Active Module
                    <svg
                      className="w-3.5 h-3.5"
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
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

const WellnessToolsPage = () => (
  <Suspense fallback={null}>
    <WellnessToolsPageInner />
  </Suspense>
);

export default WellnessToolsPage;
