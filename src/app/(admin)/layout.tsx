
"use client";

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, LayoutDashboard, Package, Users, Settings, LogOut, ChevronLeft, ShieldAlert, LineChart as LineChartIcon } from 'lucide-react'; // Added LineChartIcon and Users
import Logo from '@/components/layout/Logo';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { currentUser, loading, isAdmin, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push('/login?redirect=/admin');
      } else if (!isAdmin) {
        router.push('/'); // Redirect non-admins to homepage
      }
    }
  }, [currentUser, loading, isAdmin, router]);

  if (loading || !currentUser || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        {loading && <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />}
        {!loading && !currentUser && <p className="text-lg">Redirecting to login...</p>}
        {!loading && currentUser && !isAdmin && (
          <div className="text-center p-8">
            <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-destructive mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">You do not have permission to access this page.</p>
            <Button onClick={() => router.push('/')}>Go to Homepage</Button>
          </div>
        )}
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/analytics', label: 'Analytics', icon: LineChartIcon },
  ];

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <aside className="sticky top-0 z-30 flex h-screen w-16 flex-col border-r bg-background transition-all duration-300 ease-in-out sm:w-64 group data-[collapsed=true]:sm:w-16">
          <div className="flex h-16 items-center justify-between border-b px-4 sm:px-6 shrink-0">
            <Link 
              href="/admin" 
              className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary group-data-[collapsed=true]:sm:hidden hover:text-primary/90 transition-colors"
              aria-label="Admin Dashboard"
            >
              <Logo />
            </Link>
          </div>
          <nav className="flex-1 space-y-1 p-2 sm:p-4 overflow-y-auto">
            {navItems.map((item) => (
              <Tooltip key={item.label} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className="flex h-10 items-center gap-3 rounded-lg px-3 text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10 aria-[current=page]:bg-primary/10 aria-[current=page]:text-primary group-data-[collapsed=true]:sm:justify-center group-data-[collapsed=true]:sm:px-0 group-data-[collapsed=true]:sm:h-10"
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="truncate group-data-[collapsed=true]:sm:hidden">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="sm:hidden group-data-[collapsed=false]:sm:hidden">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
          <div className="mt-auto flex flex-col border-t p-2 sm:p-4">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={() => router.push('/')} className="flex h-10 items-center gap-3 rounded-lg px-3 text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10 group-data-[collapsed=true]:sm:justify-center group-data-[collapsed=true]:sm:px-0 group-data-[collapsed=true]:sm:h-10">
                  <ChevronLeft className="h-5 w-5" />
                  <span className="truncate group-data-[collapsed=true]:sm:hidden">Back to Site</span>
                </Button>
              </TooltipTrigger>
               <TooltipContent side="right" className="sm:hidden group-data-[collapsed=false]:sm:hidden">Back to Site</TooltipContent>
            </Tooltip>
             <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={logout} className="flex h-10 items-center gap-3 rounded-lg px-3 text-destructive transition-colors hover:text-destructive hover:bg-destructive/10 group-data-[collapsed=true]:sm:justify-center group-data-[collapsed=true]:sm:px-0 group-data-[collapsed=true]:sm:h-10">
                  <LogOut className="h-5 w-5" />
                  <span className="truncate group-data-[collapsed=true]:sm:hidden">Logout</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="sm:hidden group-data-[collapsed=false]:sm:hidden">Logout</TooltipContent>
            </Tooltip>
          </div>
        </aside>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <h1 className="text-xl font-semibold text-primary">Admin Panel</h1>
          </header>
          <main className="flex-1 p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
