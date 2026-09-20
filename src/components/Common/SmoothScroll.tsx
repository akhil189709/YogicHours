'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import gsap from 'gsap';

/** Height of the sticky header, so anchor targets don't land underneath it. */
const HEADER_OFFSET = -96;

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<LenisRef>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(query.matches);

    const handleChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  // Drive Lenis from GSAP's ticker instead of its own rAF loop. The hero's parallax
  // and particle canvas already run on that ticker, so sharing one loop keeps scroll
  // position and scroll-linked visuals updating in the same frame (no 1-frame jitter).
  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.05,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        // With smoothing off, Lenis stops intercepting the wheel and native
        // scrolling passes straight through, while scrollTo() still works.
        smoothWheel: !reduceMotion,
        syncTouch: !reduceMotion,
        touchMultiplier: 1.6,
        anchors: { offset: HEADER_OFFSET },
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
