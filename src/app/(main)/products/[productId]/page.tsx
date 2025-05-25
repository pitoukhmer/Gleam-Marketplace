
"use client"; 

import Link from 'next/link';
import { PRODUCTS, REVIEWS } from '@/lib/constants';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import ReviewList from '@/components/reviews/ReviewList';
import { Button } from '@/components/ui/button';
import WishlistButton from '@/components/wishlist/WishlistButton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, ShoppingCart, Package, Ruler, Info, Sparkles, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useCart } from '@/hooks/useCart';
import { useState, use } from 'react'; // Import use

interface ProductPageProps {
  params: { // The type from Next.js might still be the direct object
    productId: string;
  };
}

export default function ProductPage({ params: paramsAsProp }: ProductPageProps) {
  // Unwrap the params as per Next.js recommendation.
  // The error message indicates `paramsAsProp` is effectively a Promise here.
  const params = use(paramsAsProp as any);

  const product = PRODUCTS.find((p) => p.id === params.productId);
  const reviews = REVIEWS.filter((r) => r.productId === params.productId);
  const { addToCart: addProductToCart, isInCart } = useCart();

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (product) {
      addProductToCart(product, 1); // Add 1 quantity by default
    }
  };

  return (
    <div className="space-y-10">
       <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/category/${product.categorySlug}`}>
                {product.categorySlug.charAt(0).toUpperCase() + product.categorySlug.slice(1)}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <ProductImageGallery images={product.images} productName={product.name} productCategorySlug={product.categorySlug} />
        
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">{product.name}</h1>
          
          {product.avgRating && (
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(product.avgRating!) ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`} />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
          )}

          <p className="text-2xl font-semibold text-foreground">${product.price.toFixed(2)}</p>
          
          {product.stock > 0 && product.stock <= 5 && (
            <Badge variant="destructive" className="text-sm">Only {product.stock} left in stock!</Badge>
          )}
          {product.stock === 0 && (
             <Badge variant="outline" className="text-sm">Out of Stock</Badge>
          )}

          <p className="text-foreground leading-relaxed">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90" 
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> 
              {isInCart(product.id) ? "Add More to Cart" : "Add to Cart"}
            </Button>
            <WishlistButton product={product} className="w-full sm:w-auto border border-input" />
          </div>
          
          <Link href={`/virtual-try-on/${product.id}`} passHref>
            <Button variant="outline" size="lg" className="w-full text-primary border-primary hover:bg-primary/10">
              <Sparkles className="mr-2 h-5 w-5" /> Virtual Try-On
            </Button>
          </Link>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg hover:text-primary">
                <Package className="mr-2 h-5 w-5 text-primary" /> Product Details
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                {product.metalType && <p><strong>Metal:</strong> {product.metalType} {product.karat}</p>}
                {product.weight && <p><strong>Weight:</strong> {product.weight}</p>}
                {product.dimensions && <p><strong>Dimensions:</strong> {product.dimensions}</p>}
                {product.sku && <p><strong>SKU:</strong> {product.sku}</p>}
                {product.gemstones && product.gemstones.length > 0 && (
                  <div>
                    <strong>Gemstones:</strong>
                    <ul className="list-disc list-inside ml-4">
                      {product.gemstones.map((gem, idx) => (
                        <li key={idx}>{gem.type} ({gem.carat || 'N/A'}, {gem.cut || 'N/A'})</li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.details && Object.entries(product.details).map(([key, value]) => (
                  <p key={key}><strong>{key}:</strong> {value}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg hover:text-primary">
                <Info className="mr-2 h-5 w-5 text-primary" /> Authenticity & Care
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                <p className="mb-2"><CheckCircle className="inline mr-1 h-4 w-4 text-green-500" /> All our jewelry is certified authentic and made with the highest quality materials.</p>
                <p>To maintain its beauty, avoid contact with harsh chemicals and store in a dry place. Clean gently with a soft cloth.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg hover:text-primary">
                <Ruler className="mr-2 h-5 w-5 text-primary" /> Sizing Information
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                <p>Please refer to our <Link href="/sizing-guide" className="underline hover:text-primary">sizing guide</Link> to find your perfect fit. Custom sizing may be available for select items.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Customer Reviews</h2>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}
