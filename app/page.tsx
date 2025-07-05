"use client";

import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading, signOut } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-8">
      <h1 className="text-4xl font-bold mb-4 text-pink-500">
        MBTI Cognitive Function Quiz
      </h1>
      <p className="mb-6 text-yellow-300 text-center max-w-lg">
        Discover your personality profile based on 8 cognitive functions. Take a short quiz to see your results.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/quiz"
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
        >
          Start Quiz
        </a>

        {!loading && !user && (
          <>
            <a
              href="/auth/signup"
              className="border border-pink-500 text-pink-500 px-6 py-3 rounded hover:bg-pink-500 hover:text-black transition"
            >
              Sign Up
            </a>
            <a
              href="/auth/signin"
              className="border border-yellow-300 text-yellow-300 px-6 py-3 rounded hover:bg-yellow-300 hover:text-black transition"
            >
              Sign In
            </a>
          </>
        )}

        {!loading && user && (
          <button
            onClick={signOut}
            className="border border-red-600 text-red-600 px-6 py-3 rounded hover:bg-red-600 hover:text-white transition"
          >
            Log Out
          </button>
        )}
      </div>
    </main>
  );
}
