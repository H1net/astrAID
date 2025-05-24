import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated and has admin role
  const session = await getServerSession(authOptions);
  
  if (!session || !isAdmin(session.user.role)) {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-accent mb-6">Admin Dashboard</h1>
        <nav className="flex flex-wrap gap-4">
          <Link
            href="/admin"
            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-opacity-90"
          >
            Users
          </Link>
          <Link
            href="/admin/subscriptions"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Subscriptions
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Orders
          </Link>
        </nav>
      </div>

      {children}
    </div>
  );
}
