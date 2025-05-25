
"use client";

import Link from 'next/link';
import { useWishlist } from '@/hooks/useWishlist';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { HeartCrack } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="space-y-8">
       <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Wishlist</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-10">
          <HeartCrack className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground mb-4">Your wishlist is currently empty.</p>
          <p className="text-muted-foreground mb-6">Explore our collections and add your favorite pieces!</p>
          <Link href="/" passHref>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Discover Jewelry
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
