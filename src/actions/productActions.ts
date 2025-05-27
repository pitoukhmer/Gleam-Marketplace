
'use server';

import { getAdminApp } from '@/lib/firebase-admin';
import type { ProductFormValues } from '@/lib/schemas';
import type { Product } from '@/types';

export interface AddProductToFirestoreResult {
  success: boolean;
  productId?: string;
  error?: string;
}

export async function addProductToFirestore(
  productData: ProductFormValues
): Promise<AddProductToFirestoreResult> {
  try {
    const adminApp = getAdminApp();
    if (!adminApp) {
      // This error will be caught by the try...catch block
      throw new Error('Firebase Admin SDK is not initialized. Cannot add product.');
    }
    const firestore = adminApp.firestore();

    // Prepare the data for Firestore
    // ProductFormValues has images and tags as arrays of strings already
    const newProductData: Omit<Product, 'id' | 'avgRating' | 'reviewCount'> = {
      name: productData.name,
      description: productData.description,
      price: productData.price, // Zod schema ensures this is a number
      categorySlug: productData.categorySlug,
      stock: productData.stock, // Zod schema ensures this is a number
      images: productData.images.length > 0 ? productData.images : ['https://placehold.co/600x400.png?text=New+Product'],
      metalType: productData.metalType || undefined, // Set to undefined if empty string
      karat: productData.karat || undefined,
      weight: productData.weight || undefined,
      dimensions: productData.dimensions || undefined,
      sku: productData.sku, // Already validated by schema to be non-empty
      tags: productData.tags || undefined, // Set to undefined if empty array/string
      // avgRating and reviewCount will be undefined by default for new products
    };

    const productRef = await firestore.collection('products').add(newProductData);

    console.log('Product added to Firestore with ID:', productRef.id);
    return { success: true, productId: productRef.id };
  } catch (error: any) {
    console.error('Error adding product to Firestore:', error);
    // Check if the error is from Firebase Admin SDK initialization
    if (error.message.includes("Firebase Admin SDK is not initialized")) {
        return { success: false, error: "Server configuration error: Firebase Admin SDK not initialized. Please check server logs and ensure FIREBASE_SERVICE_ACCOUNT_KEY_JSON is correctly set." };
    }
    return { success: false, error: error.message || 'Failed to add product to database.' };
  }
}
