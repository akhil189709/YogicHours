import Link from 'next/link';
import { Footer, Header } from '@/components/Common';

const featuredPosts = [
  {
    slug: 'stress-relief-yoga',
    title: 'Yoga for Stress Relief',
    category: 'Mindfulness',
    readTime: '5 min read',
    excerpt:
      'Simple breath and movement practices to calm your nervous system and release tension.',
  },
  {
    slug: 'home-yoga-routine',
    title: 'Building a Home Practice',
    category: 'Routine',
    readTime: '6 min read',
    excerpt: 'A sustainable practice plan for busy people who want more balance and energy.',
  },
  {
    slug: 'mindful-eating',
    title: 'Mindful Eating Habits',
    category: 'Nutrition',
    readTime: '4 min read',
    excerpt: 'Nutrition strategies to support mental clarity, digestion, and long-term wellness.',
  },
];

const categories = ['All Topics', 'Mindfulness', 'Nutrition', 'Recovery', 'Lifestyle'];

const BlogPage = () => {
  return (
    <main
      className="min-h-screen bg-[#f8faf9] text-[#143024]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <Header />

      <section className="relative overflow-hidden bg-[#143024] px-6 py-20 text-white sm:px-10 lg:px-16">
        <div className="absolute right-0 top-0 h-[360px] w-[360px] rounded-full bg-[#be9227]/15 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#be9227]/30 bg-[#be9227]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#be9227]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#be9227]" />
              Yogic hours journal
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Stories, rituals, and guidance for a calmer life.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Explore practical wellness insights that support healing, focus, and everyday balance.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#be9227]">
              New to the practice?
            </p>
            <p className="mt-2 max-w-sm text-sm text-white/75">
              Discover a flexible starting point with guided sessions and simple routines.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center rounded-xl bg-[#be9227] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#be9227]"
              >
                View schedule
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Book a session
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === 'All Topics'
                  ? 'bg-[#143024] text-white'
                  : 'bg-white text-[#143024] ring-1 ring-[#143024]/10 hover:bg-[#143024]/5'
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-[28px] border border-[#143024]/10 bg-white p-7 shadow-[0_15px_45px_-20px_rgba(20,48,36,0.15)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#be9227]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#be9227]">
                    {post.category}
                  </span>
                  <span className="text-sm text-[#143024]/60">{post.readTime}</span>
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-[#143024]">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#143024]/70">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-[#be9227] transition-colors hover:text-[#be9227]"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-[#143024]/10 bg-white p-7 shadow-[0_15px_45px_-20px_rgba(20,48,36,0.15)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#be9227]">
                Why read with us?
              </p>
              <h3 className="mt-3 text-2xl font-bold text-[#143024]">
                Practical wisdom for grounded living.
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#143024]/70">
                <li>• Simple practices you can apply immediately.</li>
                <li>• Balanced guidance rooted in wellness and recovery.</li>
                <li>• Clear recommendations for daily routines and rest.</li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-[#143024]/10 bg-gradient-to-br from-[#143024] to-[#1f4734] p-7 text-white">
              <h3 className="text-2xl font-bold">Need a personal plan?</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Let our team help you pair the right sessions with your goals and lifestyle.
              </p>
              <Link
                href="/booking"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#be9227] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#be9227]"
              >
                Start your wellness journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPage;
