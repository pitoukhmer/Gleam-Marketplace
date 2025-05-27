
"use client";

import Link from 'next/link';
import { Search, Heart, ShoppingCart, User, LogOut, LogIn, Shield } from 'lucide-react'; // Added Shield
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/constants';
import Logo from './Logo';
import MobileNav from './MobileNav';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
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
  const { currentUser, logout, loading, isAdmin } = useAuth(); // Added isAdmin
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  const getInitials = (email?: string | null) => {
    if (!email) return '..';
    const name = currentUser?.displayName;
    if (name) {
      const parts = name.split(' ');
      if (parts.length > 1) {
        return parts[0][0] + parts[parts.length - 1][0];
      }
      return name.substring(0,2);
    }
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
            <Button variant="ghost" size="icon" className="relative text-foreground hover:text-primary transition-colors" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          {!loading && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
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
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
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
                    <LogIn className="mr-2 h-5 w-5 md:hidden" />
                    <span className="hidden md:inline">Login</span>
                </Button>
            </Link>
          ) : null}
          
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
