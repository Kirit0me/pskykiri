"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-yellow-300 p-8">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>

      <div className="bg-stone-950 p-8 rounded-4xl shadow w-full max-w-md space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-black border border-yellow-400 text-yellow-200 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-black border border-yellow-400 text-yellow-200 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          onClick={handleSignIn}
          className="w-full py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-bold transition"
        >
          Sign In
        </button>

        <p className="text-center text-yellow-300 mt-4">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/signup"
            className="underline text-pink-400 hover:text-pink-500"
          >
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}
