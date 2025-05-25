
"use client";

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/useWishlist';
import type { Product } from '@/types';

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

const WishlistButton = ({ product, className }: WishlistButtonProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking button inside card
    e.preventDefault();
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleWishlist}
      className={className}
      aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-primary text-primary' : 'text-foreground'}`} />
    </Button>
  );
};

export default WishlistButton;
