import React from 'react';
import { siteConfig } from '../config/siteConfig';

interface HeroProps {
  onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  const { hero } = siteConfig.editorial;

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onShopClick();
  };

  return (
    <section className="hero" data-logo="white" data-header-tone="light" id="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${hero.heroImage})` }}
        role="img"
        aria-label="Editorial photograph for natural body care rituals"
      />
      <div className="hero-overlay" />

      <div className="hero-copy">
        <h1>{hero.heading}</h1>
        <p>{hero.paragraph}</p>
        <button
          type="button"
          className="hero-cta"
          onClick={onShopClick}
        >
          <img
            src="/images/front.png"
            alt=""
            className="cta-star"
            aria-hidden="true"
          />
          <span>{hero.ctaText}</span>
        </button>
      </div>

      <a
        href="#shop"
        className="hero-scroll-btn"
        onClick={handleScrollClick}
        aria-label="Scroll down to products"
      >
        <span>{hero.scrollLabel}</span>
      </a>
    </section>
  );
};
