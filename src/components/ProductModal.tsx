import React, { useState } from 'react';
import { formatPrice, type Product } from '../config/siteConfig';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Check } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState<'primary' | 'hover'>('primary');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close product view"
        >
          <X size={18} />
        </button>

        <div className="product-modal-grid">
          <div className="product-modal-gallery">
            <img
              src={selectedImage === 'primary' ? product.primaryImage : product.hoverImage}
              alt={product.name}
              className="product-modal-main-img"
            />
            <div className="product-modal-thumbs">
              <img
                src={product.primaryImage}
                alt="Product view"
                className={`product-modal-thumb ${selectedImage === 'primary' ? 'is-active' : ''}`}
                onClick={() => setSelectedImage('primary')}
              />
              <img
                src={product.hoverImage}
                alt="Texture view"
                className={`product-modal-thumb ${selectedImage === 'hover' ? 'is-active' : ''}`}
                onClick={() => setSelectedImage('hover')}
              />
            </div>
          </div>

          <div className="product-modal-info">
            <div>
              <h2 className="product-modal-name">{product.name}</h2>
              <p className="product-modal-subtitle">{product.subtitle}</p>
              <div className="product-modal-price">{formatPrice(product.price)}</div>
              <p className="product-modal-desc">{product.description}</p>

              {product.keyIngredients && product.keyIngredients.length > 0 && (
                <div className="product-modal-ingredients">
                  <h4>Key Ritual Ingredients</h4>
                  <div className="ingredient-tags">
                    {product.keyIngredients.map((ing) => (
                      <span key={ing} className="ingredient-tag">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Quantity:</span>
                <div className="cart-item-qty">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus size={12} />
                  </button>
                  <span className="qty-count">{quantity}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="cart-checkout-btn"
                onClick={handleAddToCart}
                disabled={addedNotice}
              >
                {addedNotice ? (
                  <>
                    <Check size={16} /> Added to Cart
                  </>
                ) : (
                  <>Add to Cart • {formatPrice(product.price * quantity)}</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
