// Traditional 12-step Surya Namaskar (Sun Salutation) sequence.
// Pose order, Sanskrit names, breath cues, and mantras are canonical — do not alter.

export type BreathCue = 'Neutral' | 'Inhale' | 'Exhale' | 'Hold';

export interface SuryaNamaskarPose {
  /** 1-indexed position in the sequence */
  step: number;
  englishName: string;
  sanskritName: string;
  breathCue: BreathCue;
  mantra: string;
  mantraMeaning: string;
  cue: string;
}

export const SURYA_NAMASKAR_POSES: SuryaNamaskarPose[] = [
  {
    step: 1,
    englishName: 'Prayer Pose',
    sanskritName: 'Pranamasana',
    breathCue: 'Neutral',
    mantra: 'Om Mitraya Namaha',
    mantraMeaning: 'Salutations to the Friend of All',
    cue: 'Stand tall at the mat’s edge, palms together at the heart center, breath settled and even.',
  },
  {
    step: 2,
    englishName: 'Raised Arms Pose',
    sanskritName: 'Hasta Uttanasana',
    breathCue: 'Inhale',
    mantra: 'Om Ravaye Namaha',
    mantraMeaning: 'Salutations to the Shining One',
    cue: 'Sweep the arms overhead and arch gently back, lifting the chest toward the sky.',
  },
  {
    step: 3,
    englishName: 'Hand to Foot Pose',
    sanskritName: 'Hasta Padasana',
    breathCue: 'Exhale',
    mantra: 'Om Suryaya Namaha',
    mantraMeaning: 'Salutations to the Sun',
    cue: 'Fold forward from the hips, spine long, hands reaching toward the floor beside the feet.',
  },
  {
    step: 4,
    englishName: 'Equestrian Pose',
    sanskritName: 'Ashwa Sanchalanasana',
    breathCue: 'Inhale',
    mantra: 'Om Bhanave Namaha',
    mantraMeaning: 'Salutations to the One Who Illumines',
    cue: 'Step the right leg back into a low lunge, gaze soft and lifted, chest open.',
  },
  {
    step: 5,
    englishName: 'Plank Pose',
    sanskritName: 'Dandasana',
    breathCue: 'Hold',
    mantra: 'Om Khagaya Namaha',
    mantraMeaning: 'Salutations to the Sky-Mover',
    cue: 'Step the left leg back to meet the right, body in one straight, steady line.',
  },
  {
    step: 6,
    englishName: 'Eight-Limbed Salute',
    sanskritName: 'Ashtanga Namaskara',
    breathCue: 'Exhale',
    mantra: 'Om Pushne Namaha',
    mantraMeaning: 'Salutations to the Nourisher',
    cue: 'Lower knees, chest, and chin to the mat, hips lifted, in gentle eight-point contact.',
  },
  {
    step: 7,
    englishName: 'Cobra Pose',
    sanskritName: 'Bhujangasana',
    breathCue: 'Inhale',
    mantra: 'Om Hiranyagarbhaya Namaha',
    mantraMeaning: 'Salutations to the Golden Cosmic Self',
    cue: 'Slide the chest forward and up, elbows soft, shoulders drawing away from the ears.',
  },
  {
    step: 8,
    englishName: 'Downward-Facing Dog',
    sanskritName: 'Adho Mukha Svanasana',
    breathCue: 'Exhale',
    mantra: 'Om Marichaye Namaha',
    mantraMeaning: 'Salutations to the Lord of Dawn',
    cue: 'Lift the hips high, forming an inverted V, heels reaching gently toward the mat.',
  },
  {
    step: 9,
    englishName: 'Equestrian Pose',
    sanskritName: 'Ashwa Sanchalanasana',
    breathCue: 'Inhale',
    mantra: 'Om Adityaya Namaha',
    mantraMeaning: 'Salutations to the Son of Aditi',
    cue: 'Step the left leg forward into a low lunge, chest lifted, gaze soft and forward.',
  },
  {
    step: 10,
    englishName: 'Hand to Foot Pose',
    sanskritName: 'Hasta Padasana',
    breathCue: 'Exhale',
    mantra: 'Om Savitre Namaha',
    mantraMeaning: 'Salutations to the Pre-Dawn Sun',
    cue: 'Step the right foot forward to meet the left and fold, releasing the crown of the head down.',
  },
  {
    step: 11,
    englishName: 'Raised Arms Pose',
    sanskritName: 'Hasta Uttanasana',
    breathCue: 'Inhale',
    mantra: 'Om Arkaya Namaha',
    mantraMeaning: 'Salutations to the One Fit to Be Praised',
    cue: 'Rise with a flat back, sweep the arms overhead, and arch gently into a soft backbend.',
  },
  {
    step: 12,
    englishName: 'Mountain Pose',
    sanskritName: 'Tadasana / Pranamasana',
    breathCue: 'Exhale',
    mantra: 'Om Bhaskaraya Namaha',
    mantraMeaning: 'Salutations to the One Who Illumines',
    cue: 'Return to standing, palms together at the heart, breath and body settled once more.',
  },
];

export const TOTAL_POSES = SURYA_NAMASKAR_POSES.length;

export type SpeedPreset = 'slow' | 'medium' | 'fast';

export const SPEED_PRESETS: Record<SpeedPreset, number> = {
  slow: 12,
  medium: 8,
  fast: 5,
};
