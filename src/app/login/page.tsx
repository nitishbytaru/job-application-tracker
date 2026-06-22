"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const login = () => {
    document.cookie =
      "token=authenticated; path=/";

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <button
          onClick={login}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Mock Login
        </button>
      </div>
    </main>
  );
}