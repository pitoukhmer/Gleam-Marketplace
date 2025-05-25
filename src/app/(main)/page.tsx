
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductCard from '@/components/products/ProductCard';
import { CATEGORIES, PRODUCTS } from '@/lib/constants';
import { ChevronRight } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 4); // Show first 4 products as featured

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary via-background to-secondary rounded-lg p-8 md:p-16 text-center overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-10">
           {/* Decorative image, can be replaced */}
           <Image src="https://placehold.co/1200x400.png" alt="Luxury jewelry background" layout="fill" objectFit="cover" data-ai-hint="abstract gold pattern" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Discover Timeless Elegance
          </h1>
          <p className="text-lg md:text-xl text-foreground mb-8 max-w-2xl mx-auto">
            Explore our exquisite collection of handcrafted gold jewelry, designed to make every moment shine.
          </p>
          <Link href={`/category/${CATEGORIES[0]?.slug || 'all'}`} passHref>
            <Button size="lg" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Shop Now <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-8 text-foreground">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} className="block group">
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-card">
                <CardHeader className="p-0">
                  <Image
                    src={category.image || 'https://placehold.co/300x200.png'}
                    alt={category.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={category.dataAiHint || category.name.toLowerCase()}
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl text-center text-foreground group-hover:text-primary transition-colors">{category.name}</CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-8 text-foreground">Featured Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/category/all" passHref> {/* Assuming an "all products" category or a general product listing page */}
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-card p-8 rounded-lg shadow">
        <h2 className="text-3xl font-semibold text-center mb-8 text-foreground">Why Gleam Marketplace?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 h-12 w-12 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Authenticity Guaranteed</h3>
            <p className="text-muted-foreground">All our jewelry is certified and crafted with the highest purity standards.</p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 h-12 w-12 text-primary"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Secure Shopping</h3>
            <p className="text-muted-foreground">Enjoy a safe and secure checkout experience with trusted payment gateways.</p>
          </div>
          <div>
             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 h-12 w-12 text-primary"><circle cx="12" cy="12" r="10" /><path d="m16.2 7.8-1.2 6.3-6.4 2.1 1.6-6.2Z" /></svg>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Exquisite Craftsmanship</h3>
            <p className="text-muted-foreground">Each piece is meticulously handcrafted by skilled artisans.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
