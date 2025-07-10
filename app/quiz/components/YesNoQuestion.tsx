"use client";

import { AnswerEffect, YesNoQuestion as YesNoQuestionType } from "@/types/quiz";

export default function YesNoQuestion({
  question,
  onAnswer,
}: {
  question: YesNoQuestionType;
  onAnswer: (effect: AnswerEffect) => void;
}) {
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center">
      <p className="text-2xl font-bold mb-8 text-pink-400">{question.question}</p>
      <div className="flex gap-8 justify-center">
        <button
          onClick={() => onAnswer(question.yesEffect)}
          className="bg-pink-500 hover:bg-pink-600 transition-colors text-black py-3 px-6 rounded font-semibold"
        >
          Yes
        </button>
        <button
          onClick={() => onAnswer(question.noEffect)}
          className="bg-gray-500 hover:bg-gray-600 transition-colors text-white py-3 px-6 rounded font-semibold"
        >
          No
        </button>
      </div>
    </div>
  );
}
