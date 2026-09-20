'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Instructor {
  name: string;
  title: string;
  experience: string;
  image: string;
  // These are full-figure pose photographs, not headshots, so each one is framed
  // by hand to keep the whole pose inside the 4:3 card window.
  imagePosition: string;
  specialties: string[];
  bio: string;
}

// Kept in step with the founder and TEAM entries on src/app/about/page.tsx.
const instructors: Instructor[] = [
  {
    name: 'Aditya Pratap Singh',
    title: 'Founder & Yoga Therapist',
    experience: '8+ Years',
    image: '/Founder1 (2).jpeg',
    imagePosition: '50% 50%',
    specialties: ['Therapeutic Yoga', 'Yoga Therapy', 'Pranayama', 'Holistic Health'],
    bio: 'Blends traditional yogic practice with a practical, personalized approach to modern health — having guided 500+ individuals through programs built around their own goals.',
  },
  {
    name: 'Pragya Devi',
    title: 'Yoga Teacher & Therapist',
    experience: '7+ Years',
    image: '/pragya3.jpeg',
    imagePosition: '50% 30%',
    specialties: ['Hatha Yoga', 'Ashtanga Yoga', 'Pranayama', 'Therapeutic Yoga'],
    bio: 'Creates personalized yoga programs for physical fitness, stress management, flexibility, and support for lifestyle-related disorders.',
  },
  {
    name: 'Shiya Shahi',
    title: 'International Yoga Teacher & Wellness Coach',
    experience: '6+ Years',
    image: '/Shiya1.jpeg',
    imagePosition: '60% 50%',
    specialties: ['Aerial Yoga', 'Therapeutic Yoga', 'Flexibility Training', 'Holistic Wellness'],
    bio: 'Brings international experience from Dubai, designing mindful practices that support strength, recovery, relaxation, and overall well-being.',
  },
];

const InstructorsSection = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .instructor-card:hover .instructor-img { transform: scale(1.06); }

        .instructor-card:hover .book-btn {
          background-color: #be9227;
          border-color: #be9227;
          color: #ffffff;
        }
      ` }} />

      <section
        className="section-y px-6 md:px-12 relative overflow-hidden bg-[#f8faf9]"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Subtle Ambient Background Light Orbs */}
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#be9227]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#143024]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ── HEADER ── */}
          <div className="mb-16 text-center max-w-3xl mx-auto flex flex-col items-center">
            <span className="eyebrow eyebrow-center mb-5">Our Team</span>

            <h2 className="display-lg text-[#143024]">
              Guided by qualified <span className="display-accent">practitioners.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#143024]/70 font-normal leading-relaxed">
              Every teacher at Yogic Hours holds formal qualifications in yoga and brings years of
              hands-on experience designing personalized programs.
            </p>
          </div>

          {/* ── INSTRUCTORS GRID ── */}
          <div className="grid gap-8 lg:grid-cols-3">
            {instructors.map((instructor) => (
              <article
                key={instructor.name}
                className="instructor-card lift rounded-3xl overflow-hidden bg-white border border-[#143024]/10 flex flex-col shadow-xs"
              >
                {/* ── Photograph ── */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#143024]/5">
                  <Image
                    src={instructor.image}
                    alt={`${instructor.name}, ${instructor.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    style={{ objectPosition: instructor.imagePosition }}
                    className="instructor-img object-cover transition-transform duration-700 ease-out"
                  />

                  <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-white/85 text-[#143024] shadow-sm">
                    {instructor.experience}
                  </span>
                </div>

                {/* ── Card body: the name sits here, not over a busy photograph ── */}
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  {/* Names and roles wrap to different line counts; the fixed height keeps
                      the rule below them level across the row. Only needed once the cards
                      sit side by side — stacked on mobile it would just add a gap. */}
                  <div className="lg:min-h-[7.5rem]">
                    <h3 className="display-md text-[#143024]">{instructor.name}</h3>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#be9227]">
                      {instructor.title}
                    </p>
                  </div>

                  <hr className="gold-rule mb-5" />

                  <p className="text-sm leading-relaxed text-[#143024]/70">{instructor.bio}</p>

                  <div className="mt-6 space-y-2.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#143024]/45">
                      Specialties
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#143024]/5 text-[#143024] border border-[#143024]/10"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* mt-auto pins the button to the bottom so all three cards align. */}
                  <Link href="/booking" className="mt-auto pt-7">
                    <span className="book-btn w-full py-3.5 rounded-2xl bg-[#143024]/5 border border-[#143024]/10 text-[#143024] font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2">
                      Book Session
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* ── BOTTOM TEAM LINK BANNER ── */}
          <div className="mt-16 text-center">
            <p className="text-sm text-[#143024]/70 font-normal">
              Want to know more about the people guiding your practice?{' '}
              <Link
                href="/about"
                className="text-[#be9227] font-bold underline underline-offset-4 hover:text-[#143024] transition-colors"
              >
                Meet the full team →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstructorsSection;
