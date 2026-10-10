import React from 'react';
import { siteConfig, formatPrice, type Product } from '../config/siteConfig';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

interface ProductGridProps {
  onSelectProduct: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onSelectProduct }) => {
  const { addItem } = useCart();
  const { products } = siteConfig;
  const { intro } = siteConfig.editorial;

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <section className="products" id="shop" data-logo="solid-black" data-header-tone="dark">
      <div className="products-inner">
        <div className="product-cards-grid">
          {products.map((product) => (
            <article key={product.id} className="p-card">
              <div
                className="p-frame has-hover"
                role="button"
                tabIndex={0}
                onClick={() => onSelectProduct(product)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProduct(product);
                  }
                }}
                aria-label={`View details for ${product.name}`}
              >
                <img
                  className="p-img p-img--primary"
                  src={product.primaryImage}
                  alt={product.name}
                  loading="lazy"
                />
                <img
                  className="p-img p-img--hover"
                  src={product.hoverImage}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />

                {/* Decorative stars as seen on specific products in the reference */}
                {product.hasStarDecoration && (
                  <>
                    <img
                      src="/images/sparkle.png"
                      alt=""
                      className="card-star card-star-top"
                      aria-hidden="true"
                    />
                    <img
                      src="/images/sparkle.png"
                      alt=""
                      className="card-star card-star-bottom"
                      aria-hidden="true"
                    />
                  </>
                )}
              </div>

              <div className="p-meta">
                <h3>
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="product-title-btn"
                  >
                    {product.name}
                  </button>
                </h3>
                <div className="price">{formatPrice(product.price)}</div>
                <p>{product.subtitle}</p>
                <div className="p-card-actions">
                  <button
                    type="button"
                    className="quick-add-btn"
                    onClick={(e) => handleQuickAdd(e, product)}
                    aria-label={`Quick add ${product.name} to cart`}
                  >
                    <Plus size={14} /> Add to Cart
                  </button>
                  <button
                    type="button"
                    className="quick-add-btn"
                    style={{ color: 'var(--color-text-muted)' }}
                    onClick={() => onSelectProduct(product)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="products-intro">
          <h2>{intro.heading}</h2>
          <p>{intro.paragraph}</p>
        </div>
      </div>
    </section>
  );
};
