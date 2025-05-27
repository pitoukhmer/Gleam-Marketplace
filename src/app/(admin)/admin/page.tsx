
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, BarChart3, LineChart as LineChartIcon } from "lucide-react"; // Added LineChartIcon
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
      <p className="text-muted-foreground">Welcome to the Gleam Marketplace admin panel. Manage your products, users, and view site statistics.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/products" className="block">
          <Card className="hover:shadow-lg transition-shadow bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Manage Products</CardTitle>
              <Package className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">View & Edit</div>
              <p className="text-xs text-muted-foreground">
                Add, update, or delete jewelry items.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/users" className="block">
          <Card className="hover:shadow-lg transition-shadow bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Manage Users</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">View Users</div>
              <p className="text-xs text-muted-foreground">
                Access user management area (placeholder).
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/analytics" className="block">
         <Card className="hover:shadow-lg transition-shadow bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Analytics</CardTitle>
            <LineChartIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">View Analytics</div>
            <p className="text-xs text-muted-foreground">
             Access site statistics area (placeholder).
            </p>
          </CardContent>
        </Card>
        </Link>
      </div>
       <div className="mt-8 p-4 border border-destructive/50 bg-destructive/10 rounded-md text-sm text-destructive">
          <strong>Note:</strong> Product management (add, update, delete) is currently client-side for demonstration purposes. Changes will not persist permanently or affect other users. A full database backend is required for persistent storage for products, users, and analytics.
      </div>
    </div>
  );
}
