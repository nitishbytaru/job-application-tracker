import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-100 text-gray-900 p-4 border-r">
        <h2 className="font-bold text-xl mb-4">
          Dashboard
        </h2>

        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded hover:bg-gray-200 text-sm font-medium"
          >
            Overview
          </Link>

          <Link
            href="/dashboard/applications"
            className="block px-3 py-2 rounded hover:bg-gray-200 text-sm font-medium"
          >
            Applications
          </Link>

          <Link
            href="/dashboard/analytics"
            className="block px-3 py-2 rounded hover:bg-gray-200 text-sm font-medium"
          >
            Analytics
          </Link>

          <Link
            href="/dashboard/profile"
            className="block px-3 py-2 rounded hover:bg-gray-200 text-sm font-medium"
          >
            Profile
          </Link>

          <Link
            href="/dashboard/settings"
            className="block px-3 py-2 rounded hover:bg-gray-200 text-sm font-medium"
          >
            Settings
          </Link>


          <div className="pt-4 border-t mt-4">
            <LogoutButton />
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}