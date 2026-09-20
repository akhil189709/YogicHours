'use client';

import { useEffect, useMemo, useState } from 'react';
import { formatDuration } from '@/utils/wellness';

// MET (metabolic equivalent) scales with pace; a reasonable jogging default.
const RUNNING_MET = 9.8;

const RunningTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);
  const [distance, setDistance] = useState('5');
  const [weight, setWeight] = useState('65');

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setSeconds((current) => current + 1), 1000);
    return () => window.clearInterval(timer);
  }, [active]);

  const calories = useMemo(() => {
    const hours = seconds / 3600;
    const kg = Number(weight) || 0;
    return Math.round(RUNNING_MET * kg * hours);
  }, [seconds, weight]);

  const pace = useMemo(() => {
    const km = Number(distance);
    if (!km || seconds === 0) return '—';
    const minutesPerKm = seconds / 60 / km;
    const mins = Math.floor(minutesPerKm);
    const secs = Math.round((minutesPerKm - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')} /km`;
  }, [distance, seconds]);

  return (
    <div>
      <h3 className="text-2xl font-bold text-[#143024]">Running Timer &amp; Calories</h3>
      <p className="mt-2 text-sm text-[#143024]/60">
        Track run time, pace, and an estimated calorie burn based on your weight.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-[#143024]/80">
          <span>Distance (km)</span>
          <input
            type="number"
            value={distance}
            onChange={(event) => setDistance(event.target.value)}
            className="w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:ring-2 focus:ring-[#be9227]/20"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-[#143024]/80">
          <span>Weight (kg)</span>
          <input
            type="number"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            className="w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:ring-2 focus:ring-[#be9227]/20"
          />
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-[#143024]/10 bg-[#143024] px-6 py-8 text-center">
        <p className="font-mono text-5xl font-bold tabular-nums text-white">
          {Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0')}
          :{(seconds % 60).toString().padStart(2, '0')}
        </p>
        <p className="mt-1 text-xs uppercase tracking-widest text-white/50">
          {formatDuration(seconds)}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => setActive(true)}
          disabled={active}
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
            setSeconds(0);
          }}
          className="rounded-full border border-[#143024]/20 px-6 py-3 text-sm font-semibold text-[#143024] transition hover:bg-[#143024]/5"
        >
          Reset
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#143024]/10 bg-[#143024]/[0.03] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#143024]/50">Pace</p>
          <p className="mt-1 text-xl font-bold text-[#143024]">{pace}</p>
        </div>
        <div className="rounded-2xl border border-[#be9227]/20 bg-[#be9227]/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8a6a1c]">
            Calories burned
          </p>
          <p className="mt-1 text-xl font-bold text-[#8a6a1c]">{calories} kcal</p>
        </div>
      </div>
    </div>
  );
};

export default RunningTimer;
