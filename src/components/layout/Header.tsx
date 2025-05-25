
"use client";

import Link from 'next/link';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/constants';
import Logo from './Logo';
import MobileNav from './MobileNav';
import { useWishlist } from '@/hooks/useWishlist';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const Header = () => {
  const { wishlistItems } = useWishlist();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {CATEGORIES.map((category) => (
              <NavigationMenuItem key={category.slug}>
                <Link href={`/category/${category.slug}`} legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary transition-colors")}>
                    {category.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-2 md:space-x-3">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex text-foreground hover:text-primary transition-colors" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/wishlist" passHref>
            <Button variant="ghost" size="icon" className="relative text-foreground hover:text-primary transition-colors" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {wishlistItems.length}
                </span>
              )}
            </Button>
          </Link>
          <Link href="/checkout" passHref>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary transition-colors" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {/* Placeholder for cart item count */}
            </Button>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
