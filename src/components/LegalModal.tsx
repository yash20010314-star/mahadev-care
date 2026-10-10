import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { X } from 'lucide-react';

interface LegalModalProps {
  activeTabId: string | null;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  activeTabId,
  onClose,
  onSelectTab,
}) => {
  if (!activeTabId) return null;

  const { legal } = siteConfig.navigation;
  const currentDoc = legal.find((doc) => doc.id === activeTabId) || legal[0];

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
          aria-label="Close legal modal"
        >
          <X size={18} />
        </button>

        {/* Legal tab buttons */}
        <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {legal.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === currentDoc.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                fontSize: '15px',
                fontWeight: item.id === currentDoc.id ? 600 : 400,
                color: item.id === currentDoc.id ? 'var(--color-blue-accent)' : 'var(--color-text-muted)',
                borderBottom: item.id === currentDoc.id ? '2px solid var(--color-blue-accent)' : '2px solid transparent',
                paddingBottom: '8px',
                marginBottom: '-13px',
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '20px' }}>
          {currentDoc.title}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {currentDoc.content.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="cart-checkout-btn"
            style={{ width: 'auto', padding: '8px 24px' }}
            onClick={onClose}
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
