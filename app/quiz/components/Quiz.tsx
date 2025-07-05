"use client";

import { useState } from "react";
import { questions } from "@/data/questions";
import { applyEffect, initialCognitiveFunctions } from "@/utils/scoring";
import QuestionRenderer from "./QuestionRenderer";
import { useRouter } from "next/navigation";

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [functions, setFunctions] = useState(initialCognitiveFunctions);
  const router = useRouter();

  const handleAnswer = (effect: any) => {
    setFunctions((prev) => applyEffect(prev, effect));
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      localStorage.setItem("quizResults", JSON.stringify(functions));
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


