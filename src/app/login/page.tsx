"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const login = () => {
    document.cookie =
      "token=authenticated; path=/";

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-background text-foreground">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <Button onClick={login}>
          Mock Login
        </Button>
      </div>
    </main>
  );
}