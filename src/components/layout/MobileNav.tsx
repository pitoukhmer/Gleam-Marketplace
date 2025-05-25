
"use client";

import Link from 'next/link';
import { Menu, Gem, Search, Heart, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { CATEGORIES } from '@/lib/constants';
import Logo from './Logo';
import { useWishlist } from '@/hooks/useWishlist';

const MobileNav = () => {
  const { wishlistItems } = useWishlist();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-foreground">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-background text-foreground p-0">
        <SheetHeader className="p-4 border-b border-border">
           <div className="flex justify-between items-center">
            <Logo />
            <SheetClose asChild>
                <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                </Button>
            </SheetClose>
           </div>
        </SheetHeader>
        <nav className="flex flex-col p-4 space-y-2">
          {CATEGORIES.map((category) => (
            <SheetClose asChild key={category.slug}>
              <Link
                href={`/category/${category.slug}`}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                {category.name}
              </Link>
            </SheetClose>
          ))}
          <hr className="my-2 border-border" />
          <SheetClose asChild>
            <Link href="/wishlist" className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">
              <Heart className="mr-2 h-5 w-5" />
              Wishlist ({wishlistItems.length})
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/checkout" className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Cart
            </Link>
          </SheetClose>
           <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start px-3 py-2 text-base font-medium hover:bg-secondary hover:text-secondary-foreground">
                <Search className="mr-2 h-5 w-5" />
                Search
            </Button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
