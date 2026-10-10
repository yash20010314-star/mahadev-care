import React from 'react';
import { siteConfig, type Product } from '../config/siteConfig';

interface FooterProps {
  onSelectProduct: (product: Product) => void;
  onOpenStory: () => void;
  onOpenLegal: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectProduct,
  onOpenStory,
  onOpenLegal,
}) => {
  const { brand, contact, products, navigation } = siteConfig;

  const handlePageClick = (e: React.MouseEvent, href: string, action?: string) => {
    e.preventDefault();
    if (action === 'storyModal' || href === '#story') {
      onOpenStory();
      return;
    }
    if (href === '#shop') {
      const el = document.getElementById('shop');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (href === '#hero' || href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  };

  return (
    <footer
      className="footer"
      data-logo="footer-black"
      data-header-tone="dark"
      aria-label="Site footer"
    >
      <div className="footer-inner">
        {/* Decorative sparkles matching reference */}
        <img
          src="/images/sparkle.png"
          alt=""
          className="footer-sparkle footer-sparkle-1"
          aria-hidden="true"
        />
        <img
          src="/images/sparkle.png"
          alt=""
          className="footer-sparkle footer-sparkle-2"
          aria-hidden="true"
        />

        <div className="footer-brand">
          {/* Moving logo docks directly over this anchor */}
          <div className="footer-logo-anchor" aria-label={brand.name}>
            <img
              src="/images/site-logo.svg"
              alt={brand.name}
              className="footer-logo-placeholder"
            />
          </div>
          <p className="footer-copy">
            {brand.copyrightText}
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer Navigation">
          {/* Products Column */}
          <div className="footer-group">
            <p className="footer-label">Products</p>
            <div className="footer-links">
              {products.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="footer-link"
                  onClick={() => onSelectProduct(p)}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Pages Column */}
          <div className="footer-group">
            <p className="footer-label">Pages</p>
            <div className="footer-links">
              <button
                type="button"
                className="footer-link"
                onClick={(e) => handlePageClick(e, '#hero')}
              >
                Home
              </button>
              <button
                type="button"
                className="footer-link"
                onClick={onOpenStory}
              >
                Our story
              </button>
              <button
                type="button"
                className="footer-link"
                onClick={(e) => handlePageClick(e, '#shop')}
              >
                Shop
              </button>
              {navigation.legal.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="footer-link"
                  onClick={() => onOpenLegal(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contacts Column */}
          <div className="footer-group">
            <p className="footer-label">Contacts</p>
            <div className="footer-contact">
              <a className="footer-link" href={contact.phoneLink}>
                {contact.phone}
              </a>
              <a className="footer-link" href={contact.emailLink}>
                {contact.email}
              </a>
              <a
                className="footer-link"
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.instagramHandle}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  );
};
