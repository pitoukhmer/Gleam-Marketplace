
"use client";

import ProductForm from "@/components/admin/ProductForm";
import { useProductAdmin } from "@/hooks/useProductAdmin";
import type { ProductFormValues } from "@/lib/schemas";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Product } from "@/types";
import { Loader2 } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";


export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = typeof params.productId === 'string' ? params.productId : undefined;
  
  const { getProductById, updateProduct, loading: productsLoading } = useProductAdmin();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productId && !productsLoading) {
      const fetchedProduct = getProductById(productId);
      setProduct(fetchedProduct);
      setIsLoading(false);
    } else if (!productId) {
        setIsLoading(false); // No ID, so nothing to load
    }
  }, [productId, getProductById, productsLoading]);

  const handleSubmit = async (data: ProductFormValues) => {
    if (!productId) return;
    // ProductFormValues matches Partial<Omit<Product, 'id'>> for updateProduct
    // The ProductFormValues from productSchema already transforms images/tags to string[]
    updateProduct(productId, data);
    router.push("/admin/products");
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!product) {
    return <div className="text-center py-10 text-destructive">Product not found.</div>;
  }
  
  // Pass the 'product' object directly. 
  // ProductForm's defaultValues prop expects Partial<Product>, 
  // and it will handle converting product.images (string[]) and product.tags (string[] | undefined)
  // into comma-separated strings for its internal form fields.
  // const defaultValuesForForm = { // OLD, INCORRECT WAY
  //   ...product,
  //   images: product.images.join(', '), 
  //   tags: product.tags?.join(', '), 
  // };


  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Admin</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/products">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
           <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit: {product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ProductForm onSubmit={handleSubmit} defaultValues={product} isEditing={true} />
    </div>
  );
}
