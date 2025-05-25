

export interface Gemstone {
  type: string; // Diamond, Ruby, Emerald
  carat?: string;
  cut?: string;
  clarity?: string;
  color?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // URLs
  categorySlug: string; 
  metalType?: string; // Gold, Silver, Platinum
  karat?: string; // 14K, 18K, 22K, 24K
  weight?: string; // e.g., "5g"
  dimensions?: string; // e.g., "2cm x 1cm"
  gemstones?: Gemstone[];
  sku: string;
  stock: number;
  avgRating?: number;
  reviewCount?: number;
  tags?: string[];
  details?: Record<string, string>; // For misc details like 'Certificate: GIA Certified'
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar?: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO date string
}

export interface Category {
  slug: string;
  name: string;
  image?: string;
  description?: string;
  dataAiHint?: string;
}

// Auth Form Data Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword?: string; // Optional on server, but good for client-side validation
}
