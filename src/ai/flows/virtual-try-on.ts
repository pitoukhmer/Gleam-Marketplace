// VirtualTryOn flow implementation
'use server';
/**
 * @fileOverview An AI agent that allows users to virtually 'try on' jewelry using their device's camera.
 *
 * - virtualTryOn - A function that handles the virtual try-on process.
 * - VirtualTryOnInput - The input type for the virtualTryOn function.
 * - VirtualTryOnOutput - The return type for the virtualTryOn function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VirtualTryOnInputSchema = z.object({
  jewelryPhotoDataUri: z
    .string()
    .describe(
      "A photo of the jewelry item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userPhotoDataUri: z
    .string()
    .describe(
      "A photo of the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VirtualTryOnInput = z.infer<typeof VirtualTryOnInputSchema>;

const VirtualTryOnOutputSchema = z.object({
  virtualTryOnImage: z
    .string()
    .describe("An image of the user virtually trying on the jewelry, as a data URI."),
});
export type VirtualTryOnOutput = z.infer<typeof VirtualTryOnOutputSchema>;

export async function virtualTryOn(input: VirtualTryOnInput): Promise<VirtualTryOnOutput> {
  return virtualTryOnFlow(input);
}

const virtualTryOnPrompt = ai.definePrompt({
  name: 'virtualTryOnPrompt',
  input: {schema: VirtualTryOnInputSchema},
  output: {schema: VirtualTryOnOutputSchema},
  prompt: [
    {media: {url: '{{{userPhotoDataUri}}}'}},
    {
      text: 'Generate an image of this person virtually trying on the following jewelry item: ',
    },
    {media: {url: '{{{jewelryPhotoDataUri}}}'}},
  ],
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
  },
});

const virtualTryOnFlow = ai.defineFlow(
  {
    name: 'virtualTryOnFlow',
    inputSchema: VirtualTryOnInputSchema,
    outputSchema: VirtualTryOnOutputSchema,
  },
  async input => {
    const {media} = await virtualTryOnPrompt(input);
    return {virtualTryOnImage: media.url!};
  }
);
