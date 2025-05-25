
"use client";
import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-4 flex items-center justify-center h-[400px] md:h-[500px]">
          <Image 
            src="https://placehold.co/600x400.png?text=No+Image" 
            alt="No image available" 
            width={600} 
            height={400} 
            className="rounded-md object-contain max-h-full"
            data-ai-hint="placeholder image"
          />
        </CardContent>
      </Card>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-lg overflow-hidden relative">
        <CardContent className="p-0 flex items-center justify-center aspect-[4/3] md:aspect-square">
          <Image
            src={images[currentIndex]}
            alt={`${productName} - view ${currentIndex + 1}`}
            width={600}
            height={600}
            className="object-contain w-full h-full transition-opacity duration-300 ease-in-out"
            priority={currentIndex === 0} // Prioritize loading the first image
            data-ai-hint="jewelry item"
          />
        </CardContent>
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </Card>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-md overflow-hidden border-2 transition-all ${
                currentIndex === index ? 'border-primary ring-2 ring-primary' : 'border-transparent hover:border-primary/50'
              }`}
              aria-label={`View image ${index + 1}`}
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
    </div>
  );
};

export default ProductImageGallery;
