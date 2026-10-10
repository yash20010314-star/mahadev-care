import React from 'react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../config/siteConfig';

interface HeaderProps {
  onOpenStory: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenStory }) => {
  const { totalCount, openCart } = useCart();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, action?: string) => {
    e.preventDefault();
    if (action === 'storyModal') {
      onOpenStory();
      return;
    }
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header" role="banner">
      <nav className="site-header-nav" aria-label="Primary navigation">
        {siteConfig.navigation.primary.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="nav-link"
            onClick={(e) => handleNavClick(e, item.href, item.action)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="header-cart-btn"
        onClick={openCart}
        aria-label={`Shopping cart with ${totalCount} items`}
      >
        Cart ({totalCount})
      </button>
    </header>
  );
};
