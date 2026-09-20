'use client';

import { useEffect, useState } from 'react';
import { calculateBreathingCapacity } from '@/utils/wellness';

const TEST_DURATIONS = [30, 60];

type Phase = 'idle' | 'running' | 'done';

const capacityLabel = (capacity: number) => {
  if (capacity >= 110) return { label: 'Elevated breath rate', tone: 'text-amber-700 bg-amber-50 border-amber-200' };
  if (capacity >= 85) return { label: 'Within normal range', tone: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  return { label: 'Calm, controlled breathing', tone: 'text-sky-700 bg-sky-50 border-sky-200' };
};

const BreathingCapacityTest = () => {
  const [testDuration, setTestDuration] = useState(30);
  const [timeLeft, setTimeLeft] = useState(testDuration);
  const [phase, setPhase] = useState<Phase>('idle');
  const [breathCount, setBreathCount] = useState(0);

  useEffect(() => {
    if (phase !== 'idle') return;
    setTimeLeft(testDuration);
  }, [testDuration, phase]);

  useEffect(() => {
    if (phase !== 'running') return;
    if (timeLeft <= 0) {
      setPhase('done');
      return;
    }
    const timer = window.setInterval(() => setTimeLeft((current) => current - 1), 1000);
    return () => window.clearInterval(timer);
  }, [phase, timeLeft]);

  const startTest = () => {
    setBreathCount(0);
    setTimeLeft(testDuration);
    setPhase('running');
  };

  const resetTest = () => {
    setPhase('idle');
    setBreathCount(0);
    setTimeLeft(testDuration);
  };

  const capacity =
    phase === 'done' ? calculateBreathingCapacity(breathCount, testDuration) : null;
  const result = capacity !== null ? capacityLabel(capacity) : null;

  return (
    <div>
      <h3 className="text-2xl font-bold text-[#143024]">Breathing Capacity Test</h3>
      <p className="mt-2 text-sm text-[#143024]/60">
        Breathe naturally and tap the button once for every exhale. We&apos;ll compare your rate
        to a normal resting baseline of 12 breaths/minute.
      </p>

      {phase === 'idle' && (
        <div className="mt-6">
          <label className="block space-y-2 text-sm font-medium text-[#143024]/80">
            <span>Test length</span>
            <div className="flex gap-2">
              {TEST_DURATIONS.map((value) => (
                <button
                  key={value}
                  onClick={() => setTestDuration(value)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    testDuration === value
                      ? 'bg-[#143024] text-white'
                      : 'border border-[#143024]/15 text-[#143024]/70 hover:bg-[#143024]/5'
                  }`}
                >
                  {value}s
                </button>
              ))}
            </div>
          </label>
          <button
            onClick={startTest}
            className="mt-6 rounded-full bg-[#be9227] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a67e1f]"
          >
            Begin Test
          </button>
        </div>
      )}

      {phase === 'running' && (
        <div className="mt-6 flex flex-col items-center gap-6">
          <p className="font-mono text-4xl font-bold tabular-nums text-[#143024]">{timeLeft}s</p>
          <button
            onClick={() => setBreathCount((c) => c + 1)}
            className="flex h-32 w-32 items-center justify-center rounded-full bg-[#be9227] text-sm font-bold uppercase tracking-wide text-white shadow-lg transition active:scale-95"
          >
            Tap on
            <br />
            exhale
          </button>
          <p className="text-sm text-[#143024]/60">
            Breaths counted: <span className="font-bold text-[#143024]">{breathCount}</span>
          </p>
        </div>
      )}

      {phase === 'done' && capacity !== null && result && (
        <div className="mt-6">
          <div className={`rounded-2xl border px-6 py-5 ${result.tone}`}>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
              Breath rate vs. baseline
            </p>
            <p className="text-3xl font-bold">{capacity}%</p>
            <p className="mt-1 text-sm font-semibold">{result.label}</p>
            <p className="mt-2 text-xs opacity-70">
              {breathCount} breaths in {testDuration}s ≈{' '}
              {Math.round((breathCount / testDuration) * 60)} breaths/min
            </p>
          </div>
          <button
            onClick={resetTest}
            className="mt-4 rounded-full border border-[#143024]/20 px-6 py-3 text-sm font-semibold text-[#143024] transition hover:bg-[#143024]/5"
          >
            Test Again
          </button>
        </div>
      )}
    </div>
  );
};

export default BreathingCapacityTest;
