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
        // Lerp follows the wheel continuously instead of restarting a fixed-length
        // animation on every tick, so the page keeps up with fast scrolling.
        // Higher = snappier (1 is instant); 0.1 is Lenis' floaty default.
        lerp: 0.18,
        wheelMultiplier: 1.25,
        // With smoothing off, Lenis stops intercepting the wheel and native
        // scrolling passes straight through, while scrollTo() still works.
        smoothWheel: !reduceMotion,
        // Touch devices keep native momentum scrolling, which is faster and more
        // responsive than Lenis' simulated touch inertia.
        syncTouch: false,
        anchors: { offset: HEADER_OFFSET },
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
