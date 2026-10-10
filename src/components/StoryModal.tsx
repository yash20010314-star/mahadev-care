import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { X } from 'lucide-react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '36px 32px' }}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close story dialog"
        >
          <X size={18} />
        </button>

        <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-blue-accent)' }}>
          Salon Heritage & Excellence
        </span>
        <h2 style={{ fontSize: '28px', fontWeight: 500, margin: '8px 0 20px', lineHeight: 1.15 }}>
          The Philosophy of Mahadev Professional Care
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          <p>
            At <strong>{siteConfig.brand.name}</strong>, we believe professional hair care is an art form. Every strand of hair deserves precision nourishment, scientific formulation, and authentic salon-grade restorative treatment.
          </p>
          <p>
            We curate and supply the finest hair spa creambaths, nutrient-dense reconstructors, color-preservation systems, and smoothing elixirs from global icons <em>Matrix Professional</em> and <em>L'Oréal Professionnel</em>.
          </p>
          <p>
            Whether your hair needs intensive deep repair with a relaxing creambath spa, smoothing and frizz control with Pro-Keratin X-Tenso Care, or lightweight luminous shine with golden serum elixirs, our collections deliver transformative salon results you can feel from the first touch.
          </p>
        </div>

        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            100% Authentic Salon Grade • Mahadev Professional Care
          </span>
          <button
            type="button"
            className="cart-checkout-btn"
            style={{ width: 'auto', padding: '10px 24px' }}
            onClick={onClose}
          >
            Explore the Collection
          </button>
        </div>
      </div>
    </div>
  );
};
