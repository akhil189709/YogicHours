// Shared types for the Meditation Space feature.

export type SoundscapeId = 'rain' | 'ocean' | 'forest' | 'bowl';

export interface SoundscapeMeta {
  id: SoundscapeId;
  name: string;
  description: string;
  defaultVolume: number;
}

export type BreathingPatternId = 'box' | 'relaxing' | 'equal';

export type BreathPhaseName = 'Inhale' | 'Hold' | 'Exhale';

export interface BreathPhase {
  name: BreathPhaseName;
  duration: number; // seconds
}

export interface BreathingPattern {
  id: BreathingPatternId;
  label: string;
  description: string;
  phases: BreathPhase[];
}

export type MeditationTabId = 'soundscapes' | 'savasana' | 'breathing' | 'timer';

export interface MeditationTab {
  id: MeditationTabId;
  label: string;
  shortLabel: string;
}
