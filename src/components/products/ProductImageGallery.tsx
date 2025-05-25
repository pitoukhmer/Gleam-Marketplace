
"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Sparkles, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { generateProductImage, type GenerateProductImageInput } from '@/ai/flows/generate-product-image-flow';
import type { Product } from '@/types';
import { CATEGORIES } from '@/lib/constants'; // For category name
import { useToast } from '@/hooks/use-toast';


interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  productCategorySlug: string; // Added for AI prompt
}

const ProductImageGallery = ({ images: initialImages, productName, productCategorySlug }: ProductImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  // Store the AI generated image URL and the index it corresponds to
  const [aiImageOverride, setAiImageOverride] = useState<{ index: number; url: string } | null>(null);
  const { toast } = useToast();

  // Derived current image source
  const currentImageSrc = aiImageOverride && aiImageOverride.index === currentIndex 
    ? aiImageOverride.url 
    : (initialImages && initialImages.length > 0 ? initialImages[currentIndex] : 'https://placehold.co/600x400.png?text=No+Image');


  if (!initialImages || initialImages.length === 0 && !aiImageOverride) {
    // Fallback for when there are no initial images and no AI image generated for index 0
     const placeholderImage = 'https://placehold.co/600x400.png?text=No+Image';
     const displaySrc = aiImageOverride && aiImageOverride.index === 0 ? aiImageOverride.url : placeholderImage;
    return (
      <div className="space-y-4">
        <Card className="shadow-lg">
          <CardContent className="p-4 flex items-center justify-center h-[400px] md:h-[500px]">
            <Image 
              src={displaySrc} 
              alt="No image available" 
              width={600} 
              height={400} 
              className="rounded-md object-contain max-h-full"
              data-ai-hint="placeholder image"
            />
          </CardContent>
        </Card>
         <div className="mt-4 flex flex-col items-center gap-2">
            <Button onClick={handleGenerateAiImage} disabled={isGenerating} size="sm">
              {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate AI Version
            </Button>
            {generationError && (
              <Alert variant="destructive" className="mt-2">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Generation Failed</AlertTitle>
                <AlertDescription>{generationError}</AlertDescription>
              </Alert>
            )}
        </div>
      </div>
    );
  }


  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? initialImages.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === initialImages.length - 1 ? 0 : prevIndex + 1));
  };

  const handleGenerateAiImage = async () => {
    if (aiImageOverride && aiImageOverride.index === currentIndex) {
      // If current view is AI, button means "Show Original"
      setAiImageOverride(null);
      setGenerationError(null);
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    const category = CATEGORIES.find(cat => cat.slug === productCategorySlug);
    const categoryName = category ? category.name : productCategorySlug.charAt(0).toUpperCase() + productCategorySlug.slice(1);

    try {
      const input: GenerateProductImageInput = { productName, categoryName };
      const result = await generateProductImage(input);
      setAiImageOverride({ index: currentIndex, url: result.imageDataUri });
      toast({
        title: "AI Image Generated!",
        description: "The AI has created a new version of the image.",
      });
    } catch (error) {
      console.error("AI Image Generation Error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during image generation.";
      setGenerationError(errorMessage);
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-lg overflow-hidden relative bg-card">
        <CardContent className="p-0 flex items-center justify-center aspect-[4/3] md:aspect-square">
          <Image
            src={currentImageSrc}
            alt={`${productName} - view ${currentIndex + 1}${aiImageOverride && aiImageOverride.index === currentIndex ? ' (AI Generated)' : ''}`}
            width={600}
            height={600}
            className="object-contain w-full h-full transition-opacity duration-300 ease-in-out"
            priority={currentIndex === 0 && (!aiImageOverride || aiImageOverride.index !== 0)}
            key={currentImageSrc} // Force re-render on src change for transition
            data-ai-hint={aiImageOverride && aiImageOverride.index === currentIndex ? "product ai generated" : "jewelry item"}
          />
        </CardContent>
        {initialImages.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
              onClick={handlePrev}
              aria-label="Previous image"
              disabled={isGenerating}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
              onClick={handleNext}
              aria-label="Next image"
              disabled={isGenerating}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </Card>

      {initialImages.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {initialImages.map((src, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                // If we click a thumbnail different from the one that has an AI override, clear the override
                if (aiImageOverride && aiImageOverride.index !== index) {
                  // setAiImageOverride(null); // Or keep specific overrides per index
                }
              }}
              className={`rounded-md overflow-hidden border-2 transition-all ${
                currentIndex === index ? 'border-primary ring-2 ring-primary' : 'border-transparent hover:border-primary/50'
              } ${isGenerating ? 'cursor-not-allowed opacity-50' : ''}`}
              aria-label={`View image ${index + 1}`}
              disabled={isGenerating}
            >
              <Image
                src={src}
                alt={`${productName} - thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="object-cover w-full h-20"
                data-ai-hint="jewelry thumbnail"
              />
            </button>
          ))}
        </div>
      )}
      
      <div className="mt-4 flex flex-col items-center gap-2">
        <Button onClick={handleGenerateAiImage} disabled={isGenerating} variant="outline" className="border-primary text-primary hover:bg-primary/10">
          {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {aiImageOverride && aiImageOverride.index === currentIndex ? (
            <> <XCircle className="mr-2 h-4 w-4" /> Show Original</>
          ) : (
            <> <Sparkles className="mr-2 h-4 w-4" /> Generate AI Version</>
          )}
        </Button>
        {generationError && (
          <Alert variant="destructive" className="mt-2 text-sm">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Generation Failed</AlertTitle>
            <AlertDescription>{generationError}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ProductImageGallery;

