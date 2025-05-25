
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
    .describe("The generated image as a data URI.")
    .optional(),
  error: z.string().describe("An error message if generation failed.").optional(),
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
  async (input): Promise<GenerateProductImageOutput> => {
    try {
      const prompt = `Generate a photorealistic e-commerce product image. The product is a piece of jewelry from the category "${input.categoryName}", named "${input.productName}". It should be showcased on a clean, minimalist background (e.g., white, light gray, or a subtle texture relevant to luxury goods). The lighting should be professional studio quality, highlighting the details and materials of the jewelry. Aim for an image that is ready for a high-end online store, suitable for a product listing.`;

      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // Specific model for image generation
        prompt: prompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // Must request IMAGE modality
        },
      });

      if (!media?.url) {
        console.error('Image generation failed: No media URL returned from AI.');
        return {error: 'Image generation failed to produce an image. Please try again.'};
      }

      return {imageDataUri: media.url};
    } catch (err: any) {
      console.error('Error in generateProductImageFlow:', err);
      // In production, detailed error messages might be stripped by Next.js,
      // but logging them here helps with debugging in server logs.
      let userFriendlyMessage = 'An unexpected error occurred during image generation. Please ensure API keys are configured correctly in the production environment.';
      if (err.message && err.message.includes('API key not valid')) {
        userFriendlyMessage = 'AI image generation failed: The API key is not valid. Please check server configuration.';
      } else if (err.message) {
        // Avoid leaking too much detail, but give some hint if possible.
        // This message might still be overridden by Next.js in production.
        // userFriendlyMessage = `Image generation error: ${err.message}`; // Potentially too verbose
      }
      return {error: userFriendlyMessage};
    }
  }
);
