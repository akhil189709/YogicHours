'use client';

import React from 'react';
import Link from 'next/link';

interface Post {
  title: string;
  summary: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  slug: string;
}

const posts: Post[] = [
  {
    title: 'Yoga for Stress Relief & Nervous System Reset',
    summary:
      'Practical breathing and posture routines scientifically structured to calm your vagus nerve and regulate daily cortisol levels.',
    category: 'Pranayama',
    readTime: '5 min read',
    date: 'Jul 18, 2026',
    slug: '/blog/yoga-for-stress-relief',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Maya Patel',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    title: 'Building a Sustainable Home Yoga Routine',
    summary:
      'How to build consistent, mindful movement habits without needing hours of free time or elaborate studio setups.',
    category: 'Mindful Living',
    readTime: '7 min read',
    date: 'Jul 12, 2026',
    slug: '/blog/building-a-home-practice',
    image:
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Arjun Mehra',
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    title: 'Mindful Eating Habits for Sustained Energy',
    summary:
      'Ayurvedic nutrition guidelines paired with modern science to support mental clarity, gut health, and daytime vitality.',
    category: 'Sattvic Nutrition',
    readTime: '6 min read',
    date: 'Jul 04, 2026',
    slug: '/blog/mindful-eating-habits',
    image:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Sana Reddy',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
  },
];

const BlogSection = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px -12px rgba(20, 48, 36, 0.12);
        }

        .blog-card:hover .blog-img {
          transform: scale(1.08);
        }

        .blog-card:hover .blog-title {
          color: #be9227;
        }

        .blog-card:hover .read-arrow {
          transform: translateX(4px);
          color: #be9227;
        }
      ` }} />

      <section
        className="py-28 px-6 md:px-12 relative overflow-hidden bg-[#f8faf9]"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#be9227]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#143024]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ── HEADER ── */}
          <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-8 border-b border-[#143024]/10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4 text-xs tracking-[0.25em] uppercase font-bold text-[#be9227] bg-[#be9227]/10 px-4 py-1.5 rounded-full border border-[#be9227]/20">
                <span className="w-2 h-2 rounded-full bg-[#be9227] animate-pulse" />
                Latest Journal
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#143024] leading-[1.15]">
                Wellness insights <br />
                <span className="italic font-light text-[#be9227]">from our experts.</span>
              </h2>
            </div>

            <Link href="/blog" className="hidden sm:inline-flex">
              <button className="inline-flex items-center gap-2 rounded-full border border-[#143024]/20 bg-white px-6 py-3 text-sm font-bold text-[#143024] transition-all duration-300 hover:bg-[#143024] hover:text-white shadow-xs">
                <span>View All Articles</span>
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

          {/* ── BLOG CARDS GRID ── */}
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="blog-card rounded-3xl overflow-hidden bg-white border border-[#143024]/10 flex flex-col justify-between group shadow-xs"
              >
                <div>
                  {/* Article Featured Image */}
                  <div className="relative h-60 w-full overflow-hidden bg-[#143024]/5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="blog-img w-full h-full object-cover transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Category Pill */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 text-[#143024] shadow-sm">
                        {post.category}
                      </span>
                    </div>

                    {/* Read Time Badge */}
                    <div className="absolute bottom-3 right-4 text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                      {post.readTime}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-semibold text-[#143024]/40 uppercase tracking-wider mb-2">
                      {post.date}
                    </p>

                    <h3 className="blog-title text-2xl font-bold text-[#143024] leading-tight transition-colors duration-300 mb-3">
                      <Link href={post.slug}>{post.title}</Link>
                    </h3>

                    <p className="text-sm leading-relaxed text-[#143024]/70 font-normal">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* Author & Action Footer */}
                <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-[#143024]/5 mt-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-[#be9227]/20"
                    />
                    <span className="text-xs font-bold text-[#143024]">{post.author.name}</span>
                  </div>

                  <Link
                    href={post.slug}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#143024] group-hover:text-[#be9227] transition-colors"
                  >
                    <span>Read</span>
                    <svg
                      className="read-arrow w-3.5 h-3.5 transition-transform duration-300 text-[#143024]/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* ── MOBILE CTA ── */}
          <div className="mt-12 text-center sm:hidden">
            <Link href="/blog">
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#143024]/20 bg-white px-6 py-3.5 text-sm font-bold text-[#143024] shadow-xs">
                <span>View All Articles</span>
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
      </section>
    </>
  );
};

export default BlogSection;
