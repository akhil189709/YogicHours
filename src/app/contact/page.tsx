'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { Footer, Header, WhatsAppButton } from '@/components/Common';
import { CONTACT_INFO, SOCIAL_MEDIA } from '@/constants';
import { submitToSheet } from '@/lib/submitToSheet';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setStatus('');
    setIsSubmitting(true);

    try {
      const result = await submitToSheet('contact', { name, email, subject, message });

      if (!result.ok) {
        setError(result.message || 'Unable to send your message. Please try again later.');
        return;
      }

      setStatus('Your message has been sent successfully. We will respond soon.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8faf9] text-[#143024]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Header />

      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden bg-[#143024] px-6 py-20 text-white sm:px-12">
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#be9227]/15 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#be9227]/25 bg-[#be9227]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#be9227] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#be9227] animate-pulse" />
            We&apos;d Love to Hear From You
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Questions? <span className="italic font-light text-[#be9227]">Let&apos;s connect.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Reach out to book a session, request a corporate package, or ask about a customized
            wellness plan.
          </p>
        </div>
      </section>

      {/* ── CONTACT DETAILS + FORM ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#143024]/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-[#be9227]">Email</p>
                <p className="mt-2 text-sm font-semibold text-[#143024]">{CONTACT_INFO.EMAIL}</p>
              </div>
              <div className="rounded-2xl border border-[#143024]/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-[#be9227]">Phone</p>
                <a
                  href={CONTACT_INFO.PHONE_LINK}
                  className="mt-2 block text-sm font-semibold text-[#143024] hover:text-[#be9227]"
                >
                  {CONTACT_INFO.PHONE}
                </a>
              </div>
              <div className="rounded-2xl border border-[#143024]/10 bg-white p-6 shadow-sm sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#be9227]">Hours</p>
                <p className="mt-2 text-sm font-semibold text-[#143024]">
                  Mon – Sat, 7 AM to 8 PM IST
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Link href="/health-intake" className="w-full sm:w-auto">
                <button className="w-full rounded-full bg-[#143024] px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#be9227] sm:w-auto">
                  Start Health Intake
                </button>
              </Link>
              <WhatsAppButton
                className="w-full justify-center sm:w-auto"
                message="Hello Yogic Hours, I would like to learn about your wellness programs."
              />
            </div>

            <div className="mt-10 rounded-2xl border border-[#143024]/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[#be9227]">
                Follow Yogic Hours
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a
                  href={SOCIAL_MEDIA.INSTAGRAM.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#143024]/15 px-4 py-2 font-semibold text-[#143024] transition hover:border-[#be9227] hover:text-[#be9227]"
                >
                  Instagram {SOCIAL_MEDIA.INSTAGRAM.handle}
                </a>
                <a
                  href={SOCIAL_MEDIA.FACEBOOK.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#143024]/15 px-4 py-2 font-semibold text-[#143024] transition hover:border-[#be9227] hover:text-[#be9227]"
                >
                  Facebook
                </a>
                <a
                  href={SOCIAL_MEDIA.YOUTUBE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#143024]/15 px-4 py-2 font-semibold text-[#143024] transition hover:border-[#be9227] hover:text-[#be9227]"
                >
                  YouTube
                </a>
                <a
                  href={SOCIAL_MEDIA.LINKEDIN.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#143024]/15 px-4 py-2 font-semibold text-[#143024] transition hover:border-[#be9227] hover:text-[#be9227]"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#143024]/10 bg-white p-8 shadow-xl sm:p-10">
            <h2 className="text-2xl font-bold text-[#143024] sm:text-3xl">Send us a message</h2>
            <p className="mt-3 text-sm text-[#143024]/60">
              Our concierge team is ready to listen and recommend the best plan for you.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block text-sm font-medium text-[#143024]/80">
                <span>Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:outline-none focus:ring-2 focus:ring-[#be9227]/20"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-[#143024]/80">
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:outline-none focus:ring-2 focus:ring-[#be9227]/20"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-[#143024]/80">
                <span>Subject</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:outline-none focus:ring-2 focus:ring-[#be9227]/20"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-[#143024]/80">
                <span>Message</span>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:outline-none focus:ring-2 focus:ring-[#be9227]/20"
                  required
                />
              </label>
              {error && (
                <p className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm font-semibold text-rose-700">
                  {error}
                </p>
              )}
              {status && (
                <p className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm font-semibold text-emerald-700">
                  {status}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#be9227] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#be9227]/20 transition hover:bg-[#a67e1f] disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
