import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-5xl font-bold">
        Job Application Tracker
      </h1>

      <p>
        Track your job applications efficiently.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Login
        </Link>

        <Link
          href="/dashboard"
          className="px-4 py-2 border rounded"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}