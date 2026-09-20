import { Footer, Header } from '@/components/Common';

const meditationTechniques = [
  {
    title: 'Guided Breathwork',
    description: 'Anchor your awareness to the breath and release tension.',
  },
  {
    title: 'Soundscape Focus',
    description: 'Use calming audio layers to deepen mental stillness.',
  },
  { title: 'Meditation Timer', description: 'Structured sessions for focus, sleep, or recovery.' },
];

const MeditationPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white">
      <Header />
      <section className="py-24">
        <div className="container mx-auto px-4 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Meditation
            </p>
            <h1 className="mt-4 text-5xl font-bold">Build a calmer mind with guided journeys.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Explore meditation sessions designed for focus, stress release, and restful sleep
              through guided breath and sound.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950 p-10 shadow-xl">
            <div className="space-y-6">
              {meditationTechniques.map((item) => (
                <div key={item.title}>
                  <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
            <button className="mt-10 rounded-full bg-cyan-400 px-8 py-4 text-slate-950 transition hover:bg-cyan-300">
              Start Guided Practice
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default MeditationPage;
