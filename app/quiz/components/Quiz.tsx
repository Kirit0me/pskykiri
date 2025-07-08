"use client";

import { useState } from "react";
import { questions } from "@/data/questions";
import { applyEffect, initialCognitiveFunctions } from "@/utils/scoring";
import QuestionRenderer from "./QuestionRenderer";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [functions, setFunctions] = useState(initialCognitiveFunctions);
  const router = useRouter();

  const handleAnswer = async (effect: any) => {
    const updatedFunctions = applyEffect(functions, effect);

    // If not last question → go to next
    if (index + 1 < questions.length) {
      setFunctions(updatedFunctions);
      setIndex(index + 1);
    } else {
      // Last question → submit
      try {
       const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // Logged-in user → Save to MongoDB
          const res = await fetch("/api/mbti", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user.id,
              result: updatedFunctions,
            }),
          });

          const json = await res.json();
          console.log("Saved to MongoDB:", json);
        } else {
          console.log("Guest user - saving locally.");
          localStorage.setItem("quizCompleted", "true");
        }
      } catch (e) {
        console.error("Submission error:", e);
      }

      localStorage.setItem("quizResults", JSON.stringify(updatedFunctions));
      router.push("/results");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-xl">
        <QuestionRenderer question={questions[index]} onAnswer={handleAnswer} />
        <p className="mt-6 text-center text-sm text-gray-400">
          Question {index + 1} of {questions.length}
        </p>
      </div>
    </main>
  );
}
