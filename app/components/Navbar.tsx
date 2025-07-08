"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  const fullName = user?.user_metadata?.full_name || user?.email || "User";
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <nav className="bg-black/70 text-white backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent"
        >
          Psykiri
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/quiz" className="hover:text-pink-300 transition">
            Quiz
          </Link>
          <Link href="/results" className="hover:text-yellow-300 transition">
            Results
          </Link>

          {!loading && user ? (
            <div className="flex items-center space-x-3">
              <span className="text-pink-300">{fullName}</span>
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-pink-400"
                />
              )}
              <button
                onClick={signOut}
                className="bg-red-500 hover:bg-red-400 text-black px-3 py-1 rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-pink-500 hover:bg-pink-400 text-black px-4 py-2 rounded-full"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-pink-400 focus:outline-none"
        >
          <svg
            className="h-8 w-8"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/80 px-4 py-4"
          >
            <Link
              href="/quiz"
              className="block py-2 text-pink-300 hover:text-pink-200"
              onClick={() => setIsOpen(false)}
            >
              Quiz
            </Link>
            <Link
              href="/results"
              className="block py-2 text-yellow-300 hover:text-yellow-200"
              onClick={() => setIsOpen(false)}
            >
              Results
            </Link>

            {!loading && user ? (
              <div className="flex flex-col mt-2">
                <span className="text-pink-300">{fullName}</span>
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-pink-400 mt-2"
                  />
                )}
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="mt-2 bg-red-500 hover:bg-red-400 text-black px-4 py-2 rounded-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="mt-3 block bg-pink-500 hover:bg-pink-400 text-black px-4 py-2 rounded-full text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
