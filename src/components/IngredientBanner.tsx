import React from 'react';
import { siteConfig } from '../config/siteConfig';

export const IngredientBanner: React.FC = () => {
  const { ingredient } = siteConfig.editorial;

  return (
    <section
      className="ingredient-section"
      data-logo="grey"
      data-header-tone="light"
      aria-label="Natural ingredient showcase"
    >
      <img
        className="ingredient-img"
        src={ingredient.image}
        alt={ingredient.altText}
        loading="lazy"
      />
    </section>
  );
};
