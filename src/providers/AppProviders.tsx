
"use client";
import type { ReactNode } from 'react';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ProductAdminProvider } from '@/contexts/ProductAdminContext'; // Added

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <ProductAdminProvider> {/* Added ProductAdminProvider */}
            {children}
          </ProductAdminProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
