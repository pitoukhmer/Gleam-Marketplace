
"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertTriangle, Users, MoreHorizontal, Trash2, Edit3, UserCog, UserX, ShieldCheck, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react"; // To manage dummy data if needed, or for dialogs

// Dummy User Data - Replace with actual data fetching in a real backend scenario
interface DummyUser {
  id: string;
  email: string | null;
  displayName: string | null;
  role: "admin" | "user";
  status: "active" | "disabled";
  createdAt: Date;
  lastSignInAt: Date | null;
}

const dummyUsers: DummyUser[] = [
  { id: "user-1", email: "alice@example.com", displayName: "Alice Wonderland", role: "user", status: "active", createdAt: new Date("2023-01-15"), lastSignInAt: new Date("2024-05-20") },
  { id: "user-2", email: "bob@example.com", displayName: "Bob The Builder", role: "user", status: "active", createdAt: new Date("2023-02-20"), lastSignInAt: new Date("2024-05-18") },
  { id: "user-3", email: "pitouthou@gmail.com", displayName: "Admin Pito", role: "admin", status: "active", createdAt: new Date("2022-12-01"), lastSignInAt: new Date("2024-05-21") },
  { id: "user-4", email: "charlie@example.com", displayName: "Charlie Brown", role: "user", status: "disabled", createdAt: new Date("2023-03-10"), lastSignInAt: new Date("2023-11-01") },
];


export default function AdminUsersPage() {
  const { toast } = useToast();
  // In a real app, users would be fetched and managed via state (e.g., useState, useQuery)
  const [users, setUsers] = useState<DummyUser[]>(dummyUsers);

  const handleEditRole = (userId: string) => {
    toast({ title: "Simulated Action", description: `Edit role for user ${userId}. (Backend required)` });
  };

  const handleToggleStatus = (userId: string, currentStatus: "active" | "disabled") => {
    const newStatus = currentStatus === "active" ? "disabled" : "active";
    // Simulate updating local state
    setUsers(prevUsers => prevUsers.map(u => u.id === userId ? {...u, status: newStatus} : u));
    toast({ title: "Simulated Action", description: `User ${userId} status changed to ${newStatus}. (Backend required)` });
  };

  const handleDeleteUser = (userId: string) => {
    // Simulate deleting from local state
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
    toast({ title: "Simulated Action", description: `Delete user ${userId}. (Backend required)`, variant: "destructive" });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Admin</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Manage Users</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Users className="h-6 w-6" />
              Manage Users
            </CardTitle>
            <CardDescription>
              View, edit roles, and manage user accounts.
            </CardDescription>
          </div>
          <Button variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => toast({ title: "Simulated Action", description: "Add new user form would appear here. (Backend required)"})}>
            <PlusCircle className="mr-2 h-5 w-5" /> Add New User
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="default" className="bg-secondary/30 border-secondary">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <AlertTitle className="font-semibold">Backend Implementation Required</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              This page demonstrates user management UI with dummy data. Full functionality (listing all Firebase users, editing roles, disabling/enabling accounts, etc.) requires backend integration with the Firebase Admin SDK for secure access to user data. The actions below are simulated.
            </AlertDescription>
          </Alert>

          <div className="rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Display Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.displayName || "N/A"}</TableCell>
                      <TableCell>{user.email || "N/A"}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "secondary"} className="capitalize">
                          {user.role === "admin" && <ShieldCheck className="mr-1 h-3 w-3" />}
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "outline" : "destructive"} className="capitalize border-current">
                           <span className={`mr-1.5 h-2 w-2 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-red-500"}`}></span>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">User Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditRole(user.id)}>
                              <UserCog className="mr-2 h-4 w-4" /> Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.status)}>
                              <UserX className="mr-2 h-4 w-4" /> {user.status === "active" ? "Disable Account" : "Enable Account"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleDeleteUser(user.id)}>
                              <Trash2 className="mr-2 h-4 w-4" /> Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No users to display.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
