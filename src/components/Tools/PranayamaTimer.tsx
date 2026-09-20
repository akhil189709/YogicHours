'use client';

import { useEffect, useMemo, useState } from 'react';

type Mode = 'pranayama' | 'asana';

const MODE_PRESETS: Record<Mode, number[]> = {
  pranayama: [3, 5, 7, 10, 15],
  asana: [1, 2, 3, 5],
};

const PranayamaTimer = () => {
  const [mode, setMode] = useState<Mode>('pranayama');
  const [duration, setDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const presets = MODE_PRESETS[mode];
    const nextDuration = presets.includes(duration) ? duration : presets[0];
    setDuration(nextDuration);
    setTimeLeft(nextDuration * 60);
    setActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (!active) return;
    if (timeLeft <= 0) {
      setActive(false);
      return;
    }
    const timer = window.setInterval(() => setTimeLeft((current) => current - 1), 1000);
    return () => window.clearInterval(timer);
  }, [active, timeLeft]);

  const progress = useMemo(() => {
    const total = duration * 60;
    if (!total) return 0;
    return Math.round(((total - timeLeft) / total) * 100);
  }, [duration, timeLeft]);

  return (
    <div>
      <h3 className="text-2xl font-bold text-[#143024]">Pranayama &amp; Asana Hold Timer</h3>
      <p className="mt-2 text-sm text-[#143024]/60">
        Practice timed breathing cycles or hold a posture with a calm visual guide.
      </p>

      <div className="mt-6 inline-flex rounded-full border border-[#143024]/15 bg-[#143024]/[0.03] p-1">
        {(
          [
            ['pranayama', 'Pranayama Breathing'],
            ['asana', 'Asana Hold'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            onClick={() => setMode(value)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              mode === value
                ? 'bg-[#143024] text-white shadow'
                : 'text-[#143024]/60 hover:text-[#143024]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full border-4 border-[#be9227]/20 ${active ? 'animate-pulse' : ''}`}
          />
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#14302410" strokeWidth="6" />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#be9227"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 46}
              strokeDashoffset={2 * Math.PI * 46 * (1 - progress / 100)}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="text-center">
            <p className="font-mono text-2xl font-bold text-[#143024]">
              {Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, '0')}
              :{(timeLeft % 60).toString().padStart(2, '0')}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-[#143024]/40">remaining</p>
          </div>
        </div>

        <div>
          <label className="block space-y-2 text-sm font-medium text-[#143024]/80">
            <span>Duration (min)</span>
            <select
              value={duration}
              onChange={(event) => setDuration(Number(event.target.value))}
              className="w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:ring-2 focus:ring-[#be9227]/20"
            >
              {MODE_PRESETS[mode].map((value) => (
                <option key={value} value={value}>
                  {value} minute{value > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </label>
          <p className="mt-3 text-sm text-[#143024]/60">
            {mode === 'pranayama'
              ? 'Sit tall, close your eyes, and follow slow, even inhales and exhales for the full duration.'
              : 'Settle into your posture and hold steady, breathing evenly, until the timer completes.'}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => setActive(true)}
          disabled={active || timeLeft === 0}
          className="rounded-full bg-[#be9227] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a67e1f] disabled:opacity-40"
        >
          Start
        </button>
        <button
          onClick={() => setActive(false)}
          className="rounded-full border border-[#143024]/20 px-6 py-3 text-sm font-semibold text-[#143024] transition hover:bg-[#143024]/5"
        >
          Pause
        </button>
        <button
          onClick={() => {
            setActive(false);
            setTimeLeft(duration * 60);
          }}
          className="rounded-full border border-[#143024]/20 px-6 py-3 text-sm font-semibold text-[#143024] transition hover:bg-[#143024]/5"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PranayamaTimer;
