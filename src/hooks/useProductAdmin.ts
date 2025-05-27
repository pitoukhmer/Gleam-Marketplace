
"use client";

import { useContext } from 'react';
import { ProductAdminContext } from '@/contexts/ProductAdminContext';
import type { Product } from '@/types'; // Assuming Product type is in @/types

// Define a more specific return type if necessary, otherwise infer from context
export interface UseProductAdminReturn {
  products: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'avgRating' | 'reviewCount'>) => void;
  updateProduct: (productId: string, productData: Partial<Omit<Product, 'id'>>) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;
  loading: boolean;
}

export const useProductAdmin = (): UseProductAdminReturn => {
  const context = useContext(ProductAdminContext);
  if (context === undefined) {
    throw new Error('useProductAdmin must be used within a ProductAdminProvider');
  }
  return context;
};
