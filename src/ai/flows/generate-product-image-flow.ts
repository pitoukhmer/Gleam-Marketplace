
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
        return {error: 'AI image generation did not produce an image. Please try again.'};
      }

      return {imageDataUri: media.url};
    } catch (err: any) {
      // Log the full error on the server for debugging
      console.error('Error in generateProductImageFlow. Raw error object:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
      if (err.stack) {
        console.error('Error stack:', err.stack);
      }
      
      let clientErrorMessage = 'AI image generation failed. Please try again later.'; // Default client-facing message
      let rawErrorMessage = '';

      if (err && err.message) {
        rawErrorMessage = String(err.message);
      } else if (err && typeof err.toString === 'function') {
        rawErrorMessage = err.toString();
      }

      const lowerCaseErrorMessage = rawErrorMessage.toLowerCase();

      if (lowerCaseErrorMessage.includes('image generation is not available in your country')) {
          clientErrorMessage = 'AI image generation failed: The selected AI model (gemini-2.0-flash-exp) for image generation is not available in your current country/region. Please check Google Cloud documentation for model availability and consider adjusting your Vercel function deployment region if possible.';
      } else if (lowerCaseErrorMessage.includes('api key not valid') || lowerCaseErrorMessage.includes('api_key_invalid')) {
        clientErrorMessage = 'AI image generation failed: The API key is not valid. Please check server configuration and ensure it is correctly set in the production environment.';
      } else if (lowerCaseErrorMessage.includes('billing account not found') || lowerCaseErrorMessage.includes('billing is not enabled') || lowerCaseErrorMessage.includes('project_not_linked_to_billing_account')) {
          clientErrorMessage = 'AI image generation failed: A billing issue was encountered (e.g., billing account not found or not enabled for the project). Please check your Google Cloud project billing status.';
      } else if (lowerCaseErrorMessage.includes('quota') || lowerCaseErrorMessage.includes('rate limit') || lowerCaseErrorMessage.includes('resource_exhausted')) {
          clientErrorMessage = 'AI image generation failed due to API quota or rate limits. Please check your usage limits in the Google Cloud console.';
      } else if (lowerCaseErrorMessage.includes('api_not_enabled') || lowerCaseErrorMessage.includes('service not enabled') ) {
           clientErrorMessage = 'AI image generation failed: The required Google AI API (e.g., Generative Language API or Vertex AI API) is not enabled for your project. Please enable it in the Google Cloud Console.';
      } else if (lowerCaseErrorMessage.includes('permission_denied') || lowerCaseErrorMessage.includes('iam')) {
          clientErrorMessage = 'AI image generation failed due to a permissions issue. Please ensure the service account or API key used by Cloud Run/Vercel has the necessary IAM roles (e.g., Vertex AI User, AI Platform User, or Generative Language API User).';
      } else if (lowerCaseErrorMessage.includes('model_not_found') || lowerCaseErrorMessage.includes('model not found')) {
           clientErrorMessage = 'AI image generation failed: The specified AI model (gemini-2.0-flash-exp) was not found. Please check the model name and its regional availability.';
      } else if (rawErrorMessage) {
        // For other errors with a message, guide admins to logs.
        clientErrorMessage = 'AI image generation encountered an unexpected issue. Administrators: Please check server logs for detailed error information (e.g., related to API access, permissions, or model configuration). The error message was: ' + rawErrorMessage;
      } else {
        // Generic error if no specific message is available from the caught error
        clientErrorMessage = 'An unexpected and unknown error occurred during AI image generation. Administrators: Please check server logs for any available details. The raw error object was: ' + JSON.stringify(err, Object.getOwnPropertyNames(err)).substring(0, 200) + '...';
      }
      
      return {error: clientErrorMessage};
    }
  }
);

