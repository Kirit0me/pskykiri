"use client";

import { MCQQuestion as MCQQuestionType, AnswerEffect } from "@/types/quiz";

export default function MCQQuestion({
  question,
  onAnswer,
}: {
  question: MCQQuestionType;
  onAnswer: (effect: AnswerEffect) => void;
}) {
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center">
      <p className="text-2xl font-bold mb-8 text-purple-400">{question.question}</p>
      <div className="flex flex-col gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.effect)}
            className="border border-purple-400 transition-colors text-white py-3 px-4 rounded font-semibold"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
