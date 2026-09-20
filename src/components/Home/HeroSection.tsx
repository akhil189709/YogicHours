'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function GodLevelYogaHero() {
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Parallax: mouse + scroll driven entirely by GSAP, zero React re-renders ──
  useEffect(() => {
    const bgLayer = bgLayerRef.current;
    const hero = heroRef.current;
    if (!bgLayer || !hero) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const xTo = gsap.quickTo(bgLayer, 'x', { duration: 1.1, ease: 'power3' });
    const yTo = gsap.quickTo(bgLayer, 'y', { duration: 1.1, ease: 'power3' });

    let mouseX = 0;
    let mouseY = 0;
    let scrollOffset = 0;

    const applyOffset = () => {
      xTo(mouseX);
      yTo(mouseY + scrollOffset);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 30;
      mouseY = (e.clientY / innerHeight - 0.5) * 30;
      applyOffset();
    };

    const handleScroll = () => {
      scrollOffset = window.scrollY * 0.2;
      applyOffset();
    };

    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ── Particle field: single shared GSAP ticker + pre-rendered glow sprite ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const spriteSize = 32;
    const sprite = document.createElement('canvas');
    sprite.width = spriteSize;
    sprite.height = spriteSize;
    const spriteCtx = sprite.getContext('2d')!;
    const gradient = spriteCtx.createRadialGradient(
      spriteSize / 2,
      spriteSize / 2,
      0,
      spriteSize / 2,
      spriteSize / 2,
      spriteSize / 2
    );
    gradient.addColorStop(0, 'rgba(212, 175, 55, 0.9)');
    gradient.addColorStop(0.4, 'rgba(212, 175, 55, 0.35)');
    gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
    spriteCtx.fillStyle = gradient;
    spriteCtx.fillRect(0, 0, spriteSize, spriteSize);

    const PARTICLE_COUNT = window.innerWidth < 768 ? 20 : 40;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.0003,
      speedY: -Math.random() * 0.0004 - 0.0001,
      opacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let resizeRaf = 0;
    const handleResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    };
    window.addEventListener('resize', handleResize);

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Stop drawing once the hero scrolls away — otherwise the canvas keeps eating
    // main-thread time on every frame while the rest of the page is scrolling.
    let isOnScreen = true;
    const onScreenObserver = new IntersectionObserver(([entry]) => {
      isOnScreen = entry.isIntersecting;
    });
    onScreenObserver.observe(canvas);

    const render = () => {
      if (!isVisible || !isOnScreen) return;
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < 0) p.y = 1;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;

        const pulsedOpacity = Math.max(
          0.05,
          Math.min(0.8, p.opacity + Math.sin(now * p.pulseSpeed + p.phase) * 0.15)
        );

        const px = p.x * width;
        const py = p.y * height;
        const drawSize = spriteSize * (p.size / 2);

        ctx.globalAlpha = pulsedOpacity;
        ctx.drawImage(sprite, px - drawSize / 2, py - drawSize / 2, drawSize, drawSize);
      }
      ctx.globalAlpha = 1;
    };

    gsap.ticker.add(render);

    return () => {
      gsap.ticker.remove(render);
      onScreenObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(resizeRaf);
    };
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .font-luxury-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        .font-modern-sans {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .gold-shimmer-text {
          background: linear-gradient(135deg, #fef08a 0%, #d4af37 40%, #854d0e 80%, #fef08a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 8s ease-in-out infinite;
        }

        @keyframes shine {
          to { background-position: 200% center; }
        }

        .divine-glass {
          background: rgba(10, 18, 14, 0.4);
          backdrop-filter: blur(24px) saturate(140%);
          -webkit-backdrop-filter: blur(24px) saturate(140%);
          border: 1px solid rgba(212, 175, 55, 0.15);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(212, 175, 55, 0.05);
        }

        .divine-glass-hover:hover {
          background: rgba(15, 28, 22, 0.6);
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.15);
        }

        .divine-pill {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(212, 175, 55, 0.2);
        }

        .divine-btn-primary {
          background: linear-gradient(135deg, #fef08a 0%, #d4af37 50%, #b8860b 100%);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.25);
        }

        .divine-btn-primary:hover {
          box-shadow: 0 14px 40px rgba(212, 175, 55, 0.4);
          transform: translateY(-2px);
        }

        .divine-btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(226, 232, 240, 0.25);
          backdrop-filter: blur(12px);
        }

        .divine-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(212, 175, 55, 0.5);
          transform: translateY(-2px);
        }

        @keyframes divinePulse {
          0%, 100% { opacity: 0.35; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.6; transform: scale(1.15) rotate(5deg); }
        }

        .divine-aura {
          animation: divinePulse 12s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .divine-aura,
          .gold-shimmer-text,
          .animate-ping {
            animation: none !important;
          }
        }
      `,
        }}
      />

      <section
        ref={heroRef}
        className="relative min-h-[100dvh] w-full overflow-hidden bg-[#040806] text-[#e2e8f0] select-none flex flex-col justify-between font-modern-sans"
      >
        <Image
          src="/heroImage.jpg" // Change this to your image path
          alt="Yogic Hours Yoga Sanctuary Atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.55] contrast-[1.12] saturate-[0.8]"
        />

        {/* ── 2. CANVAS PARTICLE SYSTEM (sprite-based, shares the GSAP ticker) ──── */}
        <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none opacity-80" />

        {/* ── 3. FLOATING HUD ACCESSORIES ──────────────────────────────────────── */}
        <header className="relative z-20 max-w-7xl w-full mx-auto px-6 pt-8 flex items-center justify-between">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full divine-pill shadow-2xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4af37]" />
            </span>
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium text-amber-100/90">
              Sanctuary Open • Gurugram
            </span>
          </div>

          <button
            onClick={() => setIsAudioMuted((prev) => !prev)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full divine-pill hover:bg-white/10 transition-all duration-300 group cursor-pointer text-xs text-slate-300"
          >
            <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-200/80 group-hover:text-amber-100">
              {isAudioMuted ? 'Soundscape Off' : 'Meditation Audio Active'}
            </span>
            <div className="flex items-center gap-0.5 h-3">
              {[0.4, 0.8, 0.5, 0.9, 0.3].map((height, i) => (
                <span
                  key={i}
                  className={`w-0.5 bg-[#d4af37] rounded-full transition-all duration-300 ${
                    !isAudioMuted ? 'animate-pulse' : 'opacity-40'
                  }`}
                  style={{
                    height: !isAudioMuted ? `${height * 100}%` : '30%',
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </button>
        </header>

        {/* ── 4. MAIN HERO CONTENT ─────────────────────────────────────────────── */}
        <main className="relative z-20 max-w-5xl mx-auto px-6 text-center my-auto pt-10 pb-16 flex flex-col items-center justify-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
            <span className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-semibold">
              Sacred Mind &amp; Body Experience
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
          </div>

          <h1 className="display-xl text-white drop-shadow-2xl mb-6">
            Find Your <span className="italic font-normal">Peace</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-xl text-slate-300/90 font-light leading-relaxed drop-shadow-md mb-12 px-2">
            <span className="font-normal text-white tracking-wide">Yogic Hours</span> provides
            holistic tools, transformational yogic alchemy, and conscious spaces designed to
            transition your life into a continuous celebration.
          </p>

          {/* ── CTA BUTTONS ─────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="divine-btn-primary px-9 py-4 rounded-full font-modern-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#0a120e] transition-all duration-300"
            >
              Book Your Session
            </Link>
            <Link
              href="/about"
              className="divine-btn-secondary px-9 py-4 rounded-full font-modern-sans text-sm font-semibold uppercase tracking-[0.15em] text-slate-100 transition-all duration-300"
            >
              Meet Our Founder
            </Link>
          </div>
        </main>
      </section>

      {/* ── 5. ABOUT THE OWNER / FOUNDER SECTION ──────────────────────────────── */}
      <section className="relative w-full bg-[#081b11] text-[#e2e8f0] font-modern-sans py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Founder image */}
          <div className="relative w-full aspect-[4/5] max-w-md mx-auto md:mx-0 rounded-2xl overflow-hidden divine-glass">
            <Image
              src="/Founder1 (5).jpeg"
              alt="Aditya Pratap Singh, Founder of Yogic Hours, seated in reverse prayer"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: '50% 42%' }}
            />
            <div className="divine-aura absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#d4af37]/30 blur-3xl pointer-events-none" />
          </div>

          {/* Founder content */}
          <div className="text-center md:text-left">
            <div className="mb-5 flex items-center justify-center md:justify-start gap-4">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
              <span className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-semibold">
                About the Founder
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-luxury-serif font-light text-white mb-4 leading-tight">
              A Life Devoted to <span className="gold-shimmer-text italic">Stillness</span>
            </h2>

            <p className="text-sm uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-6">
              Aditya Pratap Singh — Founder &amp; Yoga Therapist
            </p>

            <p className="text-slate-300/90 font-light leading-relaxed mb-4">
              With over 8 years of experience in Yoga, Therapeutic Wellness, and Holistic Health,
              Aditya founded Yogic Hours to help people build healthier, more balanced, and mindful
              lives. He has guided 500+ individuals through personalized yoga and wellness programs.
            </p>

            <p className="text-slate-300/90 font-light leading-relaxed mb-8">
              Holding a Master&apos;s and Bachelor&apos;s Degree in Yoga and a Certificate in
              Holistic Health Management, he blends traditional yogic practice with a practical,
              personalized approach to modern health — one hour at a time.
            </p>

            <Link
              href="/about"
              className="divine-btn-secondary inline-block px-8 py-3.5 rounded-full font-modern-sans text-sm font-semibold uppercase tracking-[0.15em] text-slate-100 transition-all duration-300"
            >
              Read Full Story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
