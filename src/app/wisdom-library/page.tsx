import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer, Header, Reveal } from '@/components/Common';

export const metadata: Metadata = {
  title: 'Yogic Wisdom Library - Yogic Hours',
  description:
    'Free learning resources on the eight limbs of yoga, pranayama, meditation, and building a sustainable home practice.',
};

interface Entry {
  title: string;
  summary: string;
  points: { term: string; detail: string }[];
  note?: string;
}

interface Chapter {
  id: string;
  label: string;
  heading: string;
  intro: string;
  entries: Entry[];
}

/**
 * The library holds its teaching inline rather than linking out, so every entry is
 * readable on this page with nothing to chase. Sanskrit terms follow the classical
 * sources — Patanjali's Yoga Sutras for the limbs, the Hatha Yoga Pradipika for the
 * breath practices.
 */
const CHAPTERS: Chapter[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    heading: 'Where the practice comes from',
    intro:
      'Yoga is older and wider than the postures. These are the structures the rest of the practice hangs from.',
    entries: [
      {
        title: 'The Eight Limbs of Yoga',
        summary:
          'Patanjali’s Yoga Sutras set out ashtanga — eight limbs, of which posture is only the third. They are less a ladder than eight things that mature together.',
        points: [
          { term: 'Yama', detail: 'How you meet others — restraint and ethical conduct.' },
          { term: 'Niyama', detail: 'How you meet yourself — personal observance and discipline.' },
          { term: 'Asana', detail: 'Posture. A steady, comfortable seat for the body.' },
          { term: 'Pranayama', detail: 'Regulation and extension of the breath.' },
          { term: 'Pratyahara', detail: 'Drawing the senses inward, away from constant input.' },
          { term: 'Dharana', detail: 'Concentration — holding attention on one point.' },
          { term: 'Dhyana', detail: 'Meditation — attention that flows without breaking.' },
          { term: 'Samadhi', detail: 'Absorption, where the sense of a separate self quietens.' },
        ],
      },
      {
        title: 'The Five Yamas',
        summary: 'The ethical restraints — the first limb, and the ground everything else stands on.',
        points: [
          { term: 'Ahimsa', detail: 'Non-harming, including toward your own body on the mat.' },
          { term: 'Satya', detail: 'Truthfulness in speech and in self-assessment.' },
          { term: 'Asteya', detail: 'Non-stealing — of things, of credit, of others’ time.' },
          { term: 'Brahmacharya', detail: 'Right use of energy; moderation rather than depletion.' },
          { term: 'Aparigraha', detail: 'Non-grasping. Holding things, and outcomes, lightly.' },
        ],
      },
      {
        title: 'The Five Niyamas',
        summary: 'The personal observances — the second limb, turned inward.',
        points: [
          { term: 'Saucha', detail: 'Cleanliness of body, surroundings, and thought.' },
          { term: 'Santosha', detail: 'Contentment with what is already here.' },
          { term: 'Tapas', detail: 'Disciplined effort — the heat that makes change possible.' },
          { term: 'Svadhyaya', detail: 'Self-study, and study of the texts.' },
          { term: 'Ishvara Pranidhana', detail: 'Surrender of the need to control every result.' },
        ],
      },
    ],
  },
  {
    id: 'breath',
    label: 'Breath',
    heading: 'Pranayama — working with the breath',
    intro:
      'Breath is the one autonomic system you can take over at will. These are the classical techniques, with what each one is for.',
    entries: [
      {
        title: 'Core Pranayama Techniques',
        summary:
          'Learn these seated, spine tall, breathing through the nose unless a technique says otherwise. Stop if you feel light-headed.',
        points: [
          {
            term: 'Nadi Shodhana',
            detail:
              'Alternate-nostril breathing. Balancing and quietening — the usual first choice for anxiety or before sleep.',
          },
          {
            term: 'Ujjayi',
            detail:
              'A soft ocean sound made by narrowing the throat. Paces and steadies breath during asana.',
          },
          {
            term: 'Bhramari',
            detail:
              'Humming-bee breath. The vibration on a long exhale settles an agitated mind quickly.',
          },
          {
            term: 'Kapalabhati',
            detail:
              'Sharp active exhales, passive inhales. Energising and warming — a cleansing practice, not a relaxing one.',
          },
          {
            term: 'Bhastrika',
            detail: 'Bellows breath — forceful in both directions. Strongly heating and stimulating.',
          },
          {
            term: 'Sheetali',
            detail: 'Inhaling across a curled tongue. Cooling, for heat and irritability.',
          },
        ],
        note: 'Kapalabhati and Bhastrika are not suitable during pregnancy, or with uncontrolled high blood pressure, glaucoma, epilepsy, recent abdominal surgery, or heart conditions. Learn them with a teacher first.',
      },
      {
        title: 'Diaphragmatic Breathing',
        summary:
          'The foundation beneath every technique above. Most adults breathe shallowly into the upper chest, which keeps the nervous system braced.',
        points: [
          { term: 'Where it moves', detail: 'Ribs widen sideways and the belly softens outward on the inhale.' },
          { term: 'The ratio', detail: 'Lengthen the exhale beyond the inhale — that is what triggers the calming response.' },
          { term: 'How to check', detail: 'One hand on the chest, one on the belly. The lower hand should travel more.' },
          { term: 'How long', detail: 'Five minutes daily does more than an occasional long session.' },
        ],
      },
    ],
  },
  {
    id: 'stillness',
    label: 'Stillness',
    heading: 'Meditation and deep rest',
    intro: 'The inward limbs. Less to perform, harder to sustain, and where most of the benefit sits.',
    entries: [
      {
        title: 'Ways Into Meditation',
        summary:
          'Dhyana is not emptying the mind. It is giving attention one thing to rest on and returning each time it wanders — the returning is the practice.',
        points: [
          { term: 'Breath awareness', detail: 'Follow the sensation of breath at the nostrils. The simplest anchor.' },
          { term: 'Mantra japa', detail: 'Silent repetition of a sound or phrase, often Om, to occupy the verbal mind.' },
          { term: 'Trataka', detail: 'Steady gazing at a candle flame or fixed point, then holding its afterimage.' },
          { term: 'Body scan', detail: 'Moving attention slowly through the body, releasing what it finds held.' },
          { term: 'Yoga Nidra', detail: 'Guided rotation of awareness while lying down — rest at the edge of sleep.' },
        ],
      },
      {
        title: 'Savasana, Properly',
        summary:
          'Corpse pose is where the work of a practice is absorbed. It is routinely cut short, and it is the part most worth keeping.',
        points: [
          { term: 'How long', detail: 'Five to ten minutes, or roughly a tenth of the session.' },
          { term: 'Set-up', detail: 'Legs apart, palms up, jaw and tongue loose. Support under the knees if the low back complains.' },
          { term: 'Stay warm', detail: 'Body temperature drops as you settle — cover up before you begin.' },
          { term: 'Coming out', detail: 'Roll to one side and pause there before sitting up. Never straight up from flat.' },
        ],
      },
    ],
  },
  {
    id: 'practice',
    label: 'Practice',
    heading: 'Building something you keep',
    intro: 'What separates a practice that lasts from one that stops after three weeks.',
    entries: [
      {
        title: 'A Sustainable Home Practice',
        summary:
          'Consistency outperforms intensity. A short daily practice reshapes the nervous system in a way an occasional long class does not.',
        points: [
          { term: 'Start smaller', detail: 'Fifteen minutes you actually do beats an hour you skip.' },
          { term: 'Fix the time', detail: 'Same slot daily. The decision is what costs energy, not the practice.' },
          { term: 'Keep a shape', detail: 'Centre and breathe, warm up, main postures, counter-poses, Savasana.' },
          { term: 'Leave it out', detail: 'Mat visible, phone in another room.' },
          { term: 'Expect flat days', detail: 'Practising on a dull day is the practice. Missing one is not failure.' },
        ],
      },
      {
        title: 'Practising Safely',
        summary:
          'Yoga is generally safe, and most injuries come from forcing range of motion rather than from the postures themselves.',
        points: [
          { term: 'Sharp means stop', detail: 'Stretch is dull and broad. Sharp, electric, or joint-line pain means come out.' },
          { term: 'Breath is the gauge', detail: 'If you cannot breathe smoothly, you have gone too far.' },
          { term: 'Use props', detail: 'Blocks and straps bring the floor to you. They are not a lesser practice.' },
          { term: 'Warm first', detail: 'Deep backbends and splits belong late in a session, never at the start.' },
          { term: 'Tell your teacher', detail: 'Pregnancy, high or low blood pressure, glaucoma, disc injury, recent surgery — all change what you should do.' },
        ],
        note: 'Yogic Hours teaches yoga and wellness practice. It does not replace medical care — check with a doctor about any condition that needs one.',
      },
      {
        title: 'The Yogic Diet',
        summary:
          'Classical texts sort food by its effect on the mind rather than its nutrients. Useful as a lens, not a rulebook.',
        points: [
          { term: 'Sattvic', detail: 'Fresh, light, whole food — fruit, vegetables, grains, nuts. Leaves the mind clear.' },
          { term: 'Rajasic', detail: 'Very spicy, stimulating, or caffeinated. Drives activity and restlessness.' },
          { term: 'Tamasic', detail: 'Stale, heavily processed, or over-eaten. Brings heaviness and dullness.' },
          { term: 'Mitahara', detail: 'Moderate quantity — the older instruction is to leave the stomach part empty.' },
          { term: 'Before practice', detail: 'Leave two to three hours after a full meal; longer before inversions.' },
        ],
      },
    ],
  },
];

// Terms that recur across the chapters above and in class.
const GLOSSARY = [
  { term: 'Asana', meaning: 'Posture; literally “seat”.' },
  { term: 'Prana', meaning: 'Life force, carried on the breath.' },
  { term: 'Nadi', meaning: 'Channel through which prana moves.' },
  { term: 'Chakra', meaning: 'Wheel; a centre where energy channels meet.' },
  { term: 'Bandha', meaning: 'Energetic lock created by engaging the body.' },
  { term: 'Drishti', meaning: 'Fixed gaze point that steadies attention.' },
  { term: 'Vinyasa', meaning: 'Movement linked to breath in sequence.' },
  { term: 'Namaste', meaning: 'A greeting of respect between practitioners.' },
  { term: 'Om', meaning: 'The primordial sound, chanted to open or close practice.' },
  { term: 'Guru', meaning: 'Teacher; one who brings light to darkness.' },
  { term: 'Sadhana', meaning: 'Committed, regular spiritual practice.' },
  { term: 'Samskara', meaning: 'A mental groove worn in by repetition.' },
];

// Where each idea above can actually be practised on this site.
const PRACTICE_LINKS = [
  {
    href: '/surya-namaskar',
    title: 'Surya Namaskar Tracker',
    detail: 'Practise the 12-pose sequence with breath cues and Sanskrit mantras.',
  },
  {
    href: '/meditation',
    title: 'Meditation Space',
    detail: 'Soundscapes, guided Savasana, and breathing visuals — free, always.',
  },
  {
    href: '/wellness-tools',
    title: 'Wellness Tools',
    detail: 'Pranayama timer, breathing capacity test, BMI, BP, and hydration tracking.',
  },
];

const WisdomLibraryPage = () => {
  return (
    <main
      className="min-h-screen bg-[#f8faf9] text-[#143024]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <Header />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#143024] px-6 py-20 text-white sm:px-12 sm:py-24">
        <div className="pointer-events-none absolute right-0 top-0 h-[480px] w-[480px] rounded-full bg-[#be9227]/15 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <span className="eyebrow eyebrow-center mb-5 text-[#d4af37]">Free Learning Resources</span>
          <h1 className="display-lg text-white">
            The Yogic <span className="display-accent-light">Wisdom Library.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            The teaching behind the practice — the eight limbs, the breath techniques, and what it
            takes to build something you keep. Free to read, nothing to sign up for.
          </p>

          <nav className="mt-9 flex flex-wrap justify-center gap-2.5">
            {CHAPTERS.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#d4af37] transition hover:bg-[#d4af37]/20"
              >
                {chapter.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── CHAPTERS ── */}
      {CHAPTERS.map((chapter, index) => (
        <section
          key={chapter.id}
          id={chapter.id}
          className={`section-y scroll-mt-24 px-6 md:px-12 ${index % 2 === 1 ? 'bg-white' : ''}`}
        >
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <span className="eyebrow mb-5">{chapter.label}</span>
              <h2 className="display-lg text-[#143024]">{chapter.heading}</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#143024]/70 sm:text-lg">
                {chapter.intro}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-7 lg:grid-cols-2">
              {chapter.entries.map((entry) => (
                <Reveal key={entry.title}>
                  <article className="lift h-full rounded-3xl border border-[#143024]/10 bg-white p-7 shadow-xs sm:p-9">
                    <h3 className="display-md text-[#143024]">{entry.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#143024]/70">
                      {entry.summary}
                    </p>

                    <hr className="gold-rule my-6" />

                    <dl className="space-y-4">
                      {entry.points.map((point) => (
                        <div key={point.term}>
                          <dt className="text-sm font-bold text-[#143024]">{point.term}</dt>
                          <dd className="mt-0.5 text-sm leading-relaxed text-[#143024]/65">
                            {point.detail}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {entry.note && (
                      <p className="mt-6 rounded-2xl border border-[#be9227]/25 bg-[#be9227]/[0.07] p-4 text-xs leading-relaxed text-[#143024]/75">
                        <strong className="font-bold text-[#8a6a1c]">Take care: </strong>
                        {entry.note}
                      </p>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── GLOSSARY ── */}
      <section className="section-y relative overflow-hidden bg-[#081b11] px-6 text-white on-dark md:px-12">
        <div className="pointer-events-none absolute right-0 top-0 h-[460px] w-[460px] rounded-full bg-[#be9227]/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal className="max-w-2xl">
            <span className="eyebrow mb-5 text-[#d4af37]">Glossary</span>
            <h2 className="display-lg text-white">
              Sanskrit you will <span className="display-accent-light">hear in class.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
              Teachers use these terms without translating them. Here is what they mean.
            </p>
          </Reveal>

          <dl className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {GLOSSARY.map((item) => (
              <div key={item.term} className="border-l-2 border-[#d4af37]/40 pl-4">
                <dt className="font-semibold text-[#d4af37]">{item.term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-white/65">{item.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── PUT IT INTO PRACTICE ── */}
      <section className="section-y bg-white px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow eyebrow-center mb-5">Put It Into Practice</span>
            <h2 className="display-lg text-[#143024]">
              Reading is the <span className="display-accent">smaller half.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {PRACTICE_LINKS.map((item) => (
              <Reveal key={item.href}>
                <Link
                  href={item.href}
                  className="lift flex h-full flex-col rounded-3xl border border-[#143024]/10 bg-[#f8faf9] p-7 shadow-xs"
                >
                  <h3 className="text-lg font-bold text-[#143024]">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#143024]/65">
                    {item.detail}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#be9227]">
                    Open
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 text-center">
            <p className="text-sm text-[#143024]/70">
              Want this taught to you directly?{' '}
              <Link
                href="/health-intake"
                className="font-bold text-[#be9227] underline underline-offset-4 hover:text-[#143024]"
              >
                Start your wellness plan →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default WisdomLibraryPage;
