"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    <Button
      variant="destructive"
      size="sm"
      onClick={handleLogout}
      className="w-full justify-start"
    >
      Logout
    </Button>
  );
}
