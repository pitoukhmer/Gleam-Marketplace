
import Link from 'next/link';
import { PRODUCTS } from '@/lib/constants';
import VirtualTryOnClient from '@/components/features/VirtualTryOnClient';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { AlertTriangle } from 'lucide-react';

interface VirtualTryOnPageProps {
  params: {
    productId: string;
  };
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    productId: product.id,
  }));
}

export default function VirtualTryOnPage({ params }: VirtualTryOnPageProps) {
  const product = PRODUCTS.find((p) => p.id === params.productId);

  if (!product) {
    return (
      <div className="text-center py-10">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">The product you're trying to virtually try on doesn't exist.</p>
        <Link href="/" className="text-primary hover:underline">Return to Homepage</Link>
      </div>
    );
  }
  
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
            <BreadcrumbLink asChild>
              <Link href={`/category/${product.categorySlug}`}>
                 {product.categorySlug.charAt(0).toUpperCase() + product.categorySlug.slice(1)}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Virtual Try-On</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <VirtualTryOnClient product={product} />
    </div>
  );
}

