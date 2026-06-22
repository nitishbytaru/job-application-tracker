import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-6xl font-bold">
        404
      </h1>

      <p>Page not found</p>

      <Link
        href="/"
        className="px-4 py-2 bg-black text-white rounded"
      >
        Go Home
      </Link>
    </main>
  );
}