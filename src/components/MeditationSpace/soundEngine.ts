// Client-side synthesis engine for the Meditation Space.
//
// No external audio files or CDN media are used anywhere in this module — every
// soundscape (rain / ocean / forest / Tibetan bowl) and the timer bell are generated
// on the fly with the Web Audio API. Nothing here touches `window` or `AudioContext`
// at module scope; every browser API is only ever accessed lazily inside a method
// call, which keeps this file safe to import during SSR.

import type { SoundscapeId } from './types';

interface Voice {
  start: () => void;
  stop: () => void;
  setVolume: (v: number) => void;
  dispose: () => void;
}

interface BowlVoice extends Voice {
  strike: (velocity?: number) => void;
}

const FADE_IN = 1.4;
const FADE_OUT = 0.9;

function rampTo(ctx: AudioContext, param: AudioParam, value: number, seconds: number) {
  const now = ctx.currentTime;
  param.cancelScheduledValues(now);
  param.setValueAtTime(param.value, now);
  param.linearRampToValueAtTime(value, now + seconds);
}

/** A short, seamless-enough loopable buffer of white noise. */
function createNoiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  // Gentle fade at the seam so the loop point doesn't click.
  const fadeSamples = Math.min(length / 8, ctx.sampleRate * 0.25);
  for (let i = 0; i < fadeSamples; i++) {
    const mult = i / fadeSamples;
    data[i] *= mult;
    data[length - 1 - i] *= mult;
  }
  return buffer;
}

// ── Rain: steady lowpass-filtered noise with a faint desynced high shimmer ──
function createRainVoice(ctx: AudioContext, master: GainNode): Voice {
  const out = ctx.createGain();
  out.gain.value = 0;
  out.connect(master);

  const buffer = createNoiseBuffer(ctx, 6);
  let body: AudioBufferSourceNode | null = null;
  let shimmer: AudioBufferSourceNode | null = null;
  let target = 0.6;
  let playing = false;

  function build() {
    body = ctx.createBufferSource();
    body.buffer = buffer;
    body.loop = true;
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 2100;
    lowpass.Q.value = 0.5;
    body.connect(lowpass);
    lowpass.connect(out);
    body.start();

    shimmer = ctx.createBufferSource();
    shimmer.buffer = buffer;
    shimmer.loop = true;
    shimmer.playbackRate.value = 1.31; // desync from the body loop
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 7200;
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.16;
    shimmer.connect(highpass);
    highpass.connect(shimmerGain);
    shimmerGain.connect(out);
    shimmer.start();
  }

  return {
    start() {
      if (playing) return;
      playing = true;
      if (!body) build();
      rampTo(ctx, out.gain, target, FADE_IN);
    },
    stop() {
      if (!playing) return;
      playing = false;
      rampTo(ctx, out.gain, 0, FADE_OUT);
      const b = body;
      const s = shimmer;
      body = null;
      shimmer = null;
      setTimeout(
        () => {
          try {
            b?.stop();
          } catch {
            /* already stopped */
          }
          try {
            s?.stop();
          } catch {
            /* already stopped */
          }
        },
        FADE_OUT * 1000 + 150
      );
    },
    setVolume(v: number) {
      target = v;
      if (playing) rampTo(ctx, out.gain, v, 0.35);
    },
    dispose() {
      try {
        body?.stop();
      } catch {
        /* noop */
      }
      try {
        shimmer?.stop();
      } catch {
        /* noop */
      }
      out.disconnect();
    },
  };
}

// ── Ocean: lowpass noise with a slow LFO "swell" on both level and filter cutoff ──
function createOceanVoice(ctx: AudioContext, master: GainNode): Voice {
  const out = ctx.createGain();
  out.gain.value = 0;
  out.connect(master);

  const buffer = createNoiseBuffer(ctx, 6);
  let body: AudioBufferSourceNode | null = null;
  let lfo: OscillatorNode | null = null;
  let target = 0.6;
  let playing = false;

  function build() {
    body = ctx.createBufferSource();
    body.buffer = buffer;
    body.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 650;
    filter.Q.value = 0.4;

    const waveGain = ctx.createGain();
    waveGain.gain.value = 0.6;

    body.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(out);

    lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.13; // ~ one "wave" every 7-8 seconds

    const levelDepth = ctx.createGain();
    levelDepth.gain.value = 0.32;
    lfo.connect(levelDepth);
    levelDepth.connect(waveGain.gain);

    const filterDepth = ctx.createGain();
    filterDepth.gain.value = 220; // Hz of cutoff sweep
    lfo.connect(filterDepth);
    filterDepth.connect(filter.frequency);

    body.start();
    lfo.start();
  }

  return {
    start() {
      if (playing) return;
      playing = true;
      if (!body) build();
      rampTo(ctx, out.gain, target, FADE_IN);
    },
    stop() {
      if (!playing) return;
      playing = false;
      rampTo(ctx, out.gain, 0, FADE_OUT);
      const b = body;
      const l = lfo;
      body = null;
      lfo = null;
      setTimeout(
        () => {
          try {
            b?.stop();
          } catch {
            /* noop */
          }
          try {
            l?.stop();
          } catch {
            /* noop */
          }
        },
        FADE_OUT * 1000 + 150
      );
    },
    setVolume(v: number) {
      target = v;
      if (playing) rampTo(ctx, out.gain, v, 0.35);
    },
    dispose() {
      try {
        body?.stop();
      } catch {
        /* noop */
      }
      try {
        lfo?.stop();
      } catch {
        /* noop */
      }
      out.disconnect();
    },
  };
}

// ── Forest: bandpass noise bed plus occasional soft bird-like tonal blips ──
function createForestVoice(ctx: AudioContext, master: GainNode): Voice {
  const out = ctx.createGain();
  out.gain.value = 0;
  out.connect(master);

  const buffer = createNoiseBuffer(ctx, 6);
  let body: AudioBufferSourceNode | null = null;
  let birdTimer: ReturnType<typeof setTimeout> | null = null;
  let target = 0.55;
  let playing = false;

  function playChirp() {
    const now = ctx.currentTime;
    const baseFreq = 1700 + Math.random() * 1500;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.25, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.17);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.13, now + 0.015);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(env);
    env.connect(out);
    osc.start(now);
    osc.stop(now + 0.32);

    if (Math.random() > 0.45) {
      const delay = 0.16 + Math.random() * 0.08;
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq * 1.18, now + delay);
      const env2 = ctx.createGain();
      env2.gain.setValueAtTime(0, now + delay);
      env2.gain.linearRampToValueAtTime(0.1, now + delay + 0.012);
      env2.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.24);
      osc2.connect(env2);
      env2.connect(out);
      osc2.start(now + delay);
      osc2.stop(now + delay + 0.26);
    }
  }

  function scheduleBird() {
    const delay = 2200 + Math.random() * 5200;
    birdTimer = setTimeout(() => {
      if (playing) playChirp();
      scheduleBird();
    }, delay);
  }

  function build() {
    body = ctx.createBufferSource();
    body.buffer = buffer;
    body.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 950;
    filter.Q.value = 0.6;
    const bedGain = ctx.createGain();
    bedGain.gain.value = 0.32;
    body.connect(filter);
    filter.connect(bedGain);
    bedGain.connect(out);
    body.start();
  }

  return {
    start() {
      if (playing) return;
      playing = true;
      if (!body) build();
      rampTo(ctx, out.gain, target, FADE_IN);
      scheduleBird();
    },
    stop() {
      if (!playing) return;
      playing = false;
      if (birdTimer) clearTimeout(birdTimer);
      birdTimer = null;
      rampTo(ctx, out.gain, 0, FADE_OUT);
      const b = body;
      body = null;
      setTimeout(
        () => {
          try {
            b?.stop();
          } catch {
            /* noop */
          }
        },
        FADE_OUT * 1000 + 150
      );
    },
    setVolume(v: number) {
      target = v;
      if (playing) rampTo(ctx, out.gain, v, 0.35);
    },
    dispose() {
      if (birdTimer) clearTimeout(birdTimer);
      try {
        body?.stop();
      } catch {
        /* noop */
      }
      out.disconnect();
    },
  };
}

// ── Tibetan bowl: a handful of detuned partials, struck with a fast-attack /
//    long exponential-decay envelope. Reused (with different params) for the
//    plain meditation-timer bell. ──
const BOWL_PARTIALS = [
  { ratio: 1, gainMul: 1 },
  { ratio: 2.003, gainMul: 0.52 },
  { ratio: 2.995, gainMul: 0.3 },
  { ratio: 4.02, gainMul: 0.17 },
  { ratio: 5.41, gainMul: 0.09 },
];

function strikeTone(
  ctx: AudioContext,
  destination: AudioNode,
  opts: { fundamental: number; decay: number; velocity: number }
) {
  const { fundamental, decay, velocity } = opts;
  const now = ctx.currentTime;

  BOWL_PARTIALS.forEach((partial, i) => {
    const osc = ctx.createOscillator();
    osc.type = i === 0 ? 'sine' : 'triangle';
    osc.frequency.value = fundamental * partial.ratio;
    osc.detune.value = (Math.random() - 0.5) * 6;

    const env = ctx.createGain();
    const peak = velocity * partial.gainMul * 0.45;
    const partialDecay = decay * (0.55 + partial.gainMul * 0.45);
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(peak, now + 0.018 + i * 0.008);
    env.gain.exponentialRampToValueAtTime(0.0001, now + partialDecay);

    osc.connect(env);
    env.connect(destination);
    osc.start(now);
    osc.stop(now + partialDecay + 0.5);
  });
}

function createBowlVoice(ctx: AudioContext, master: GainNode): BowlVoice {
  const out = ctx.createGain();
  out.gain.value = 0.7;
  out.connect(master);

  let loopTimer: ReturnType<typeof setTimeout> | null = null;
  let playing = false;

  function loop() {
    strikeTone(ctx, out, { fundamental: 196, decay: 11, velocity: 0.9 });
    const next = 13000 + Math.random() * 6000;
    loopTimer = setTimeout(loop, next);
  }

  return {
    start() {
      if (playing) return;
      playing = true;
      loop();
    },
    stop() {
      if (!playing) return;
      playing = false;
      if (loopTimer) clearTimeout(loopTimer);
      loopTimer = null;
    },
    setVolume(v: number) {
      out.gain.value = v;
    },
    strike(velocity = 0.9) {
      strikeTone(ctx, out, { fundamental: 196, decay: 11, velocity });
    },
    dispose() {
      if (loopTimer) clearTimeout(loopTimer);
      out.disconnect();
    },
  };
}

function buildVoice(id: SoundscapeId, ctx: AudioContext, master: GainNode): Voice {
  switch (id) {
    case 'rain':
      return createRainVoice(ctx, master);
    case 'ocean':
      return createOceanVoice(ctx, master);
    case 'forest':
      return createForestVoice(ctx, master);
    case 'bowl':
      return createBowlVoice(ctx, master);
  }
}

/**
 * Owns a single lazily-created AudioContext for the whole Meditation Space page.
 * Nothing in the constructor touches the browser — the context is only created
 * the first time `ensureContext()` runs, which only ever happens from a user
 * gesture (a play / strike / start button handler), satisfying autoplay policies.
 */
export class MeditationAudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private voices: Partial<Record<SoundscapeId, Voice>> = {};

  private ensureContext(): { ctx: AudioContext; master: GainNode } {
    if (typeof window === 'undefined') {
      throw new Error('Audio engine is only available in the browser.');
    }
    if (!this.ctx) {
      const AudioCtor: typeof AudioContext =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtor();
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -24;
      compressor.knee.value = 28;
      compressor.ratio.value = 6;
      compressor.attack.value = 0.02;
      compressor.release.value = 0.3;
      compressor.connect(ctx.destination);

      const master = ctx.createGain();
      master.gain.value = 1;
      master.connect(compressor);

      this.ctx = ctx;
      this.master = master;
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return { ctx: this.ctx, master: this.master! };
  }

  private getVoice(id: SoundscapeId): Voice {
    if (!this.voices[id]) {
      const { ctx, master } = this.ensureContext();
      this.voices[id] = buildVoice(id, ctx, master);
    } else {
      // Make sure a previously-suspended context resumes on renewed interaction.
      this.ensureContext();
    }
    return this.voices[id]!;
  }

  setPlaying(id: SoundscapeId, playing: boolean) {
    const voice = this.getVoice(id);
    if (playing) voice.start();
    else voice.stop();
  }

  setVolume(id: SoundscapeId, volume: number) {
    const voice = this.getVoice(id);
    voice.setVolume(volume);
  }

  /** Manual "strike the bowl" tap — works even if the bowl ambience loop is off. */
  strikeBowl(velocity = 0.9) {
    const voice = this.getVoice('bowl') as BowlVoice;
    voice.strike(velocity);
  }

  /** Soft start/end bell for the meditation timer, built from the same technique. */
  playBell(velocity = 0.65) {
    const { ctx, master } = this.ensureContext();
    strikeTone(ctx, master, { fundamental: 528, decay: 4.5, velocity });
  }

  dispose() {
    Object.values(this.voices).forEach((voice) => voice?.dispose());
    this.voices = {};
    if (this.ctx) {
      const ctx = this.ctx;
      this.ctx = null;
      this.master = null;
      void ctx.close().catch(() => {
        /* already closed */
      });
    }
  }
}
