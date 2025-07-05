"use client";

import { useEffect, useState } from "react";
import { CognitiveFunctions } from '@/types/cognitiveFunctions'

export default function ResultsPage() {
  const [functions, setFunctions] = useState<CognitiveFunctions | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("quizResults");
    if (stored) {
      setFunctions(JSON.parse(stored));
    }
  }, []);

  if (!functions) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No results found. Please take the quiz.</p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cognitive Functions</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(functions).map(([func, value]) => (
          <div key={func} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{func}</h2>
            <p className="text-2xl text-blue-600">{value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
