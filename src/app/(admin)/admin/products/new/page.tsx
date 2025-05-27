
"use client";

import ProductForm from "@/components/admin/ProductForm";
// import { useProductAdmin } from "@/hooks/useProductAdmin"; // No longer using client-side context for add
import type { ProductFormValues } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { addProductToFirestore } from "@/actions/productActions"; // Import the server action

export default function AddProductPage() {
  // const { addProduct } = useProductAdmin(); // Replaced with server action
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: ProductFormValues) => {
    const result = await addProductToFirestore(data);

    if (result.success) {
      toast({
        title: "Product Added",
        description: `${data.name} has been successfully added to the database.`,
      });
      router.push("/admin/products"); // Redirect to product list after successful addition
    } else {
      toast({
        title: "Error Adding Product",
        description: result.error || "An unknown error occurred.",
        variant: "destructive",
      });
    }
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
