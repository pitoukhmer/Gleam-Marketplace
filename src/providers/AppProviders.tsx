
"use client";
import type { ReactNode } from 'react';
import { WishlistProvider } from '@/contexts/WishlistContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <WishlistProvider>
      {children}
    </WishlistProvider>
  );
}
