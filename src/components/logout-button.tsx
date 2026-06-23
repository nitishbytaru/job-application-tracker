"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the token cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    
    // Redirect to login
    router.push("/login");
    router.refresh(); // Force a refresh to update the server components state
  };

  return (
    <button
      onClick={handleLogout}
      className="block w-full text-left px-3 py-2 rounded hover:bg-red-50 text-sm font-medium text-red-600"
    >
      Logout
    </button>
  );
}
