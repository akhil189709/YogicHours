import { Header, Footer, Reveal, ScrollProgress } from '@/components/Common';
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  WhyChooseUs,
  TestimonialsSection,
  WellnessToolsSection,
  InstructorsSection,
  SuryaNamaskarSection,
  MeditationSection,
  ContactSection,
} from '@/components/Home';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8faf9] text-[#143024]">
      <ScrollProgress />
      <Header />

      {/* The hero is above the fold — it animates on load, not on scroll. */}
      <HeroSection />

      <Reveal>
        <AboutSection />
      </Reveal>
      <Reveal>
        <ServicesSection />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <TestimonialsSection />
      </Reveal>
      <Reveal>
        <InstructorsSection />
      </Reveal>
      <Reveal>
        <WellnessToolsSection />
      </Reveal>
      <Reveal>
        <SuryaNamaskarSection />
      </Reveal>
      <Reveal>
        <MeditationSection />
      </Reveal>
      <Reveal>
        <ContactSection />
      </Reveal>

      <Footer />
    </main>
  );
}
