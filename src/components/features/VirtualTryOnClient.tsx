
"use client";

import { useState, useRef, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Upload, Sparkles, Camera } from 'lucide-react';
import type { Product } from '@/types';
import { virtualTryOn } from '@/ai/flows/virtual-try-on'; // Ensure this path is correct
import { useToast } from '@/hooks/use-toast';

interface VirtualTryOnClientProps {
  product: Product;
}

export default function VirtualTryOnClient({ product }: VirtualTryOnClientProps) {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [userPhotoFile, setUserPhotoFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUserPhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // Max 4MB
        setError("Image size should be less than 4MB.");
        setUserPhoto(null);
        setUserPhotoFile(null);
        return;
      }
      setError(null);
      setUserPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to convert image URL to Data URI
  async function toDataURL(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const handleVirtualTryOn = async () => {
    if (!userPhoto || !product.images[0]) {
      setError("Please upload your photo and ensure the product image is available.");
      return;
    }
    setIsLoading(true);
    setResultImage(null);
    setError(null);

    try {
      const jewelryPhotoDataUri = await toDataURL(product.images[0].split('?')[0]); // Remove query params if any from placeholder URL
      const input = {
        jewelryPhotoDataUri,
        userPhotoDataUri: userPhoto,
      };
      const output = await virtualTryOn(input);
      setResultImage(output.virtualTryOnImage);
      toast({
        title: "Success!",
        description: "Virtual try-on image generated.",
      });
    } catch (err) {
      console.error("Virtual Try-On Error:", err);
      setError("Failed to generate virtual try-on image. Please try again.");
      toast({
        title: "Error",
        description: "Could not generate try-on image.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2 text-primary">
          <Sparkles className="h-6 w-6" />
          Virtual Try-On: {product.name}
        </CardTitle>
        <CardDescription>
          See how this beautiful {product.categorySlug.slice(0,-1)} looks on you! Upload a photo of yourself.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <Label className="text-base font-medium mb-1 block">Jewelry Item</Label>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={200}
              height={200}
              className="rounded-md border border-border object-cover aspect-square"
              data-ai-hint="jewelry item"
            />
          </div>
          <div>
            <Label htmlFor="userPhoto" className="text-base font-medium mb-1 block">Your Photo</Label>
            <div
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-md cursor-pointer hover:border-primary transition-colors aspect-square items-center text-center"
              onClick={() => fileInputRef.current?.click()}
            >
              {userPhoto ? (
                <Image src={userPhoto} alt="User" width={200} height={200} className="object-cover rounded-md max-h-full" data-ai-hint="person face"/>
              ) : (
                <div className="space-y-1 text-center">
                  <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="flex text-sm text-muted-foreground">
                    <span className="text-primary hover:text-primary/80">Upload a file</span>
                    <Input id="userPhoto" name="userPhoto" type="file" accept="image/*" className="sr-only" onChange={handleUserPhotoChange} ref={fileInputRef} />
                  </div>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 4MB</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {resultImage && (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-center text-primary">Your Virtual Try-On!</h3>
            <Image
              src={resultImage}
              alt="Virtual try-on result"
              width={500}
              height={500}
              className="rounded-md border border-border object-contain mx-auto"
              data-ai-hint="person jewelry"
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleVirtualTryOn}
          disabled={isLoading || !userPhoto}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          size="lg"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-5 w-5" />
          )}
          Try It On!
        </Button>
      </CardFooter>
    </Card>
  );
}
