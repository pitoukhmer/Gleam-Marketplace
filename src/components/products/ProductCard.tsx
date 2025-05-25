
"use client";
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import WishlistButton from '@/components/wishlist/WishlistButton';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col bg-card">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} className="block">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
            data-ai-hint={`${product.categorySlug.slice(0,-1)} jewelry`}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-1">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-2 capitalize">{product.metalType} {product.karat}</p>
        {product.avgRating && (
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(product.avgRating!) ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`}
              />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
        )}
        <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t border-border">
        <Link href={`/products/${product.id}`} passHref>
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
        <WishlistButton product={product} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
