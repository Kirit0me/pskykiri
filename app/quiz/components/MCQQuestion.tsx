// app/quiz/components/MCQQuestion.tsx
"use client";

import { MCQQuestion as MCQQuestionType } from "@/types/quiz";

export default function MCQQuestion({
  question,
  onAnswer,
}: {
  question: MCQQuestionType;
  onAnswer: (effect: any) => void;
}) {
  return (
    <div className="p-4 border rounded shadow">
      <p className="mb-4 text-lg font-semibold">{question.question}</p>
      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.effect)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-left"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
