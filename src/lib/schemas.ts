
import * as z from "zod";
import { CATEGORIES } from "./constants";

const categorySlugs = CATEGORIES.map(c => c.slug) as [string, ...string[]]; // Ensure at least one value for enum

export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  price: z.coerce.number({ invalid_type_error: "Price must be a number." }).positive("Price must be a positive number.").min(0.01, "Price must be at least 0.01."),
  categorySlug: z.enum(categorySlugs, {
    errorMap: () => ({ message: "Please select a valid category." }),
  }),
  stock: z.coerce.number({ invalid_type_error: "Stock must be a number." }).int("Stock must be a whole number.").min(0, "Stock cannot be negative."),
  images: z.string()
    .min(1, "At least one image URL is required.")
    .refine(value => value.split(',').every(url => {
      try {
        new URL(url.trim());
        return true;
      } catch {
        return false;
      }
    }), "Please provide valid, comma-separated URLs.")
    .transform(val => val.split(',').map(s => s.trim()).filter(s => s.length > 0 && s.startsWith('http'))),
  metalType: z.string().optional().default(''),
  karat: z.string().optional().default(''),
  weight: z.string().optional().default(''),
  dimensions: z.string().optional().default(''),
  sku: z.string().min(1, "SKU is required."), // Made SKU explicitly required
  tags: z.string().optional().transform(val => val ? val.split(',').map(s => s.trim()).filter(s => s.length > 0) : undefined),
  // Gemstones and details could be more complex; for now, they are not directly editable in this basic form.
  // avgRating: z.number().optional(), // Not typically set in form
  // reviewCount: z.number().optional(), // Not typically set in form
});

export type ProductFormValues = z.infer<typeof productSchema>;
