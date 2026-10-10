/**
 * =========================================================================
 * SITE CONFIGURATION - EDITABLE BRAND SETTINGS
 * =========================================================================
 * Central configuration file for Mahadev Professional Care:
 * - Brand Name & Tagline
 * - Logo & Silhouette
 * - Contact Details (Phone, Email, Socials)
 * - Navigation Links
 * - Product Catalog (Matrix & L'Oreal Professional Haircare)
 * - Currency Formatting
 * - Editorial & Community Copy
 * =========================================================================
 */

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  description: string;
  volumeOrWeight?: string;
  keyIngredients?: string[];
  primaryImage: string;
  hoverImage: string;
  badge?: string;
  hasStarDecoration?: boolean;
}

export interface SocialPost {
  id: string;
  handle: string;
  image: string;
  url: string;
  caption?: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    logoSvgPath: string;
    logoViewBox: string;
    copyrightText: string;
  };
  contact: {
    phone: string;
    phoneLink: string;
    email: string;
    emailLink: string;
    instagramHandle: string;
    instagramUrl: string;
    address: string;
  };
  currency: {
    code: string;
    symbol: string;
    symbolPosition: 'left' | 'right' | 'right_space' | 'left_space';
    decimals: number;
  };
  navigation: {
    primary: Array<{
      label: string;
      href: string;
      action?: 'scroll' | 'storyModal' | 'shopScroll';
    }>;
    legal: Array<{
      id: string;
      label: string;
      title: string;
      content: string[];
    }>;
  };
  editorial: {
    hero: {
      heading: string;
      paragraph: string;
      ctaText: string;
      scrollLabel: string;
      fallbackBg: string;
      heroImage: string;
    };
    intro: {
      heading: string;
      paragraph: string;
    };
    ingredient: {
      image: string;
      altText: string;
    };
    story: {
      headingMobile: string;
      headingTablet: string;
      headingDesktop: string;
      body: string;
      ctaText: string;
    };
    community: {
      handle: string;
      titleBeforeAccent: string;
      accentText: string;
      seeMoreText: string;
    };
  };
  products: Product[];
  socialPosts: SocialPost[];
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "Mahadev Professional Care",
    shortName: "Mahadev Care",
    tagline: "Salon-Grade Hair Rituals & Professional Care",
    description: "Curated professional salon treatments from Matrix and L'Oréal Professionnel for silky, smooth, and revitalized hair.",
    logoSvgPath: "/images/site-logo.svg",
    logoViewBox: "0 0 280 120",
    copyrightText: "© Mahadev Professional Care, All rights reserved",
  },
  contact: {
    phone: "+91 98765 43210",
    phoneLink: "tel:+919876543210",
    email: "care@mahadevcare.com",
    emailLink: "mailto:care@mahadevcare.com",
    instagramHandle: "@mahadevcare",
    instagramUrl: "https://www.instagram.com/",
    address: "Mahadev Salon & Hair Studio, Main Avenue",
  },
  currency: {
    code: "INR",
    symbol: "₹",
    symbolPosition: "left_space",
    decimals: 0,
  },
  navigation: {
    primary: [
      { label: "Our story", href: "#story", action: "storyModal" },
      { label: "Shop", href: "#shop", action: "shopScroll" },
    ],
    legal: [
      {
        id: "shipping",
        label: "Shipping & returns",
        title: "Shipping & Delivery Policy",
        content: [
          "All orders of authentic Matrix and L'Oréal professional hair treatments are dispatched within 24 hours in secure, temperature-controlled salon packaging.",
          "Enjoy complimentary priority delivery on all haircare orders above ₹999.",
          "Hassle-free 7-day replacement guarantee on any sealed and unopened salon products."
        ]
      },
      {
        id: "privacy",
        label: "Privacy policy",
        title: "Privacy & Data Protection",
        content: [
          "Your privacy is paramount. We only collect the minimal details necessary to fulfill your salon orders.",
          "Payment processing is protected by 256-bit SSL encryption.",
          "We never share or monetize customer data with third parties."
        ]
      },
      {
        id: "terms",
        label: "Terms & conditions",
        title: "Terms & Professional Care Guidelines",
        content: [
          "All products sold by Mahadev Professional Care are 100% genuine and sourced directly through authorized salon distribution channels.",
          "For best results with hair spa and intense masques, follow the instructions provided on the packaging or consult our salon specialists.",
          "Promotional offers and bundle pricing are subject to availability."
        ]
      }
    ]
  },
  editorial: {
    hero: {
      heading: "Hair care you'll\nactually keep using",
      paragraph: "Curated professional salon formulas from Matrix & L'Oréal for soft, nourished, and mirror-radiant hair.",
      ctaText: "Shop now",
      scrollLabel: "Scroll down",
      fallbackBg: "#061735",
      heroImage: "/images/homepage_hero.jpg",
    },
    intro: {
      heading: "Some days are\nquick. Some aren't",
      paragraph: "Our salon products work individually, and they also sit well together as complete hair spa rituals.",
    },
    ingredient: {
      image: "/images/salon_treatment.jpg",
      altText: "Professional salon hair treatment results showcasing glossy, mirror-smooth hair",
    },
    story: {
      headingMobile: "Professional rituals for everyday care",
      headingTablet: "Professional rituals for everyday care",
      headingDesktop: "Professional rituals for everyday care.",
      body: "Powered by Matrix advanced color-care and L'Oréal Pro-Keratin technology for restored hair vitality and salon-grade perfection.",
      ctaText: "Learn more",
    },
    community: {
      handle: "@mahadevcare",
      titleBeforeAccent: "Let's connect through",
      accentText: "#ProfessionalCare",
      seeMoreText: "See more",
    },
  },
  products: [
    {
      id: "matrix-shampoo-conditioner",
      name: "Matrix Shampoo & Conditioner",
      subtitle: "Color Obsessed Total Results Duo Set",
      price: 850,
      description: "Professional salon-grade shampoo and conditioner duo designed to gently cleanse and deeply condition while locking in brilliant color vibrancy, moisture, and mirror shine.",
      volumeOrWeight: "300ml + 300ml",
      keyIngredients: ["Antioxidant Vitamin E", "Sunflower Seed Oil", "Micro-lipid Nourishers", "Hydrolyzed Silk"],
      primaryImage: "/images/matrix_shampoo.jpg",
      hoverImage: "/images/shampoo_texture.jpg",
      badge: "Salon Favorite",
    },
    {
      id: "loreal-xtenso-care",
      name: "L'Oréal X-Tenso Care Shampoo & Masque",
      subtitle: "Nutri-Reconstructor Pro-Keratin + Incell System",
      price: 1450,
      description: "Specially formulated for chemically straightened, smoothed, or rebonded hair. Infused with Pro-Keratin and Incell technology to restore lost lipids, eliminate frizz, and reinforce hair fiber from core to cuticle.",
      volumeOrWeight: "250ml + 250ml",
      keyIngredients: ["Pro-Keratin Complex", "Incell Lipid Technology", "Botanical Amino Acids", "Wheat Protein"],
      primaryImage: "/images/loreal_xtenso.jpg",
      hoverImage: "/images/hair_spa_texture.jpg",
      badge: "Bestseller",
    },
    {
      id: "matrix-hair-spa",
      name: "Matrix Hair Spa",
      subtitle: "Deep Nourishing Creambath with Shea Butter & Argan Oil",
      price: 950,
      description: "An intensive salon creambath treatment that penetrates deep into dry, damaged hair cuticles to deliver weightless moisture, supple softness, and long-lasting salon shine.",
      volumeOrWeight: "500ml",
      keyIngredients: ["Pure Shea Butter", "Cold-Pressed Moroccan Argan Oil", "Centella Asiatica", "Conditioning Cationics"],
      primaryImage: "/images/matrix_hair_spa.jpg",
      hoverImage: "/images/hair_spa_texture.jpg",
      hasStarDecoration: true,
    },
    {
      id: "loreal-hair-spa",
      name: "L'Oréal Hair Spa",
      subtitle: "Deep Nourishing Creambath with Water Lily",
      price: 1200,
      description: "The iconic professional salon hair spa creambath enriched with Water Lily and purified water. Delivers long-lasting hydration, instant detangling, and restorative shine for dry, stressed hair.",
      volumeOrWeight: "490g",
      keyIngredients: ["Water Lily Extract", "Purified Alpine Water", "Hydrating Glycerin", "Smoothing Lipids"],
      primaryImage: "/images/loreal_hair_spa.jpg",
      hoverImage: "/images/hair_spa_texture.jpg",
      badge: "Classic",
    },
    {
      id: "matrix-hair-serum",
      name: "Matrix Hair Serum",
      subtitle: "Oil Wonders Indian Amla Nourishing Serum",
      price: 650,
      description: "Lightweight, non-greasy professional salon smoothing serum infused with Indian Amla oil. Tames unruly frizz, seals split ends, and provides heat defense with a brilliant touchable finish.",
      volumeOrWeight: "100ml",
      keyIngredients: ["Indian Amla Oil", "Sweet Almond Elixir", "Cyclopentasiloxane", "Thermal Guard Silicones"],
      primaryImage: "/images/matrix_serum.jpg",
      hoverImage: "/images/hair_serum_texture.jpg",
    },
    {
      id: "loreal-hair-serum",
      name: "L'Oréal Hair Serum",
      subtitle: "Mythic Oil Luminous Golden Elixir",
      price: 1150,
      description: "Legendary professional salon hair perfecting oil serum enriched with precious botanical oils. Disciplines rebellious strands and leaves hair touchably silky with high-gloss mirror reflections.",
      volumeOrWeight: "100ml",
      keyIngredients: ["Avocado Oil Extract", "Grape Seed Oil", "Vitamin E Acetate", "Light-Reflecting Mica Lipids"],
      primaryImage: "/images/loreal_serum.jpg",
      hoverImage: "/images/hair_serum_texture.jpg",
      badge: "Luxury",
    },
  ],
  socialPosts: [
    {
      id: "post-1",
      handle: "@salon_glow",
      image: "/images/social-1.png",
      url: "https://www.instagram.com/",
      caption: "Matrix Color Obsessed transformation ✨",
    },
    {
      id: "post-2",
      handle: "@loreal_rituals",
      image: "/images/social-2.png",
      url: "https://www.instagram.com/",
      caption: "Deep nourishing hair spa session 🤍",
    },
    {
      id: "post-3",
      handle: "@hair_perfection",
      image: "/images/social-3.png",
      url: "https://www.instagram.com/",
      caption: "Mythic Oil shine never fails 💫",
    },
  ],
};

/**
 * Format currency helper using siteConfig
 */
export function formatPrice(amount: number): string {
  const { symbol, symbolPosition, decimals } = siteConfig.currency;
  const formatted = amount.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  switch (symbolPosition) {
    case 'left':
      return `${symbol}${formatted}`;
    case 'left_space':
      return `${symbol} ${formatted}`;
    case 'right':
      return `${formatted}${symbol}`;
    case 'right_space':
    default:
      return `${symbol}\u00A0${formatted}`;
  }
}
