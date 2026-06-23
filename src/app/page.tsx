import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-4 bg-background text-foreground">
      <h1 className="text-5xl font-bold">
        Job Application Tracker
      </h1>

      <p className="text-muted-foreground">
        Track your job applications efficiently.
      </p>

      <div className="flex gap-4">
        <Link href="/login" className={buttonVariants()}>
          Login
        </Link>

        <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
          Dashboard
        </Link>
      </div>
    </main>
  );
}