
"use client"; // This page will involve forms and client-side logic

import Link from 'next/link';
import Image from 'next/image'; // Added import for Image
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { CreditCard, ShoppingCart } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  address: z.string().min(5, "Address is too short."),
  city: z.string().min(2, "City name is too short."),
  postalCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid postal code format."),
  country: z.string().min(2, "Country name is too short."),
  cardNumber: z.string().regex(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/, "Invalid card number."),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)."),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV."),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { toast } = useToast();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { // Provide default values to avoid uncontrolled to controlled input warning
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    // console.log("Checkout data:", data); // Removed for production
    // Placeholder for actual payment processing
    toast({
      title: "Order Submitted (Placeholder)",
      description: "Your order has been received. Payment processing is simulated.",
    });
    form.reset(); // Reset form after submission
  };

  // Placeholder cart summary items
  const cartItems = [
    { id: '1', name: 'Classic Gold Band', price: 499.99, quantity: 1, image: 'https://placehold.co/80x80.png', dataAiHint: 'product small image' },
    { id: '2', name: 'Diamond Solitaire Necklace', price: 1299.00, quantity: 1, image: 'https://placehold.co/80x80.png', dataAiHint: 'product small image' },
  ];
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15.00; // Example shipping cost
  const total = subtotal + shipping;


  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">Secure Checkout</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="md:col-span-2 space-y-6">
            <Card className="bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl><Input placeholder="123 Jewelry Lane" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl><Input placeholder="New York" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="postalCode" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl><Input placeholder="10001" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl><Input placeholder="United States" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Payment Details</CardTitle>
                <CardDescription>All transactions are secure and encrypted.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="cardNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="expiryDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="cvv" render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl><Input placeholder="•••" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>
            
            <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <CreditCard className="mr-2 h-5 w-5" /> Place Order
            </Button>
          </form>
        </Form>

        <div className="md:col-span-1">
            <Card className="bg-card shadow-lg sticky top-24">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2"><ShoppingCart className="h-6 w-6 text-primary"/>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                           <div className="flex items-center gap-2">
                            <Image src={item.image} alt={item.name} width={40} height={40} className="rounded" data-ai-hint={item.dataAiHint} />
                            <div>
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                           </div>
                           <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between text-sm">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                        <p>Shipping</p>
                        <p>${shipping.toFixed(2)}</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold text-primary">
                        <p>Total</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
