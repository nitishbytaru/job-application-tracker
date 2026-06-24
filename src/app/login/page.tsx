"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/use-auth-store";
import { AUTH_CREDENTIALS } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ThemeToggle from "@/components/theme-toggle";

export default function LoginPage() {
  const router = useRouter();
  const { login, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);

    // Small delay to show loading state
    await new Promise((r) => setTimeout(r, 400));

    const success = login(email, password);
    if (success) {
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-background text-foreground relative">
      {/* Theme toggle in top-right corner */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Job Application Tracker
          </CardTitle>
          <CardDescription>
            Sign in to manage your applications
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@tracker.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive font-medium">
                {error}
              </p>
            )}

            <Button
              id="login-button"
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
            <p className="font-medium mb-1">Demo Credentials</p>
            <p>
              Email:{" "}
              <code className="text-foreground font-mono text-xs">
                {AUTH_CREDENTIALS.email}
              </code>
            </p>
            <p>
              Password:{" "}
              <code className="text-foreground font-mono text-xs">
                {AUTH_CREDENTIALS.password}
              </code>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}