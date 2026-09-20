import { Footer, Header } from '@/components/Common';

interface BlogSlugPageProps {
  params: {
    slug: string;
  };
}

type BlogPostItem = {
  title: string;
  content: string;
};

const blogPosts: Record<string, BlogPostItem> = {
  'stress-relief-yoga': {
    title: 'Yoga for Stress Relief',
    content:
      'Gentle poses, mindful breathing, and short daily sequences help your body unwind. Focus on neck, shoulders, and breath to lower cortisol and improve mental clarity.',
  },
  'home-yoga-routine': {
    title: 'Building a Home Practice',
    content:
      'Set a consistent schedule, choose supportive space, and layer short sessions over time. Quality movement with intention is better than long, unfocused practice.',
  },
  'mindful-eating': {
    title: 'Mindful Eating Habits',
    content:
      'Slow down meals, honor your hunger signals, and choose nourishing foods. Mindful eating supports digestion, energy levels, and emotional balance.',
  },
};

const BlogSlugPage = ({ params }: BlogSlugPageProps) => {
  const post = blogPosts[params.slug] ?? {
    title: 'Article Not Found',
    content: 'This article is not available right now. Please return to the blog overview.',
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <article className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Blog</p>
            <h1 className="mt-4 text-5xl font-bold">{post.title}</h1>
            <p className="mt-8 text-lg leading-8 text-slate-600">{post.content}</p>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default BlogSlugPage;
