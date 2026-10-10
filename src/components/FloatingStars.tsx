import React, { useEffect, useRef } from 'react';

export const FloatingStars: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const container = containerRef.current;
    if (!container) return;

    const stars = container.querySelectorAll<HTMLElement>('.floating-star');

    function getStarSize() {
      const vw = window.innerWidth;
      if (vw >= 1680) return 24;
      if (vw >= 1024) return 18;
      if (vw >= 768) return 20;
      return 16;
    }

    function placeStar(star: HTMLElement) {
      const width = Math.max(0, window.innerWidth - 64);
      const height = Math.max(0, window.innerHeight - 64);
      const size = getStarSize();
      const x = 16 + Math.random() * width;
      const y = 16 + Math.random() * height;

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.transform = `translate(${x}px, ${y}px)`;
    }

    const timeouts: number[] = [];

    function animateStar(star: HTMLElement) {
      placeStar(star);

      const fadeIn = 1200 + Math.random() * 700;
      const hold = 300 + Math.random() * 700;
      const fadeOut = 1200 + Math.random() * 700;
      const total = fadeIn + hold + fadeOut;

      const animation = star.animate(
        [
          { opacity: 0 },
          { opacity: 0.85, offset: fadeIn / total },
          { opacity: 0.85, offset: (fadeIn + hold) / total },
          { opacity: 0 },
        ],
        {
          duration: total,
          easing: 'ease-in-out',
          fill: 'forwards',
        }
      );

      animation.finished.finally(() => {
        const t = window.setTimeout(() => {
          animateStar(star);
        }, 200 + Math.random() * 900);
        timeouts.push(t);
      });
    }

    stars.forEach((star, index) => {
      const t = window.setTimeout(() => {
        animateStar(star);
      }, index * 600);
      timeouts.push(t);
    });

    return () => {
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div className="star-overlay" ref={containerRef} aria-hidden="true">
      <img className="floating-star" src="/images/star.png" alt="" />
      <img className="floating-star" src="/images/star.png" alt="" />
      <img className="floating-star" src="/images/star.png" alt="" />
      <img className="floating-star" src="/images/star.png" alt="" />
    </div>
  );
};
