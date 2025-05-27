
"use client";

import type { Product } from '@/types';
import { PRODUCTS as initialProducts } from '@/lib/constants';
import React, { createContext, useState, useEffect, useContext, type ReactNode, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

// Ensure initialProducts are deep-copied to prevent mutation of constants
const getInitialProducts = () => JSON.parse(JSON.stringify(initialProducts));

interface ProductAdminContextType {
  products: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'avgRating' | 'reviewCount'>) => void;
  updateProduct: (productId: string, productData: Partial<Omit<Product, 'id'>>) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;
  loading: boolean;
}

export const ProductAdminContext = createContext<ProductAdminContextType | undefined>(undefined);

export const ProductAdminProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(getInitialProducts);
  const [loading, setLoading] = useState(true); // To handle initial load if we were fetching
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you might fetch products here.
    // For now, we're using the initialProducts from constants.
    setProducts(getInitialProducts());
    setLoading(false);
  }, []);

  const addProduct = useCallback((productData: Omit<Product, 'id' | 'avgRating' | 'reviewCount'>) => {
    setProducts((prevProducts) => {
      const newProduct: Product = {
        id: String(Date.now() + Math.random()), // Simple unique ID
        avgRating: undefined, // New products start without ratings
        reviewCount: undefined,
        ...productData,
        images: productData.images && productData.images.length > 0 ? productData.images : ['https://placehold.co/600x400.png?text=New+Product'],
      };
      toast({ title: "Product Added", description: `${newProduct.name} has been added.` });
      return [...prevProducts, newProduct];
    });
  }, [toast]);

  const updateProduct = useCallback((productId: string, productData: Partial<Omit<Product, 'id'>>) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map(p =>
        p.id === productId ? { ...p, ...productData } : p
      );
      const productName = updatedProducts.find(p => p.id === productId)?.name || 'Product';
      toast({ title: "Product Updated", description: `${productName} has been updated.` });
      return updatedProducts;
    });
  }, [toast]);

  const deleteProduct = useCallback((productId: string) => {
    setProducts((prevProducts) => {
      const productToDelete = prevProducts.find(p => p.id === productId);
      if (productToDelete) {
        toast({ title: "Product Deleted", description: `${productToDelete.name} has been deleted.`, variant: "destructive" });
      }
      return prevProducts.filter(p => p.id !== productId);
    });
  }, [toast]);

  const getProductById = useCallback((productId: string) => {
    return products.find(p => p.id === productId);
  }, [products]);

  return (
    <ProductAdminContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductById, loading }}>
      {!loading ? children : <div>Loading admin product data...</div>}
    </ProductAdminContext.Provider>
  );
};

export const useProductAdmin = (): ProductAdminContextType => {
  const context = useContext(ProductAdminContext);
  if (context === undefined) {
    throw new Error('useProductAdmin must be used within a ProductAdminProvider');
  }
  return context;
};
