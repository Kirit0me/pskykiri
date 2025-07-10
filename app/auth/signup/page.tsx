"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");


    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-pink-500 p-8">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

      <div className="bg-stone-950 p-8 rounded-4xl shadow w-full max-w-md space-y-4">


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-black border border-pink-500 text-pink-300 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-black border border-pink-500 text-pink-300 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          onClick={handleSignUp}
          className="w-full py-2 rounded bg-pink-600 hover:bg-pink-700 text-black font-bold transition"
        >
          Sign Up
        </button>
      </div>
    </main>
  );
}
