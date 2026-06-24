"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/use-auth-store";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
    router.refresh(); // Force a refresh to update the server components state
  };

  return (
    <Button
      id="logout-button"
      variant="destructive"
      size="sm"
      onClick={handleLogout}
      className="w-full justify-start gap-2"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
