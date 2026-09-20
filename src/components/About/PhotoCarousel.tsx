'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import Image from 'next/image';

export interface CarouselPhoto {
  src: string;
  alt: string;
  /** `cover` fills the frame; `contain` shows the whole photo over a blurred copy of itself. */
  fit?: 'cover' | 'contain';
  /** CSS object-position for `cover`, e.g. "68% 40%" — keeps the person in frame when cropping. */
  position?: string;
  /** Extra zoom for `cover` photos where the person is small in the shot. */
  zoom?: number;
}

interface PhotoCarouselProps {
  photos: CarouselPhoto[];
  label: string;
  /** Preload the first photo — only for carousels that are visible on first paint. */
  priority?: boolean;
}

const FRAME_SIZES = '(max-width: 1024px) 90vw, 448px';

const PhotoCarousel = ({ photos, label, priority = false }: PhotoCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = photos.length;

  // Native scrolling (swipe, trackpad, arrow keys) is the source of truth; the index just follows it.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = Math.round(track.scrollLeft / track.clientWidth);
        setIndex((current) => (current === next ? current : next));
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.min(Math.max(target, 0), count - 1);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollTo({ left: clamped * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
    },
    [count]
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <div className="relative isolate aspect-[4/5] overflow-hidden rounded-[28px] bg-[#143024] shadow-[0_30px_80px_-30px_rgba(20,48,36,0.45)]">
      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        onKeyDown={onKeyDown}
        // Horizontal gestures stay native here; vertical ones still get the page's smooth scrolling.
        data-lenis-prevent-horizontal
        className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#be9227]/70"
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            // overflow-hidden: zoomed / blurred-backdrop images spill past their slide and would paint over the neighbour.
            className="relative h-full w-full shrink-0 snap-center snap-always overflow-hidden"
          >
            {photo.fit === 'contain' ? (
              <>
                {/* Decorative backdrop: a tiny, heavily blurred copy so nothing is cropped or letterboxed in black. */}
                <Image
                  src={photo.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="96px"
                  className="scale-125 object-cover blur-xl brightness-75"
                />
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority={priority && i === 0}
                  sizes={FRAME_SIZES}
                  className="object-contain"
                />
              </>
            ) : (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={priority && i === 0}
                sizes={FRAME_SIZES}
                className="object-cover"
                style={{
                  objectPosition: photo.position ?? 'center',
                  transform: photo.zoom ? `scale(${photo.zoom})` : undefined,
                  transformOrigin: photo.position ?? 'center',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          {/* Soft top shade so the progress bars stay visible over bright skies and white walls. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-black/35 to-transparent" />

          <div className="absolute inset-x-4 top-3 z-20 flex gap-1.5">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show photo ${i + 1} of ${count}`}
                aria-current={i === index}
                className="group flex h-5 flex-1 items-center"
              >
                <span
                  className={`h-1 w-full rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.45)] transition-colors duration-300 ${
                    i === index ? 'bg-white' : 'bg-white/40 group-hover:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#143024] shadow-lg hover:bg-white disabled:pointer-events-none disabled:opacity-0"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === count - 1}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#143024] shadow-lg hover:bg-white disabled:pointer-events-none disabled:opacity-0"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <p className="sr-only" aria-live="polite">
            Photo {index + 1} of {count}
          </p>
        </>
      )}
    </div>
  );
};

export default PhotoCarousel;
