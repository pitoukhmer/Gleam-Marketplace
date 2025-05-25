
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, User, Mail, CalendarDays, LogOut } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { format } from 'date-fns'; // For formatting dates

export default function AccountPage() {
  const { currentUser, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login?redirect=/account'); // Redirect to login if not authenticated
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

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
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Account</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="max-w-2xl mx-auto shadow-lg bg-card">
        <CardHeader className="text-center border-b border-border pb-6">
          <Avatar className="h-24 w-24 mx-auto mb-4 ring-2 ring-primary p-1">
            <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || currentUser.email || "User"} data-ai-hint="user avatar large"/>
            <AvatarFallback className="text-3xl">{getInitials(currentUser.email)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl text-primary">
            {currentUser.displayName || 'Welcome'}
          </CardTitle>
          <CardDescription>
            Manage your account details and view your activity.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <p><strong>UID:</strong> <span className="text-muted-foreground text-sm">{currentUser.uid}</span></p>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <p><strong>Email:</strong> <span className="text-muted-foreground">{currentUser.email}</span></p>
          </div>
          {currentUser.emailVerified !== undefined && (
             <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={currentUser.emailVerified ? "text-green-500" : "text-destructive"}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <p><strong>Email Verified:</strong> <span className={currentUser.emailVerified ? "text-green-600" : "text-destructive"}>{currentUser.emailVerified ? 'Yes' : 'No'}</span></p>
            </div>
          )}
          {currentUser.metadata.creationTime && (
            <div className="flex items-center space-x-3">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <p><strong>Member Since:</strong> <span className="text-muted-foreground">{format(new Date(currentUser.metadata.creationTime), 'MMMM d, yyyy')}</span></p>
            </div>
          )}
           {currentUser.metadata.lastSignInTime && (
            <div className="flex items-center space-x-3">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <p><strong>Last Login:</strong> <span className="text-muted-foreground">{format(new Date(currentUser.metadata.lastSignInTime), 'MMMM d, yyyy, p')}</span></p>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="w-full sm:w-auto">Edit Profile (Not Implemented)</Button>
            <Button variant="destructive" onClick={logout} className="w-full sm:w-auto">
              <LogOut className="mr-2 h-5 w-5" /> Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
