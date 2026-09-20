'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { submitToSheet } from '@/lib/submitToSheet';
import { Footer, Header, WhatsAppButton } from '@/components/Common';

interface BookingOption {
  title: string;
  details: string;
  duration: string;
  badge: string;
  priceTag: string;
  price: number;
}

const TIME_SLOTS = [
  '6:00 AM – 7:00 AM',
  '7:30 AM – 8:30 AM',
  '9:00 AM – 10:00 AM',
  '5:00 PM – 6:00 PM',
  '6:30 PM – 7:30 PM',
  '8:00 PM – 9:00 PM',
];

const bookingOptions: BookingOption[] = [
  {
    title: 'Initial Consultation',
    details:
      '45-minute comprehensive health intake assessment and personalized yoga therapy roadmap.',
    duration: '45 Mins',
    badge: 'Recommended Start',
    priceTag: '1-on-1 Clinical Assessment',
    price: 1499,
  },
  {
    title: 'Online Group Wellness',
    details: 'Live small-batch group classes blending asana, breathwork, and mindfulness.',
    duration: '60 Mins',
    badge: 'Community',
    priceTag: 'Group Session',
    price: 999,
  },
  {
    title: 'Yoga at Home',
    details: 'A guided in-home practice session with a dedicated instructor at your doorstep.',
    duration: '60 Mins',
    badge: 'At-Home',
    priceTag: 'Home Visit',
    price: 1999,
  },
  {
    title: 'Online 1-on-1',
    details:
      'Private posture alignment, breathwork, and targeted therapeutic movement guided by an expert.',
    duration: '60 Mins',
    badge: 'Personalized',
    priceTag: 'Customized Routine',
    price: 2499,
  },
  {
    title: 'Couples Yoga',
    details: 'A shared practice designed to build connection, balance, and calm together.',
    duration: '60 Mins',
    badge: 'Duo Practice',
    priceTag: 'Shared Wellness',
    price: 2999,
  },
  {
    title: 'Family Yoga',
    details:
      'Shared mindfulness and posture routines designed to cultivate mental clarity and wellness for the family.',
    duration: '75 Mins',
    badge: 'Group Practice',
    priceTag: 'Whole-Family Session',
    price: 3499,
  },
  {
    title: 'Therapy Yoga',
    details:
      'Structured clinical recovery path designed specifically for chronic pain, stress, and rehabilitation.',
    duration: 'Multi-Session',
    badge: 'Clinical Care',
    priceTag: 'Holistic Recovery',
    price: 4999,
  },
  {
    title: 'Corporate Wellness',
    details:
      'Tailored workplace stress management workshops and team resilience programs — custom quote.',
    duration: 'Custom Retainer',
    badge: 'Enterprise',
    priceTag: 'Request a Quote',
    price: 0,
  },
];

const BookingPageInner = () => {
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [type, setType] = useState(bookingOptions[0].title);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lenis = useLenis();

  // Go through Lenis when it is running — a native smooth scroll would be fought
  // by Lenis' own rAF loop and stutter.
  const scrollToForm = useCallback(() => {
    const formElement = document.getElementById('booking-form');
    if (!formElement) return;

    if (lenis) {
      lenis.scrollTo(formElement, { offset: -112 });
    } else {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lenis]);

  useEffect(() => {
    const requestedType = searchParams.get('type');
    if (!requestedType) return;
    const match = bookingOptions.find(
      (option) => option.title.toLowerCase() === requestedType.toLowerCase()
    );
    if (match) {
      setType(match.title);
      requestAnimationFrame(scrollToForm);
    }
  }, [searchParams, scrollToForm]);

  const selectedOption =
    bookingOptions.find((option) => option.title === type) ?? bookingOptions[0];
  const isCorporateQuote = selectedOption.price === 0;

  const handleSelectOption = (optionTitle: string) => {
    setType(optionTitle);
    scrollToForm();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');
    setError('');
    setIsSubmitting(true);

    try {
      const result = await submitToSheet('booking', {
        name,
        email,
        type,
        date,
        timeSlot,
        fee: isCorporateQuote ? 'Quote on request' : selectedOption.price,
        notes,
      });

      if (!result.ok) {
        setError(result.message || 'Unable to submit your booking. Please try again later.');
        return;
      }

      setStatus(
        isCorporateQuote
          ? 'Request received — our team will send a custom quote shortly.'
          : 'Your booking request has been received — our team will reach out to confirm.'
      );
      setName('');
      setEmail('');
      setDate('');
      setNotes('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .booking-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .booking-card:hover {
          transform: translateY(-4px);
          border-color: rgba(190, 146, 39, 0.4);
          box-shadow: 0 20px 40px -15px rgba(20, 48, 36, 0.08);
        }

        .booking-card.selected {
          border-color: #be9227;
          background-color: rgba(190, 146, 39, 0.03);
        }
      ` }} />

      <main
        className="min-h-screen bg-[#f8faf9] text-[#143024]"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <Header />

        {/* ── HERO BANNER SECTION ── */}
        <section className="relative py-20 px-6 sm:px-12 bg-[#143024] text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#be9227]/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-bold text-[#be9227] bg-[#be9227]/15 px-4 py-1.5 rounded-full border border-[#be9227]/25 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#be9227] animate-pulse" />
              Easy Online Reservations
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Reserve your{' '}
              <span className="italic font-light text-[#be9227]">wellness session.</span>
            </h1>

            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/70 font-normal leading-relaxed">
              Select your preferred consultation or yoga package below and reserve your slot. Our
              clinical team will confirm your session details shortly.
            </p>
          </div>
        </section>

        {/* ── MAIN CONTENT GRID ── */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* ── LEFT COLUMN: SESSION OPTIONS CARDS ── */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-[#143024]">Select a Wellness Program</h2>
                <span className="text-xs font-semibold text-[#143024]/50">
                  Click card to select
                </span>
              </div>

              {bookingOptions.map((option) => {
                const isSelected = type === option.title;
                return (
                  <article
                    key={option.title}
                    onClick={() => handleSelectOption(option.title)}
                    className={`booking-card cursor-pointer rounded-3xl bg-white border p-6 sm:p-8 shadow-xs relative overflow-hidden ${
                      isSelected ? 'selected ring-2 ring-[#be9227]' : 'border-[#143024]/10'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#143024]/5 text-[#143024]/70 border border-[#143024]/10">
                          {option.badge}
                        </span>
                        <h3 className="text-2xl font-bold text-[#143024] mt-3">{option.title}</h3>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-[#be9227] bg-[#be9227]/10 px-3 py-1.5 rounded-xl block">
                          ⏱ {option.duration}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-[#143024]/70 leading-relaxed font-normal">
                      {option.details}
                    </p>

                    <div className="mt-6 pt-4 border-t border-[#143024]/5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#143024]/50">
                        {option.priceTag}
                      </span>
                      <span className="text-sm font-semibold text-[#143024]">
                        ₹{option.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* ── RIGHT COLUMN: BOOKING FORM CARD ── */}
            <div id="booking-form" className="lg:col-span-5 sticky top-28">
              <div className="rounded-3xl bg-white border border-[#143024]/10 p-6 sm:p-8 shadow-xl relative overflow-hidden">
                {/* Decorative Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#143024] via-[#be9227] to-[#143024]" />

                <h2 className="text-2xl font-bold text-[#143024]"> Submit Details</h2>
                <p className="mt-1 text-xs text-[#143024]/60">
                  Fill in your information to schedule your selected session.
                </p>

                {/* WhatsApp Support Assistance Block */}
                <div className="mt-6 p-4 rounded-2xl bg-[#143024]/5 border border-[#143024]/10">
                  <p className="text-xs text-[#143024]/80 font-medium mb-3">
                    Need guidance choosing the right session for your health goals?
                  </p>
                  <WhatsAppButton
                    className="w-full justify-center text-xs py-2.5 rounded-xl font-bold"
                    variant="outline"
                    message="Hi Yogic Hours, I need help selecting the best yoga session for my needs."
                  />
                </div>

                {/* Reservation Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#143024]/70 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full rounded-2xl border border-[#143024]/15 bg-[#f8faf9] px-4 py-3 text-sm text-[#143024] focus:border-[#be9227] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#be9227]/20 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#143024]/70 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ananya@example.com"
                      className="w-full rounded-2xl border border-[#143024]/15 bg-[#f8faf9] px-4 py-3 text-sm text-[#143024] focus:border-[#be9227] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#be9227]/20 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#143024]/70 mb-1.5">
                      Selected Session Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full rounded-2xl border border-[#143024]/15 bg-[#f8faf9] px-4 py-3 text-sm text-[#143024] focus:border-[#be9227] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#be9227]/20 transition-all font-semibold"
                    >
                      {bookingOptions.map((option) => (
                        <option key={option.title} value={option.title}>
                          {option.title} ({option.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#143024]/70 mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-2xl border border-[#143024]/15 bg-[#f8faf9] px-4 py-3 text-sm text-[#143024] focus:border-[#be9227] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#be9227]/20 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#143024]/70 mb-1.5">
                        Time Slot
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full rounded-2xl border border-[#143024]/15 bg-[#f8faf9] px-4 py-3 text-sm text-[#143024] focus:border-[#be9227] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#be9227]/20 transition-all"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#143024]/70 mb-1.5">
                      Additional Notes / Health Concerns
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Mention any physical injuries, goals, or time preferences..."
                      className="w-full rounded-2xl border border-[#143024]/15 bg-[#f8faf9] px-4 py-3 text-sm text-[#143024] focus:border-[#be9227] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#be9227]/20 transition-all"
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                      {error}
                    </div>
                  )}

                  {status && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                      {status}
                    </div>
                  )}

                  {isCorporateQuote ? (
                    <div className="rounded-2xl border border-[#143024]/10 bg-[#f8faf9] p-3 text-xs font-semibold text-[#143024]/70">
                      No payment required — we&apos;ll follow up with a tailored quote for your
                      team.
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-[#143024]/10 bg-[#f8faf9] p-3 text-xs font-semibold text-[#143024]/70">
                      Session fee: ₹{selectedOption.price.toLocaleString('en-IN')} • Our team will
                      confirm payment details with you after your booking request is received.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-[#be9227] px-8 py-4 text-base font-bold text-black shadow-xl shadow-[#be9227]/20 transition-all duration-300 hover:bg-[#be9227] hover:-translate-y-0.5 disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>
                        {isCorporateQuote ? 'Request Corporate Quote' : 'Confirm Booking'}
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

const BookingPage = () => (
  <Suspense fallback={null}>
    <BookingPageInner />
  </Suspense>
);

export default BookingPage;
