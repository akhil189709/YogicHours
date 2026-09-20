'use client';

import { useEffect, useRef, useState } from 'react';
import { calculateCaloriesBurned, formatDuration } from '@/utils/wellness';
import BreathRing from './BreathRing';
import { SPEED_PRESETS, SURYA_NAMASKAR_POSES, TOTAL_POSES, type SpeedPreset } from './poses';

type FullscreenCapableElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>;
};

type FullscreenCapableDocument = Document & {
  webkitExitFullscreen?: () => Promise<void>;
  webkitFullscreenElement?: Element | null;
};

const TICK_MS = 100;

const SuryaNamaskarTracker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedPreset, setSpeedPreset] = useState<SpeedPreset | 'custom'>('medium');
  const [secondsPerPose, setSecondsPerPose] = useState<number>(SPEED_PRESETS.medium);
  const [progress, setProgress] = useState(0);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [justCompletedRound, setJustCompletedRound] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [weightKg, setWeightKg] = useState(65);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const elapsedRef = useRef(0);
  const practiceRef = useRef<HTMLDivElement>(null);

  const pose = SURYA_NAMASKAR_POSES[currentIndex];

  const goToNextPose = () => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % TOTAL_POSES;
      if (next === 0) {
        setRoundsCompleted((r) => r + 1);
        setJustCompletedRound(true);
      }
      return next;
    });
  };

  const goToPrevPose = () => {
    setCurrentIndex((prev) => (prev - 1 + TOTAL_POSES) % TOTAL_POSES);
  };

  const jumpToPose = (index: number) => {
    setCurrentIndex(index);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setRoundsCompleted(0);
    setSessionSeconds(0);
    setProgress(0);
  };

  // Auto-advance timer — restarts fresh whenever a new pose begins (auto or manual).
  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
    if (!isPlaying) return;

    const id = window.setInterval(() => {
      elapsedRef.current += TICK_MS;
      const targetMs = secondsPerPose * 1000;
      setProgress(Math.min(1, elapsedRef.current / targetMs));
      setSessionSeconds((s) => s + TICK_MS / 1000);

      if (elapsedRef.current >= targetMs) {
        window.clearInterval(id);
        goToNextPose();
      }
    }, TICK_MS);

    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, secondsPerPose, currentIndex]);

  // Clear the "round complete" celebration banner after a moment.
  useEffect(() => {
    if (!justCompletedRound) return;
    const t = window.setTimeout(() => setJustCompletedRound(false), 2600);
    return () => window.clearTimeout(t);
  }, [justCompletedRound]);

  // Voice guidance — speaks the pose name and mantra whenever the pose changes, if enabled.
  useEffect(() => {
    if (!voiceEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `${pose.englishName}. ${pose.sanskritName}. ${pose.mantra}.`
    );
    utterance.rate = 0.92;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentIndex, voiceEnabled, pose.englishName, pose.sanskritName, pose.mantra]);

  useEffect(() => {
    if (!voiceEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [voiceEnabled]);

  // Fullscreen practice mode
  useEffect(() => {
    const handler = () => {
      const doc = document as FullscreenCapableDocument;
      setIsFullscreen(Boolean(document.fullscreenElement || doc.webkitFullscreenElement));
    };
    document.addEventListener('fullscreenchange', handler);
    document.addEventListener('webkitfullscreenchange', handler);
    return () => {
      document.removeEventListener('fullscreenchange', handler);
      document.removeEventListener('webkitfullscreenchange', handler);
    };
  }, []);

  const toggleFullscreen = async () => {
    const el = practiceRef.current as FullscreenCapableElement | null;
    const doc = document as FullscreenCapableDocument;
    if (!el) return;

    try {
      const activeFullscreenElement = document.fullscreenElement || doc.webkitFullscreenElement;
      if (!activeFullscreenElement) {
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
        }
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
      }
    } catch {
      // Fullscreen unsupported or blocked — practice remains fully usable inline.
    }
  };

  const handleSpeedPreset = (preset: SpeedPreset) => {
    setSpeedPreset(preset);
    setSecondsPerPose(SPEED_PRESETS[preset]);
  };

  const handleCustomSpeed = (value: number) => {
    setSpeedPreset('custom');
    setSecondsPerPose(value);
  };

  const avgRoundMinutes = (secondsPerPose * TOTAL_POSES) / 60;
  const effectiveRounds = roundsCompleted + currentIndex / TOTAL_POSES;
  const estimatedCalories = calculateCaloriesBurned(effectiveRounds, avgRoundMinutes, weightKg);

  return (
    <div className="font-modern-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes snCelebrate {
          0% { opacity: 0; transform: translateY(8px) scale(0.96); }
          12%, 82% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-8px) scale(0.96); }
        }
        .sn-celebrate {
          animation: snCelebrate 2.6s ease-in-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .sn-celebrate { animation: none; }
        }
      ` }} />

      {/* ── IMMERSIVE PRACTICE PANEL (fullscreen-capable) ── */}
      <div
        ref={practiceRef}
        className={`relative overflow-hidden rounded-3xl bg-[#081b11] text-white ${
          isFullscreen ? 'flex h-full min-h-screen w-full flex-col justify-center p-6 sm:p-10' : 'p-6 sm:p-10'
        }`}
      >
        {/* Ambient gold/emerald orbs */}
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#be9227]/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">
          {/* Top bar: pose counter + fullscreen toggle */}
          <div className="flex w-full items-center justify-between">
            <div className="divine-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100/90">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
              Pose {pose.step} of {TOTAL_POSES}
            </div>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="divine-btn-secondary rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-100 transition-all duration-300"
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Practice'}
            </button>
          </div>

          {/* Pose timeline dots */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {SURYA_NAMASKAR_POSES.map((p, i) => (
              <button
                key={`${p.step}-${p.englishName}`}
                type="button"
                onClick={() => jumpToPose(i)}
                aria-label={`Go to pose ${p.step}: ${p.englishName}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-7 bg-[#d4af37]'
                    : i < currentIndex
                      ? 'w-2.5 bg-[#d4af37]/50'
                      : 'w-2.5 bg-white/15'
                }`}
              />
            ))}
          </div>

          {/* Breath ring + pose name */}
          <div className="mt-10 flex flex-col items-center">
            <BreathRing breathCue={pose.breathCue} durationSeconds={secondsPerPose} isActive={isPlaying} />

            <h2 className="mt-8 text-center font-luxury-serif text-4xl font-light italic text-white sm:text-5xl">
              {pose.englishName}
            </h2>
            <p className="gold-shimmer-text mt-1 text-center font-luxury-serif text-xl sm:text-2xl">
              {pose.sanskritName}
            </p>

            <p className="mt-5 max-w-xl text-center text-sm leading-relaxed text-slate-300/85 sm:text-base">
              {pose.cue}
            </p>

            {/* Mantra */}
            <div className="divine-glass mt-6 w-full max-w-md rounded-2xl px-6 py-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/80">Sanskrit Mantra</p>
              <p className="mt-2 font-luxury-serif text-lg text-amber-100 sm:text-xl">{pose.mantra}</p>
              <p className="mt-1 text-xs italic text-slate-400">{pose.mantraMeaning}</p>
            </div>
          </div>

          {/* Progress bar for current pose hold */}
          <div className="mt-8 h-1 w-full max-w-md overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-amber-200"
              style={{ width: `${progress * 100}%`, transition: isPlaying ? 'width 100ms linear' : 'none' }}
            />
          </div>

          {/* Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={goToPrevPose}
              className="divine-btn-secondary rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-100 transition-all duration-300"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="divine-btn-primary rounded-full px-8 py-3 text-xs font-bold uppercase tracking-widest text-[#0a120e] transition-all duration-300"
            >
              {isPlaying ? 'Pause' : 'Start'}
            </button>
            <button
              type="button"
              onClick={goToNextPose}
              className="divine-btn-secondary rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-100 transition-all duration-300"
            >
              Next
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-white/15 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-300 transition-all duration-300 hover:border-[#d4af37]/50 hover:text-white"
            >
              Reset
            </button>
          </div>

          {/* Voice toggle */}
          <button
            type="button"
            onClick={() => setVoiceEnabled((v) => !v)}
            className="mt-6 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs text-slate-300 divine-pill transition-all duration-300 hover:bg-white/10"
          >
            <span
              className={`h-2 w-2 rounded-full ${voiceEnabled ? 'bg-[#d4af37] animate-pulse' : 'bg-white/30'}`}
            />
            <span className="uppercase tracking-widest font-semibold text-amber-100/80">
              Voice Guidance {voiceEnabled ? 'On' : 'Off'}
            </span>
          </button>

          {/* Round-complete celebration */}
          {justCompletedRound && (
            <div className="sn-celebrate mt-6 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-6 py-2 text-center text-sm font-semibold text-amber-100">
              Round {roundsCompleted} complete — beginning the next round
            </div>
          )}
        </div>
      </div>

      {/* ── SESSION STATS: speed, calories, rounds ── */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* Speed control */}
        <div className="glass-card rounded-3xl border border-[#143024]/10 bg-white p-6">
          <h3 className="text-lg font-bold text-[#143024]">Pace of Practice</h3>
          <p className="mt-1 text-sm text-[#143024]/60">
            Choose how long each pose is held before the sequence advances.
          </p>

          <div className="mt-5 inline-flex flex-wrap rounded-full border border-[#143024]/15 bg-[#143024]/[0.03] p-1">
            {(['slow', 'medium', 'fast'] as SpeedPreset[]).map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleSpeedPreset(preset)}
                className={`rounded-full px-4 py-2 text-xs font-semibold capitalize transition ${
                  speedPreset === preset
                    ? 'bg-[#143024] text-white shadow'
                    : 'text-[#143024]/60 hover:text-[#143024]'
                }`}
              >
                {preset} · {SPEED_PRESETS[preset]}s
              </button>
            ))}
          </div>

          <div className="mt-5">
            <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#143024]/60">
              <span>Custom: seconds per pose</span>
              <span className="font-mono text-[#be9227]">{secondsPerPose}s</span>
            </label>
            <input
              type="range"
              min={3}
              max={20}
              step={1}
              value={secondsPerPose}
              onChange={(e) => handleCustomSpeed(Number(e.target.value))}
              className="mt-2 w-full accent-[#be9227]"
            />
          </div>

          <p className="mt-5 text-xs text-[#143024]/50">
            Session time elapsed: <span className="font-semibold text-[#143024]">{formatDuration(Math.round(sessionSeconds))}</span>
          </p>
        </div>

        {/* Round counter */}
        <div className="glass-card rounded-3xl border border-[#143024]/10 bg-white p-6">
          <h3 className="text-lg font-bold text-[#143024]">Rounds This Session</h3>
          <p className="mt-1 text-sm text-[#143024]/60">
            One round is a full cycle through all {TOTAL_POSES} poses.
          </p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-luxury-serif text-6xl font-semibold text-[#143024]">{roundsCompleted}</span>
            <span className="mb-2 text-sm text-[#143024]/50">completed</span>
          </div>

          <p className="mt-4 text-xs text-[#143024]/50">
            Currently on pose {pose.step} of {TOTAL_POSES} in round {roundsCompleted + 1}.
          </p>
        </div>

        {/* Calorie tracker */}
        <div className="glass-card rounded-3xl border border-[#143024]/10 bg-white p-6">
          <h3 className="text-lg font-bold text-[#143024]">Calorie Tracker</h3>
          <p className="mt-1 text-sm text-[#143024]/60">
            Estimated using a Surya Namaskar MET of 4.0, scaled to your body weight.
          </p>

          <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-[#143024]/60">
            Your weight (kg)
            <input
              type="number"
              min={30}
              max={200}
              value={weightKg}
              onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value) || 0))}
              className="mt-2 w-full rounded-2xl border border-[#143024]/15 px-4 py-3 text-sm text-[#143024] focus:border-[#be9227] focus:ring-2 focus:ring-[#be9227]/20"
            />
          </label>

          <div className="mt-5 flex items-end gap-2">
            <span className="font-luxury-serif text-5xl font-semibold text-[#be9227]">{estimatedCalories}</span>
            <span className="mb-1.5 text-sm text-[#143024]/50">kcal burned</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuryaNamaskarTracker;
