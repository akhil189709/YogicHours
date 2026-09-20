'use client';

import { useEffect, useState } from 'react';
import type { BreathCue } from './poses';

interface BreathRingProps {
  breathCue: BreathCue;
  /** How long (seconds) this pose — and therefore this breath phase — is held for */
  durationSeconds: number;
  /** Whether the sequence is actively advancing (pauses the animation when false) */
  isActive: boolean;
}

const CUE_COPY: Record<BreathCue, { label: string; hint: string }> = {
  Neutral: { label: 'Settle', hint: 'Breathe naturally' },
  Inhale: { label: 'Inhale', hint: 'Draw breath in slowly' },
  Exhale: { label: 'Exhale', hint: 'Release the breath fully' },
  Hold: { label: 'Hold', hint: 'Steady, even breath' },
};

/**
 * A cinematic breathing ring that expands on Inhale, contracts on Exhale,
 * and pulses gently for Hold / Neutral phases — synced to the current pose's
 * held duration so the motion always matches the pace of practice.
 */
const BreathRing = ({ breathCue, durationSeconds, isActive }: BreathRingProps) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const copy = CUE_COPY[breathCue];
  const animationName =
    breathCue === 'Inhale'
      ? 'breathRingInhale'
      : breathCue === 'Exhale'
        ? 'breathRingExhale'
        : breathCue === 'Hold'
          ? 'breathRingHold'
          : 'breathRingNeutral';

  const clampedDuration = Math.max(2, durationSeconds);

  return (
    <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes breathRingInhale {
          0% { transform: scale(0.72); opacity: 0.55; }
          100% { transform: scale(1); opacity: 0.95; }
        }
        @keyframes breathRingExhale {
          0% { transform: scale(1); opacity: 0.95; }
          100% { transform: scale(0.72); opacity: 0.55; }
        }
        @keyframes breathRingHold {
          0%, 100% { transform: scale(0.96); opacity: 0.85; }
          50% { transform: scale(1.02); opacity: 1; }
        }
        @keyframes breathRingNeutral {
          0%, 100% { transform: scale(0.9); opacity: 0.75; }
          50% { transform: scale(0.96); opacity: 0.9; }
        }
      ` }} />

      {/* Outer glow aura */}
      <div
        className="absolute inset-0 rounded-full bg-[#d4af37]/20 blur-2xl"
        style={{
          animation:
            isActive && !reducedMotion ? `${animationName} ${clampedDuration}s ease-in-out infinite alternate` : 'none',
        }}
      />

      {/* Mid ring */}
      <div
        className="absolute inset-6 rounded-full border border-[#d4af37]/40"
        style={{
          animation:
            isActive && !reducedMotion
              ? `${animationName} ${clampedDuration}s ease-in-out infinite alternate`
              : 'none',
          animationDelay: '0.15s',
        }}
      />

      {/* Core ring */}
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-[#d4af37]/70 bg-white/5 backdrop-blur-sm sm:h-36 sm:w-36">
        <div className="text-center">
          <p className="font-luxury-serif text-2xl italic tracking-wide text-[#f5e2a8] sm:text-3xl">
            {copy.label}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50">{copy.hint}</p>
        </div>
      </div>
    </div>
  );
};

export default BreathRing;
