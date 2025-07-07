"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ResultChart from "./ResultChart";
import { CognitiveFunctions } from "@/types/cognitiveFunctions";

export default function ResultsPage() {
  const [functions, setFunctions] = useState<CognitiveFunctions | null>(null);
  const [personalityType, setPersonalityType] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // LOGGED IN → fetch from Supabase
        const { data, error } = await supabase
          .from("mbti_results")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error(error);
          setLoading(false);
          return;
        }

        if (data) {
          setFunctions(data as CognitiveFunctions);
          determinePersonality(data as CognitiveFunctions);
          setLoading(false);
          return;
        } else {
          router.push("/quiz");
          return;
        }
      } else {
        // Guest logic
        const quizCompleted = localStorage.getItem("quizCompleted");
        const stored = localStorage.getItem("quizResults");

        if (quizCompleted && stored) {
          const parsed = JSON.parse(stored);
          setFunctions(parsed);
          determinePersonality(parsed);
          setLoading(false);
          return;
        } else {
          router.push("/quiz");
          return;
        }
      }
    };

    fetchResults();
  }, [router]);

  const determinePersonality = (data: CognitiveFunctions) => {
    const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const top2 = sorted.slice(0, 2).map((x) => x[0]);
    setPersonalityType(top2.join("-"));
  };

  if (loading) {
    return (
      <main className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  if (!functions) {
    return (
      <main className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No results found. Please take the quiz.</p>
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen flex flex-col items-center justify-center p-8">
      <ResultChart result={functions} personalityType={personalityType} />
    </main>
  );
}
