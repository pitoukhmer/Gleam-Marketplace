
"use client";

import Link from 'next/link';
import { Search, Heart, ShoppingCart, User, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/constants';
import Logo from './Logo';
import MobileNav from './MobileNav'; // MobileNav will also need auth state
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

const Header = () => {
  const { wishlistItems } = useWishlist();
  const { currentUser, logout, loading } = useAuth();

  const getInitials = (email?: string | null) => {
    if (!email) return '..';
    return email.substring(0, 2).toUpperCase();
  };

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

        <div className="flex items-center space-x-1 md:space-x-2">
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

          {!loading && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    {/* Placeholder for user avatar image */}
                    <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || currentUser.email || "User"} data-ai-hint="user avatar"/>
                    <AvatarFallback>{getInitials(currentUser.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.displayName || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </Link>
                </DropdownMenuItem>
                {/* Add other items like Settings, etc. if needed */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : !loading ? (
             <Link href="/login" passHref>
                <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
                    <LogIn className="mr-2 h-5 w-5 md:hidden" /> {/* Icon for mobile */}
                    <span className="hidden md:inline">Login</span> {/* Text for desktop */}
                </Button>
            </Link>
          ) : null /* Show nothing while loading auth state */}
          
          <MobileNav /> {/* Pass auth state to MobileNav if it needs it */}
        </div>
      </div>
    </header>
  );
};

export default Header;
