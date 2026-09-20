'use client';

import { useEffect, useRef } from 'react';

/**
 * A hairline of gold across the top of the viewport tracking read position.
 *
 * Scaling a transform keeps this off the layout/paint path entirely — the bar is
 * drawn once and only its compositor transform changes, so it costs nothing on a
 * scroll even though it updates every frame.
 */
const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };

    // Coalesce bursts of scroll events into one write per frame.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" style={{ transform: 'scaleX(0)' }} aria-hidden />;
};

export default ScrollProgress;
