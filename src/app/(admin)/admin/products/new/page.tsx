
"use client";

import ProductForm from "@/components/admin/ProductForm";
import { useProductAdmin } from "@/hooks/useProductAdmin";
import type { ProductFormValues } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function AddProductPage() {
  const { addProduct } = useProductAdmin();
  const router = useRouter();

  const handleSubmit = async (data: ProductFormValues) => {
    // ProductFormValues already transforms images and tags from string to array
    // The Omit type in addProduct ensures avgRating and reviewCount are not expected
    addProduct(data as Omit<ProductFormValues, 'id' | 'avgRating' | 'reviewCount'>);
    router.push("/admin/products");
  };

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
            <BreadcrumbPage>Add New Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
