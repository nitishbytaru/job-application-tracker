import Link from "next/link";
import LogoutButton from "@/components/logout-button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-sidebar text-sidebar-foreground p-4 border-r border-border">
        <h2 className="font-bold text-xl mb-4">
          Dashboard
        </h2>

        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded hover:bg-sidebar-accent text-sm font-medium"
          >
            Overview
          </Link>

          <Link
            href="/dashboard/applications"
            className="block px-3 py-2 rounded hover:bg-sidebar-accent text-sm font-medium"
          >
            Applications
          </Link>
          <Link
            href="/dashboard/profile"
            className="block px-3 py-2 rounded hover:bg-sidebar-accent text-sm font-medium"
          >
            Profile
          </Link>
          <div className="pt-4 border-t border-border mt-4">
            <LogoutButton />
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-background">
        {children}
      </main>
    </div>
  );
}