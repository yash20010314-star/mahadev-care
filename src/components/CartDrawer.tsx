import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../config/siteConfig';
import { Plus, Minus, Trash2, CheckCircle2 } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    totalCount,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [checkoutCompleted, setCheckoutCompleted] = useState(false);

  const handleCheckout = () => {
    setCheckoutCompleted(true);
    setTimeout(() => {
      clearCart();
      setCheckoutCompleted(false);
      closeCart();
    }, 2800);
  };

  const handleShopProducts = () => {
    closeCart();
    const el = document.getElementById('shop');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`cart-overlay ${isCartOpen ? 'is-open' : ''}`}
        onClick={closeCart}
        aria-hidden={!isCartOpen}
      />

      {/* Slide-out drawer */}
      <aside
        className={`cart-drawer ${isCartOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        <header className="cart-header">
          <button
            type="button"
            className="cart-close-btn"
            onClick={closeCart}
            aria-label="Close cart drawer"
          >
            Close
          </button>
          <span className="cart-title">Cart ({totalCount})</span>
        </header>

        <div className="cart-body">
          {checkoutCompleted ? (
            <div className="cart-empty">
              <CheckCircle2 size={44} color="#243dbe" />
              <h3 className="cart-empty-title">Thank you for your order!</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                This is a demo checkout. Your order has been placed in local simulation mode.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="cart-empty">
              <p className="cart-empty-title">Your cart is currently empty</p>
              <button
                type="button"
                className="cart-empty-cta"
                onClick={handleShopProducts}
              >
                Shop our products
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item-row">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="cart-item-thumb"
                  />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{product.name}</h4>
                    <span className="cart-item-price">
                      {formatPrice(product.price)}
                    </span>
                    <div className="cart-item-qty">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-count">{quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label={`Increase quantity of ${product.name}`}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cart-item-remove"
                    onClick={() => removeItem(product.id)}
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && !checkoutCompleted && (
          <footer className="cart-footer">
            <div className="cart-subtotal-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="cart-note">
              <span>Taxes, shipping and promos are </span>
              <span>calculated at checkout.</span>
            </p>
            <button
              type="button"
              className="cart-checkout-btn"
              onClick={handleCheckout}
            >
              Checkout • {formatPrice(subtotal)}
            </button>
          </footer>
        )}

        {/* Ambient brand watermark */}
        <img
          src="/images/site-logo.svg"
          alt=""
          className="cart-scene-brand"
          aria-hidden="true"
        />
      </aside>
    </>
  );
};
