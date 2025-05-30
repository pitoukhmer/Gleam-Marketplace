
"use client";

import Link from 'next/link';
import { Menu, Search, Heart, ShoppingCart, X, User, LogOut, LogIn, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetClose, SheetTrigger } from '@/components/ui/sheet';
import { CATEGORIES } from '@/lib/constants';
import Logo from './Logo'; // Updated to use the new Logo component
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '../ui/separator';

const MobileNav = () => {
  const { wishlistItems } = useWishlist();
  const { currentUser, logout, loading, isAdmin } = useAuth();
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-foreground">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-background text-foreground p-0 flex flex-col">
        <SheetHeader className="p-4 border-b border-border">
           <div className="flex justify-between items-center">
            <SheetClose asChild>
              <Link 
                href="/" 
                className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary hover:text-primary/90 transition-colors" 
                aria-label="Gleam Marketplace Home"
              >
                <Logo />
              </Link>
            </SheetClose>
            <SheetClose asChild>
                <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                </Button>
            </SheetClose>
           </div>
        </SheetHeader>
        
        <div className="flex-grow overflow-y-auto">
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
            <Separator className="my-2 border-border" />
             {isAdmin && (
              <SheetClose asChild>
                <Link href="/admin" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/10 transition-colors">
                  <Shield className="mr-2 h-5 w-5" />
                  Admin Panel
                </Link>
              </SheetClose>
            )}
            <SheetClose asChild>
              <Link href="/wishlist" className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Heart className="mr-2 h-5 w-5" />
                Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/checkout" className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Cart {cartItemCount > 0 && `(${cartItemCount})`}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start px-3 py-2 text-base font-medium hover:bg-secondary hover:text-secondary-foreground">
                  <Search className="mr-2 h-5 w-5" />
                  Search
              </Button>
            </SheetClose>
          </nav>
        </div>

        <Separator className="border-border" />
        <div className="p-4 border-t border-border mt-auto">
          {!loading && currentUser ? (
            <div className="space-y-2">
               <SheetClose asChild>
                <Link href="/account" className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || currentUser.email || "User"} data-ai-hint="user avatar small"/>
                      <AvatarFallback>{getInitials(currentUser.email)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{currentUser.displayName || "Account"}</span>
                      <span className="text-xs text-muted-foreground truncate">{currentUser.email}</span>
                    </div>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="ghost" onClick={logout} className="w-full justify-start px-3 py-2 text-base font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">
                  <LogOut className="mr-2 h-5 w-5" />
                  Log Out
                </Button>
              </SheetClose>
            </div>
          ) : !loading ? (
            <SheetClose asChild>
              <Link href="/login" className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <LogIn className="mr-2 h-5 w-5" />
                Login / Sign Up
              </Link>
            </SheetClose>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
