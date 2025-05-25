
'use server';
/**
 * @fileOverview An AI agent that generates product images based on name and category.
 *
 * - generateProductImage - A function that handles product image generation.
 * - GenerateProductImageInput - The input type for the generateProductImage function.
 * - GenerateProductImageOutput - The return type for the generateProductImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductImageInputSchema = z.object({
  productName: z.string().describe("The name of the product."),
  categoryName: z.string().describe("The category of the product (e.g., Rings, Necklaces)."),
});
export type GenerateProductImageInput = z.infer<typeof GenerateProductImageInputSchema>;

const GenerateProductImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe("The generated image as a data URI."),
});
export type GenerateProductImageOutput = z.infer<typeof GenerateProductImageOutputSchema>;

export async function generateProductImage(input: GenerateProductImageInput): Promise<GenerateProductImageOutput> {
  return generateProductImageFlow(input);
}

const generateProductImageFlow = ai.defineFlow(
  {
    name: 'generateProductImageFlow',
    inputSchema: GenerateProductImageInputSchema,
    outputSchema: GenerateProductImageOutputSchema,
  },
  async (input) => {
    const prompt = `Generate a photorealistic e-commerce product image. The product is a piece of jewelry from the category "${input.categoryName}", named "${input.productName}". It should be showcased on a clean, minimalist background (e.g., white, light gray, or a subtle texture relevant to luxury goods). The lighting should be professional studio quality, highlighting the details and materials of the jewelry. Aim for an image that is ready for a high-end online store, suitable for a product listing.`;

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // Specific model for image generation
      prompt: prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Must request IMAGE modality
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed to return a media URL.');
    }

    return {imageDataUri: media.url};
  }
);
