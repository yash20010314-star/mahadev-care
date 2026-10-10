import React, { useEffect, useRef } from 'react';

export const ScrollLogo: React.FC = () => {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    function clamp(v: number, min: number, max: number): number {
      return Math.max(min, Math.min(max, v));
    }

    function mix(a: number, b: number, t: number): number {
      return a + (b - a) * t;
    }

    function getCanvasBounds(vw: number) {
      const productsInner = document.querySelector('.products-inner');
      if (productsInner) {
        const rect = productsInner.getBoundingClientRect();
        if (rect.width > 0) {
          return {
            left: rect.left,
            right: Math.max(0, vw - rect.right),
          };
        }
      }
      return {
        left: vw < 768 ? 18 : 24,
        right: vw < 768 ? 18 : 24,
      };
    }

    function getLogoColorName(vh: number): string {
      const footer = document.querySelector('.footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < vh * 0.85) {
          return '#050505';
        }
      }

      const ingredient = document.querySelector('.ingredient-section');
      if (ingredient) {
        const r = ingredient.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) {
          return '#9a9a9a';
        }
      }

      const gradientZone = document.querySelector('[data-logo-gradient]');
      if (gradientZone) {
        const r = gradientZone.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) {
          const t = clamp((vh * 0.7 - r.top) / r.height, 0, 1);
          if (t < 0.28) return '#9a9a9a';
          if (t < 0.62) return 'linear-gradient(135deg, #fff7eb 0%, #b67a45 42%, #5b321d 100%)';
          return 'linear-gradient(135deg, #70452c 0%, #291811 48%, #050505 100%)';
        }
      }

      const product = document.querySelector('.products');
      if (product) {
        const r = product.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) {
          return '#050505';
        }
      }

      return '#ffffff';
    }

    function logoTransform() {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const canvas = getCanvasBounds(vw);
      const marks = stack?.querySelectorAll<HTMLElement>('.brand-mark');
      const firstMark = marks ? marks[0] : null;

      const brandHeight = firstMark ? firstMark.offsetHeight || 210 : 210;
      const brandWidth = firstMark ? firstMark.offsetWidth || 340 : 340;

      const isMobile = vw < 600;
      const isTablet = vw >= 600 && vw < 1020;
      const isDesktop = vw >= 1020;

      // Initial logo scale
      const initialScale = isDesktop ? 1.24 : 1;

      // Compact scale after scrolling past hero
      const finalScale = isMobile ? 0.34 : isTablet ? 0.30 : 0.245;

      const startX = isMobile ? 12 : isTablet ? 18 : canvas.left;
      const bottomGap = vw <= 640 ? 24 : 40;

      const startY = vh - brandHeight * initialScale - bottomGap;

      const endX = isMobile ? 14 : isTablet ? 20 : canvas.left;
      const endY = vh - brandHeight * finalScale - bottomGap;

      const hero = document.querySelector<HTMLElement>('.hero');
      const heroH = hero?.offsetHeight || vh;
      const progress = clamp(window.scrollY / (heroH * 0.82), 0, 1);

      // Cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);

      let x = mix(startX, endX, ease);
      let y = mix(startY, endY, ease);
      let sc = mix(initialScale, finalScale, ease);

      // Docking near footer
      const footerAnchor = document.querySelector<HTMLElement>('.footer-logo-anchor');
      const footer = document.querySelector<HTMLElement>('.footer');

      if (footer && footerAnchor) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < vh) {
          const footerEase = clamp((vh - footerRect.top) / (vh * 0.65), 0, 1);
          const anchorRect = footerAnchor.getBoundingClientRect();

          const targetX = anchorRect.left;
          const targetY = anchorRect.top;
          const targetScale = anchorRect.width / brandWidth;

          x = mix(x, targetX, footerEase);
          y = mix(y, targetY, footerEase);
          sc = mix(sc, targetScale, footerEase);
        }
      }

      return { x, y, sc };
    }

    function setLogo() {
      if (!stack) return;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const { x, y, sc } = logoTransform();
      const canvas = getCanvasBounds(vw);

      document.documentElement.style.setProperty('--zg-content-left', `${Math.round(canvas.left)}px`);
      document.documentElement.style.setProperty('--zg-content-right', `${Math.round(canvas.right)}px`);

      stack.style.setProperty('--fallback-logo-bg', getLogoColorName(vh));

      const marks = stack.querySelectorAll<HTMLElement>('.brand-mark');
      marks.forEach((mark) => {
        mark.style.transform = `translate(${x}px, ${y}px) scale(${sc})`;
      });

      const layers = stack.querySelectorAll<HTMLElement>('.logo-layer');
      layers.forEach((layer) => {
        layer.style.opacity = '1';
        if (layer.dataset.match === 'fallback') {
          layer.style.clipPath = 'inset(0 0 0 0)';
        } else {
          layer.style.clipPath = 'inset(0 0 100% 0)';
        }
      });

      stack.style.opacity = '1';

      // Section boundary clipping
      const sections = document.querySelectorAll<HTMLElement>('[data-logo]');
      const usedCounts: Record<string, number> = {};

      sections.forEach((sec) => {
        const r = sec.getBoundingClientRect();
        const top = clamp(r.top, 0, vh);
        const bottom = clamp(r.bottom, 0, vh);

        if (bottom <= 0 || top >= vh || bottom <= top) return;

        const color = sec.dataset.logo;
        if (!color) return;

        usedCounts[color] = usedCounts[color] || 0;
        const matchingLayers = Array.from(layers).filter((l) => l.dataset.match === color);
        const layer = matchingLayers[usedCounts[color]++];

        if (layer) {
          layer.style.clipPath = `inset(${top}px 0 ${vh - bottom}px 0)`;
        }
      });

      // Gradient zone clipping and transitions
      const gradientZones = document.querySelectorAll<HTMLElement>('[data-logo-gradient]');
      gradientZones.forEach((zone) => {
        const r = zone.getBoundingClientRect();
        const top = clamp(r.top, 0, vh);
        const bottom = clamp(r.bottom, 0, vh);

        if (bottom <= 0 || top >= vh || bottom <= top) return;

        const clip = `inset(${top}px 0 ${vh - bottom}px 0)`;
        const greyLayer = Array.from(layers).find((l) => l.dataset.match === 'grey');
        const brownLayer = Array.from(layers).find((l) => l.dataset.match === 'brown');
        const blackLayer = Array.from(layers).find((l) => l.dataset.match === 'black');

        if (greyLayer && brownLayer && blackLayer) {
          greyLayer.style.clipPath = clip;
          brownLayer.style.clipPath = clip;
          blackLayer.style.clipPath = clip;

          const firstMark = marks[0];
          const logoHeight = (firstMark?.getBoundingClientRect().height || 100);
          const logoCenterY = y + logoHeight * 0.5;
          const t = clamp((logoCenterY - r.top) / r.height, 0, 1);

          const greyOpacity = clamp(1 - t * 2.1, 0, 1);
          const brownOpacity = clamp(1 - Math.abs(t - 0.42) * 3.2, 0, 1);
          const blackOpacity = clamp((t - 0.42) * 2.2, 0, 1);

          greyLayer.style.opacity = `${greyOpacity}`;
          brownLayer.style.opacity = `${brownOpacity}`;
          blackLayer.style.opacity = `${blackOpacity}`;
        }
      });
    }

    // Dynamic header tone detection
    function updateHeaderTone() {
      const sampleY = window.innerWidth <= 767 ? 88 : 44;
      const toneSections = document.querySelectorAll<HTMLElement>('[data-header-tone]');
      let tone = 'dark';

      for (let i = 0; i < toneSections.length; i++) {
        const rect = toneSections[i].getBoundingClientRect();
        if (rect.top <= sampleY && rect.bottom > sampleY) {
          tone = toneSections[i].getAttribute('data-header-tone') || 'dark';
          break;
        }
      }

      document.body.classList.toggle('zg-home-header-light', tone === 'light');
      document.body.classList.toggle('zg-home-header-dark', tone !== 'light');
    }

    let ticking = false;
    function onScrollOrResize() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setLogo();
          updateHeaderTone();
          ticking = false;
        });
        ticking = true;
      }
    }

    requestAnimationFrame(() => {
      setLogo();
      updateHeaderTone();
      stack.classList.add('ready');
    });

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <div className="logo-stack" id="logoStack" ref={stackRef} aria-hidden="true">
      <div className="logo-layer logo-fallback" data-match="fallback">
        <div className="brand-mark">
          <span className="brand-logo-shape" />
        </div>
      </div>

      <div className="logo-layer logo-white" data-match="white">
        <div className="brand-mark">
          <span className="brand-logo-shape" />
        </div>
      </div>

      <div className="logo-layer logo-solid-black" data-match="solid-black">
        <div className="brand-mark">
          <span className="brand-logo-shape" />
        </div>
      </div>

      <div className="logo-layer logo-grey" data-match="grey">
        <div className="brand-mark">
          <span className="brand-logo-shape" />
        </div>
      </div>

      <div className="logo-layer logo-brown" data-match="brown">
        <div className="brand-mark">
          <span className="brand-logo-shape" />
        </div>
      </div>

      <div className="logo-layer logo-black" data-match="black">
        <div className="brand-mark">
          <span className="brand-logo-shape" />
        </div>
      </div>

      <div className="logo-layer logo-footer-black" data-match="footer-black">
        <div className="brand-mark">
          <span className="brand-logo-shape" />
        </div>
      </div>
    </div>
  );
};
