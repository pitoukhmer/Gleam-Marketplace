
import { CATEGORIES, PRODUCTS } from '@/lib/constants';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    categorySlug: category.slug,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = params;
  const category = CATEGORIES.find((cat) => cat.slug === categorySlug);
  
  // If categorySlug is 'all', show all products. Otherwise, filter by category.
  const productsToList = categorySlug === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter((product) => product.categorySlug === categorySlug);

  if (!category && categorySlug !== 'all') {
    return <div className="text-center py-10">Category not found.</div>;
  }
  
  const pageTitle = category ? category.name : "All Products";
  const pageDescription = category ? category.description : "Browse all our exquisite jewelry collections.";

  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {category && (
            <>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                <Link href="/category/all">Categories</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">{pageTitle}</h1>
        {pageDescription && <p className="text-lg text-muted-foreground mt-2">{pageDescription}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <ProductFilters />
        </aside>
        <main className="md:col-span-3">
          {productsToList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsToList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-muted-foreground">No products found in this category yet.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
