import Link from 'next/link';
import { CONTACT_INFO } from '@/constants';

const MailIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.3a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.24 1L7.8 9.8a14 14 0 006.4 6.4l1.82-1.82a1 1 0 011-.24l3.3 1.1a1 1 0 01.68.95V19a2 2 0 01-2 2A16 16 0 013 5z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18 15 15 0 010-18z" />
  </svg>
);

const CONTACT_ROWS = [
  { icon: <MailIcon />, label: 'Email', value: CONTACT_INFO.EMAIL, href: `mailto:${CONTACT_INFO.EMAIL}` },
  { icon: <PhoneIcon />, label: 'Phone', value: CONTACT_INFO.PHONE, href: CONTACT_INFO.PHONE_LINK },
  { icon: <GlobeIcon />, label: 'Sessions', value: 'Online worldwide & in-person, Gurugram', href: null },
];

const ContactSection = () => {
  return (
    <section
      className="section-y relative overflow-hidden bg-[#143024] px-6 text-white on-dark md:px-12"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="pointer-events-none absolute -right-20 top-0 h-[520px] w-[520px] rounded-full bg-[#be9227]/10 blur-[150px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[130px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* ── Left: the invitation ── */}
        <div>
          <span className="eyebrow mb-5 text-[#d4af37]">Contact</span>

          <h2 className="display-lg text-white">
            Start your <span className="display-accent-light">wellness journey</span> today.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            Reach out to book a consultation, ask about a program, or get support building a
            balanced lifestyle plan.
          </p>

          <dl className="mt-10 space-y-5">
            {CONTACT_ROWS.map((row) => (
              <div key={row.label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#d4af37]">
                  {row.icon}
                </span>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                    {row.label}
                  </dt>
                  <dd className="mt-0.5 text-base font-medium text-white/90">
                    {row.href ? (
                      <a href={row.href} className="hover:text-[#d4af37]">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Right: the closing call to action ── */}
        <div className="rounded-[2rem] border border-[#be9227]/25 bg-white p-8 shadow-2xl sm:p-10">
          <h3 className="display-md text-[#143024]">Ready to transform?</h3>

          <p className="mt-4 text-[#143024]/65">
            Tell us your goals and any health concerns. Our team will match you with the right
            teacher and send a personalized plan with booking options.
          </p>

          <ul className="mt-7 space-y-3">
            {[
              'A reply within one working day',
              'Matched to the right teacher for your needs',
              'No obligation — the first conversation is free',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm font-medium text-[#143024]/80">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#be9227]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/booking"
              className="brand-btn-primary flex-1 rounded-full px-7 py-3.5 text-center text-sm font-bold uppercase tracking-wider"
            >
              Book a Session
            </Link>
            <Link
              href="/contact"
              className="brand-btn-secondary flex-1 rounded-full px-7 py-3.5 text-center text-sm font-bold uppercase tracking-wider"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
