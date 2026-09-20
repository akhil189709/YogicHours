'use client';

import React from 'react';
import Link from 'next/link';

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  tag: string;
  popular?: boolean;
}

const services: ServiceItem[] = [
  {
    title: 'Online Group Wellness',
    description:
      'Live interactive classes with high-energy community vibes designed for consistent daily practice.',
    image:
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    tag: 'Community',
    popular: true,
  },
  {
    title: 'Yoga at Home',
    description:
      'Personalized 1-on-1 home practice tailored to your body type, goals, and flexible schedules.',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    tag: 'Personalized',
  },
  {
    title: 'Online 1-on-1 Classes',
    description:
      'Dedicated private video guidance for deeper physical alignment and accelerated inner transformation.',
    image:
      'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80',
    tag: 'Private Coaching',
  },
  {
    title: 'Couples Yoga',
    description:
      'Shared healing, trust-building, and mindfulness movement designed for partnered balance.',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    tag: 'Partnership',
  },
  {
    title: 'Family Yoga',
    description:
      'Fun, accessible movement and mindfulness practices suitable for every generation of the family.',
    image:
      'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80',
    tag: 'All Ages',
  },
  {
    title: 'Therapy Yoga Programs',
    description:
      'Clinical & restorative sessions focused on chronic pain relief, injury recovery, and mental peace.',
    image:
      'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=800&q=80',
    tag: 'Clinical Care',
  },
  {
    title: 'Corporate Wellness',
    description:
      'Custom workplace health programs, executive stress reduction, and team resilience workshops.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    tag: 'Enterprise',
  },
];

const ServicesSection = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .service-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -15px rgba(20, 48, 36, 0.12);
        }

        .service-card:hover .card-image {
          transform: scale(1.08);
        }

        .service-card:hover .cta-arrow {
          transform: translateX(4px);
          color: #be9227;
        }
      ` }} />

      <section
        className="section-y px-6 md:px-12 relative overflow-hidden bg-white"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Subtle Background Glow Spheres */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#be9227]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#143024]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ── HEADER ── */}
          <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4 text-xs tracking-[0.25em] uppercase font-bold text-[#be9227] bg-[#be9227]/10 px-4 py-1.5 rounded-full border border-[#be9227]/20">
              <span className="w-2 h-2 rounded-full bg-[#be9227] animate-pulse" />
              Our Services
            </div>

            <h2 className="display-lg text-[#143024]">
              Healing practices for <br />
              <span className="display-accent">every lifestyle.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#143024]/70 font-normal leading-relaxed">
              Choose from live group classes, private 1-on-1 sessions, specialized therapy programs,
              and enterprise wellness packages designed to empower your journey.
            </p>
          </div>

          {/* ── SERVICES GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <article
                key={service.title}
                className={`service-card group relative rounded-3xl overflow-hidden bg-white border border-[#143024]/10 flex flex-col justify-between ${
                  service.popular ? 'ring-2 ring-[#be9227] shadow-lg' : 'shadow-xs'
                }`}
              >
                {/* ── Image & Overlay Container ── */}
                <div>
                  <div className="relative h-64 w-full overflow-hidden bg-[#143024]/5">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="card-image w-full h-full object-cover transition-transform duration-700 ease-out"
                    />

                    {/* Dark gradient for text readability overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Top Tag Pill */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/80 text-[#143024] shadow-sm">
                        {service.tag}
                      </span>
                    </div>

                    {/* Popular Badge */}
                    {service.popular && (
                      <div className="absolute top-4 right-4 bg-[#be9227] text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md">
                        Most Popular
                      </div>
                    )}

                    {/* Card Title overlaid on image base */}
                    <div className="absolute bottom-4 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white leading-tight drop-shadow-sm">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* ── Content Body ── */}
                  <div className="p-6 sm:p-8">
                    <p className="text-sm leading-relaxed text-[#143024]/70 font-normal">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* ── Footer Link CTA ── */}
                <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                  <Link
                    href="/schedule"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#143024] group-hover:text-[#be9227] transition-colors"
                  >
                    <span>Explore Program</span>
                    <svg
                      className="cta-arrow w-4 h-4 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}

            {/* ── CUSTOM CALL-TO-ACTION CARD ── */}
            <div className="rounded-3xl p-8 bg-[#143024] text-white flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[380px]">
              {/* Background Accent Sphere */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[#be9227]/20 blur-2xl pointer-events-none" />

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#be9227] border border-white/10 mb-6">
                  Need Customization?
                </span>

                <h3 className="text-3xl font-bold leading-tight mb-4 text-white">
                  Looking for a custom wellness plan?
                </h3>

                <p className="text-sm text-white/70 leading-relaxed">
                  We design tailored corporate retreats, private diagnostic sessions, and personal
                  therapy paths to match your unique needs.
                </p>
              </div>

              <div className="pt-8">
                <Link href="/contact">
                  <button className="w-full py-4 rounded-2xl bg-[#be9227] hover:bg-[#be9227] text-white font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                    <span>Talk to an Expert</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
