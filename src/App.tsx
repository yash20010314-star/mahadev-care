import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScrollLogo } from './components/ScrollLogo';
import { FloatingStars } from './components/FloatingStars';
import { ProductGrid } from './components/ProductGrid';
import { IngredientBanner } from './components/IngredientBanner';
import { StorySocial } from './components/StorySocial';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { StoryModal } from './components/StoryModal';
import { LegalModal } from './components/LegalModal';
import type { Product } from './config/siteConfig';

export const AppContent: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<string | null>(null);

  // Check URL query param for ?tab=shipping|privacy|terms matching reference interaction
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab && ['shipping', 'privacy', 'terms'].includes(tab)) {
      setLegalTab(tab);
    }
  }, []);

  const handleShopScroll = () => {
    const el = document.getElementById('shop');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="zg-elementor-home" className="home-wrapper">
      {/* Decorative floating stars */}
      <FloatingStars />

      {/* Signature dynamic scrolling logo stack */}
      <ScrollLogo />

      {/* Fixed adaptive tone header */}
      <Header onOpenStory={() => setIsStoryOpen(true)} />

      {/* Hero section */}
      <Hero onShopClick={handleShopScroll} />

      {/* Main product showcase */}
      <main>
        <ProductGrid onSelectProduct={(prod) => setSelectedProduct(prod)} />

        {/* Full-width ingredient photography */}
        <IngredientBanner />

        {/* Story & community vertical gradient section */}
        <StorySocial onLearnMore={() => setIsStoryOpen(true)} />

        {/* Footer with docking anchor */}
        <Footer
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onOpenStory={() => setIsStoryOpen(true)}
          onOpenLegal={(tabId) => setLegalTab(tabId)}
        />
      </main>

      {/* Cart drawer overlay & slide-out */}
      <CartDrawer />

      {/* Interactive product quick-view modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Brand story modal */}
      <StoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

      {/* Legal terms & policies modal */}
      <LegalModal
        activeTabId={legalTab}
        onClose={() => setLegalTab(null)}
        onSelectTab={(tabId) => setLegalTab(tabId)}
      />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
