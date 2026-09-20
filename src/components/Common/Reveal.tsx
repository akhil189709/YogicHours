'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger the entrance, in seconds. */
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  as?: ElementType;
}

const OFFSETS: Record<NonNullable<RevealProps['direction']>, string> = {
  up: 'translate3d(0, 32px, 0)',
  down: 'translate3d(0, -32px, 0)',
  left: 'translate3d(32px, 0, 0)',
  right: 'translate3d(-32px, 0, 0)',
  none: 'none',
};

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

type Phase = 'static' | 'hidden' | 'shown';

const Reveal = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  as: Tag = 'div',
}: RevealProps) => {
  const elementRef = useRef<HTMLElement | null>(null);
  // Server HTML is always fully visible; hiding happens only on the client, so content
  // can never get stuck invisible when JavaScript is slow or fails to load.
  const [phase, setPhase] = useState<Phase>('static');

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Already on screen (or scrolled past) at hydration: leave it untouched — no flash.
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    setPhase('hidden');

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setPhase('shown');
        observer.disconnect();
      },
      // The huge top margin counts anything already scrolled past as intersecting, so
      // sections skipped by a jump (anchor link, End key, scroll restore) still reveal.
      { threshold: 0.08, rootMargin: '100000px 0px -6% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  let style: CSSProperties | undefined;
  if (phase === 'hidden') {
    style = { opacity: 0, transform: OFFSETS[direction], willChange: 'opacity, transform' };
  } else if (phase === 'shown') {
    style = {
      opacity: 1,
      transform: 'none',
      transition: `opacity 0.8s ${EASE} ${delay}s, transform 0.8s ${EASE} ${delay}s`,
    };
  }

  return (
    <Tag ref={elementRef} className={className} style={style}>
      {children}
    </Tag>
  );
};

export default Reveal;
