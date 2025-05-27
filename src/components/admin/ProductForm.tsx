
"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormValues } from "@/lib/schemas";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => Promise<void> | void;
  defaultValues?: Partial<Product>;
  isEditing?: boolean;
}

export default function ProductForm({ onSubmit, defaultValues, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      price: defaultValues?.price || 0,
      categorySlug: defaultValues?.categorySlug || CATEGORIES[0]?.slug || "",
      stock: defaultValues?.stock || 0,
      images: defaultValues?.images?.join(', ') || "", // Join for textarea
      metalType: defaultValues?.metalType || "",
      karat: defaultValues?.karat || "",
      weight: defaultValues?.weight || "",
      dimensions: defaultValues?.dimensions || "",
      sku: defaultValues?.sku || "",
      tags: defaultValues?.tags?.join(', ') || "", // Join for input
    },
  });

  const handleSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    setIsSubmitting(true);
    await onSubmit(data);
    setIsSubmitting(false);
    // Optionally, redirect after submit, e.g., router.push('/admin/products');
  };

  return (
    <Card className="max-w-2xl mx-auto bg-card">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{isEditing ? "Edit Product" : "Add New Product"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl><Input placeholder="e.g., Classic Gold Band" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea placeholder="Detailed product description..." {...field} rows={4} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl><Input type="number" step="0.01" placeholder="e.g., 499.99" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="stock" render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 15" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            
            <FormField control={form.control} name="categorySlug" render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map(category => (
                      <SelectItem key={category.slug} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="sku" render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl><Input placeholder="e.g., GLD-RNG-001" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <FormField control={form.control} name="images" render={({ field }) => (
              <FormItem>
                <FormLabel>Image URLs (comma-separated)</FormLabel>
                <FormControl><Textarea placeholder="https://example.com/image1.png, https://example.com/image2.png" {...field} rows={3} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <h3 className="text-lg font-medium text-foreground pt-4 border-b pb-2">Optional Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="metalType" render={({ field }) => (
                <FormItem>
                    <FormLabel>Metal Type</FormLabel>
                    <FormControl><Input placeholder="e.g., Gold, Platinum" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="karat" render={({ field }) => (
                <FormItem>
                    <FormLabel>Karat (if applicable)</FormLabel>
                    <FormControl><Input placeholder="e.g., 18K, 22K" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="weight" render={({ field }) => (
                <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl><Input placeholder="e.g., 5g, 2.5dwt" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="dimensions" render={({ field }) => (
                <FormItem>
                    <FormLabel>Dimensions</FormLabel>
                    <FormControl><Input placeholder="e.g., 2cm x 1cm, 25mm diameter" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
            </div>
             <FormField control={form.control} name="tags" render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (comma-separated)</FormLabel>
                <FormControl><Input placeholder="e.g., classic, wedding, luxury" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Save Changes" : "Add Product"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
