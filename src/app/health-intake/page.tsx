'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { Footer, Header } from '@/components/Common';
import { submitToSheet } from '@/lib/submitToSheet';

const EXPERIENCE_LEVELS = [
  'Complete beginner',
  'Some experience (under a year)',
  'Regular practitioner (1–3 years)',
  'Experienced (3+ years)',
];

const GOALS = [
  'General fitness & flexibility',
  'Stress & anxiety relief',
  'Back, neck or joint pain relief',
  'Injury recovery / therapy yoga',
  'Better sleep & energy',
  'Weight management',
  'Pregnancy or postnatal care',
  'Corporate / team wellness',
];

const FORMATS = ['Online 1-on-1', 'Online group class', 'In-person, Gurugram', 'Home visit'];

const PREFERRED_TIMES = [
  'Early morning (5–8 AM)',
  'Morning (8–11 AM)',
  'Afternoon (12–4 PM)',
  'Evening (5–8 PM)',
  'Flexible',
];

const fieldClass =
  'mt-2 w-full rounded-2xl border border-[#143024]/15 bg-white px-4 py-3 text-[#143024] focus:border-[#be9227] focus:outline-none focus:ring-2 focus:ring-[#be9227]/20';

const HealthIntakePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState(EXPERIENCE_LEVELS[0]);
  const [goal, setGoal] = useState(GOALS[0]);
  const [conditions, setConditions] = useState('');
  const [medications, setMedications] = useState('');
  const [format, setFormat] = useState(FORMATS[0]);
  const [preferredTime, setPreferredTime] = useState(PREFERRED_TIMES[0]);
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');
    setError('');
    setIsSubmitting(true);

    try {
      const result = await submitToSheet('intake', {
        name,
        email,
        phone,
        age,
        experience,
        goal,
        conditions,
        medications,
        format,
        preferredTime,
        notes,
      });

      if (!result.ok) {
        setError(result.message || 'Unable to submit your intake form. Please try again later.');
        return;
      }

      setStatus(
        'Thank you — your intake form has been received. Our team will review it and send your personalized plan within one working day.'
      );
      setName('');
      setEmail('');
      setPhone('');
      setAge('');
      setConditions('');
      setMedications('');
      setNotes('');
      setConsent(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-[#f8faf9] text-[#143024]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <Header />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#143024] px-6 py-20 text-white sm:px-12">
        <div className="pointer-events-none absolute right-0 top-0 h-[480px] w-[480px] rounded-full bg-[#be9227]/15 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <span className="eyebrow eyebrow-center mb-5 text-[#d4af37]">Health Intake</span>
          <h1 className="display-lg text-white">
            Start your <span className="display-accent-light">wellness plan.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Tell us about your body, your goals, and anything we should work around. Our team uses
            this to match you with the right teacher and design a practice that fits you.
          </p>
        </div>
      </section>

      <section className="section-y px-6 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          {/* ── What happens next ── */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="display-md text-[#143024]">What happens next</h2>
            <ol className="mt-7 space-y-6">
              {[
                {
                  title: 'We read it properly',
                  detail: 'A qualified teacher reviews your form — not an automated system.',
                },
                {
                  title: 'We match your teacher',
                  detail: 'Based on your goals, experience, and any conditions you mention.',
                },
                {
                  title: 'You get your plan',
                  detail: 'A personalized practice outline and booking options, within a day.',
                },
              ].map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#be9227]/12 text-sm font-bold text-[#be9227]">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-semibold text-[#143024]">{step.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-[#143024]/65">
                      {step.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <hr className="gold-rule my-8" />

            <p className="text-sm leading-relaxed text-[#143024]/65">
              Your answers are shared only with the Yogic Hours teaching team. We are yoga
              therapists, not doctors — this form does not replace medical advice, and we will tell
              you if something should be cleared with your physician first.
            </p>
          </aside>

          {/* ── The form ── */}
          <div className="rounded-3xl border border-[#143024]/10 bg-white p-7 shadow-xl sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* About you */}
              <fieldset className="space-y-5">
                <legend className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#be9227]">
                  About you
                </legend>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-[#143024]/80">
                    <span>
                      Full name <span className="text-[#be9227]">*</span>
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className={fieldClass}
                      required
                    />
                  </label>

                  <label className="block text-sm font-medium text-[#143024]/80">
                    <span>
                      Email <span className="text-[#be9227]">*</span>
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={fieldClass}
                      required
                    />
                  </label>

                  <label className="block text-sm font-medium text-[#143024]/80">
                    <span>Phone / WhatsApp</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className={fieldClass}
                      placeholder="+91 ..."
                    />
                  </label>

                  <label className="block text-sm font-medium text-[#143024]/80">
                    <span>Age</span>
                    <input
                      type="number"
                      min={5}
                      max={110}
                      value={age}
                      onChange={(event) => setAge(event.target.value)}
                      className={fieldClass}
                    />
                  </label>
                </div>
              </fieldset>

              {/* Your practice */}
              <fieldset className="space-y-5 border-t border-[#143024]/10 pt-6">
                <legend className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#be9227]">
                  Your practice
                </legend>

                <label className="block text-sm font-medium text-[#143024]/80">
                  <span>Experience level</span>
                  <select
                    value={experience}
                    onChange={(event) => setExperience(event.target.value)}
                    className={fieldClass}
                  >
                    {EXPERIENCE_LEVELS.map((level) => (
                      <option key={level}>{level}</option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-medium text-[#143024]/80">
                  <span>What matters most to you right now?</span>
                  <select
                    value={goal}
                    onChange={(event) => setGoal(event.target.value)}
                    className={fieldClass}
                  >
                    {GOALS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-[#143024]/80">
                    <span>Preferred format</span>
                    <select
                      value={format}
                      onChange={(event) => setFormat(event.target.value)}
                      className={fieldClass}
                    >
                      {FORMATS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-sm font-medium text-[#143024]/80">
                    <span>Preferred time</span>
                    <select
                      value={preferredTime}
                      onChange={(event) => setPreferredTime(event.target.value)}
                      className={fieldClass}
                    >
                      {PREFERRED_TIMES.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </fieldset>

              {/* Health */}
              <fieldset className="space-y-5 border-t border-[#143024]/10 pt-6">
                <legend className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#be9227]">
                  Health background
                </legend>

                <label className="block text-sm font-medium text-[#143024]/80">
                  <span>Injuries, conditions, or areas of pain</span>
                  <textarea
                    rows={4}
                    value={conditions}
                    onChange={(event) => setConditions(event.target.value)}
                    className={fieldClass}
                    placeholder="e.g. lower back pain, knee surgery in 2022, high blood pressure, pregnancy"
                  />
                  <span className="mt-2 block text-xs font-normal text-[#143024]/55">
                    Anything your teacher should work around. Leave blank if none.
                  </span>
                </label>

                <label className="block text-sm font-medium text-[#143024]/80">
                  <span>Current medications</span>
                  <input
                    type="text"
                    value={medications}
                    onChange={(event) => setMedications(event.target.value)}
                    className={fieldClass}
                    placeholder="Optional"
                  />
                </label>

                <label className="block text-sm font-medium text-[#143024]/80">
                  <span>Anything else we should know?</span>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    className={fieldClass}
                  />
                </label>
              </fieldset>

              {/* Consent */}
              <label className="flex items-start gap-3 border-t border-[#143024]/10 pt-6 text-sm text-[#143024]/75">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#be9227]"
                  required
                />
                <span>
                  I understand Yogic Hours provides yoga and wellness guidance, not medical
                  treatment, and that I should consult a doctor about any condition that needs one.
                </span>
              </label>

              {error && (
                <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700">
                  {error}
                </p>
              )}
              {status && (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                  {status}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="brand-btn-primary w-full rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider"
              >
                {isSubmitting ? 'Submitting…' : 'Submit Intake Form'}
              </button>

              <p className="text-center text-xs text-[#143024]/55">
                Prefer to talk first?{' '}
                <Link href="/contact" className="font-semibold text-[#be9227] underline underline-offset-4">
                  Send us a message
                </Link>{' '}
                instead.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HealthIntakePage;
