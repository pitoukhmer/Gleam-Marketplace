
import type { Category, Product, Review } from '@/types';

export const CATEGORIES: Category[] = [
  { slug: 'rings', name: 'Rings', image: 'https://placehold.co/600x400.png', description: 'Explore our stunning collection of gold rings.', dataAiHint: 'gold ring' },
  { slug: 'necklaces', name: 'Necklaces', image: 'https://placehold.co/600x400.png', description: 'Adorn yourself with beautiful gold necklaces.', dataAiHint: 'gold necklace' },
  { slug: 'earrings', name: 'Earrings', image: 'https://placehold.co/600x400.png', description: 'Discover elegant gold earrings for every occasion.', dataAiHint: 'gold earrings' },
  { slug: 'bracelets', name: 'Bracelets', image: 'https://placehold.co/600x400.png', description: 'Chic and timeless gold bracelets.', dataAiHint: 'gold bracelet' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Gold Band',
    description: 'A timeless 18K yellow gold band, perfect for everyday elegance or as a wedding ring. Smooth, polished finish.',
    price: 499.99,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    categorySlug: 'rings',
    metalType: 'Gold',
    karat: '18K',
    weight: '4g',
    dimensions: '3mm width',
    sku: 'GLD-RNG-001',
    stock: 15,
    avgRating: 4.5,
    reviewCount: 25,
    tags: ['classic', 'wedding', 'everyday'],
    details: { 'Purity': '18 Karat Gold', 'Hallmark': 'Certified 750' }
  },
  {
    id: '2',
    name: 'Diamond Solitaire Necklace',
    description: 'Exquisite 0.5 carat diamond pendant on a 14K white gold chain. A statement of pure sophistication.',
    price: 1299.00,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    categorySlug: 'necklaces',
    metalType: 'Gold',
    karat: '14K',
    weight: '3.5g',
    gemstones: [{ type: 'Diamond', carat: '0.5ct', cut: 'Brilliant', clarity: 'VS1', color: 'G' }],
    sku: 'GLD-NKL-001',
    stock: 8,
    avgRating: 4.8,
    reviewCount: 18,
    tags: ['diamond', 'solitaire', 'luxury'],
    details: { 'Certificate': 'GIA Certified Diamond', 'Chain Length': '18 inches' }
  },
  {
    id: '3',
    name: 'Gold Hoop Earrings',
    description: 'Elegant 22K gold hoop earrings with a modern twist. Lightweight and comfortable for all-day wear.',
    price: 350.00,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    categorySlug: 'earrings',
    metalType: 'Gold',
    karat: '22K',
    weight: '5g (pair)',
    dimensions: '25mm diameter',
    sku: 'GLD-EAR-001',
    stock: 20,
    avgRating: 4.2,
    reviewCount: 30,
    tags: ['hoops', 'modern', 'statement'],
    details: { 'Purity': '22 Karat Gold', 'Fastening': 'Secure Clasp' }
  },
  {
    id: '4',
    name: 'Emerald Cut Ring',
    description: 'Stunning 18K rose gold ring featuring a vibrant emerald cut gemstone, surrounded by pave diamonds.',
    price: 2500.00,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    categorySlug: 'rings',
    metalType: 'Gold',
    karat: '18K',
    weight: '6g',
    gemstones: [
      { type: 'Emerald', carat: '1.5ct', cut: 'Emerald' },
      { type: 'Diamond', carat: '0.3ct total', cut: 'Round' }
    ],
    sku: 'GLD-RNG-002',
    stock: 5, // Unique piece
    avgRating: 4.9,
    reviewCount: 12,
    tags: ['emerald', 'rose gold', 'luxury', 'engagement'],
    details: { 'Main Stone': 'Natural Emerald', 'Side Stones': 'Natural Diamonds', 'Purity': '18 Karat Gold' }
  },
   {
    id: '5',
    name: 'Delicate Gold Chain Bracelet',
    description: 'A fine 14K yellow gold chain bracelet, perfect for layering or wearing alone for a subtle touch of luxury.',
    price: 250.50,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    categorySlug: 'bracelets',
    metalType: 'Gold',
    karat: '14K',
    weight: '2.5g',
    dimensions: '7 inches length, 1mm width',
    sku: 'GLD-BRC-001',
    stock: 25,
    avgRating: 4.6,
    reviewCount: 15,
    tags: ['delicate', 'layering', 'minimalist'],
    details: { 'Clasp Type': 'Spring Ring', 'Purity': '14 Karat Gold' }
  },
];

export const REVIEWS: Review[] = [
  { id: 'r1', productId: '1', author: 'Alice Wonderland', rating: 5, comment: 'Absolutely beautiful and fits perfectly. The quality is outstanding!', date: '2023-10-15T10:00:00Z', avatar: 'https://placehold.co/40x40.png' },
  { id: 'r2', productId: '1', author: 'Bob The Builder', rating: 4, comment: 'Very happy with this purchase. It\'s a classic piece that goes with everything.', date: '2023-10-20T14:30:00Z', avatar: 'https://placehold.co/40x40.png' },
  { id: 'r3', productId: '2', author: 'Charlie Brown', rating: 5, comment: 'The diamond sparkles brilliantly! My wife loved it.', date: '2023-11-01T09:15:00Z', avatar: 'https://placehold.co/40x40.png' },
  { id: 'r4', productId: '3', author: 'Diana Prince', rating: 3, comment: 'Nice earrings, but a bit smaller than I expected from the photos.', date: '2023-11-05T16:45:00Z', avatar: 'https://placehold.co/40x40.png' },
  { id: 'r5', productId: '4', author: 'Edward Scissorhands', rating: 5, comment: 'Truly a work of art. The emerald is mesmerizing.', date: '2024-01-10T12:00:00Z', avatar: 'https://placehold.co/40x40.png' },
];

// Add data-ai-hint to product images
PRODUCTS.forEach(product => {
  const hint = product.categorySlug.slice(0, -1); // e.g. "ring", "necklace"
  product.images = product.images.map(img => `${img}?data-ai-hint=${encodeURIComponent(hint)}`);
});

REVIEWS.forEach(review => {
  if (review.avatar) {
    review.avatar = `${review.avatar}?data-ai-hint=person avatar`
  }
});

CATEGORIES.forEach(category => {
  if (category.image) {
    category.image = `${category.image}?data-ai-hint=${encodeURIComponent(category.dataAiHint || category.name.toLowerCase())}`;
  }
});

