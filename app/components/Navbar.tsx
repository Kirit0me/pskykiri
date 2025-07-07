"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  const fullName = user?.user_metadata?.full_name || user?.email || "User";
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <nav className="bg-black text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link href="/" className="text-2xl font-bold text-green-400 hover:text-green-300">
            Psykiri
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/quiz" className="hover:text-green-300">
              Quiz
            </Link>
            <Link href="/results" className="hover:text-green-300">
              Results
            </Link>

            {!loading && user ? (
              <div className="flex items-center space-x-3">
                <span className="text-green-300">{fullName}</span>
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-green-400"
                  />
                )}
                <button
                  onClick={signOut}
                  className="bg-red-500 hover:bg-red-400 text-black px-3 py-1 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-green-500 hover:bg-green-400 text-black px-3 py-1 rounded"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-gray-900">
          <Link
            href="/quiz"
            className="block px-3 py-2 rounded text-green-300 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Quiz
          </Link>
          <Link
            href="/results"
            className="block px-3 py-2 rounded text-green-300 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Results
          </Link>

          {!loading && user ? (
            <div className="px-3 py-2 flex items-center justify-between">
              <span className="text-green-300">{fullName}</span>
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-green-400 ml-2"
                />
              )}
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="ml-3 bg-red-500 hover:bg-red-400 text-black px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="block w-full bg-green-500 hover:bg-green-400 text-black px-3 py-2 rounded text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
