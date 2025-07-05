"use client";

import { SliderQuestion as SliderQuestionType } from "@/types/quiz";
import { CognitiveFunctions } from "@/types/cognitiveFunctions";
import { useState } from "react";

function interpolateEffects(
  min: Partial<CognitiveFunctions>,
  max: Partial<CognitiveFunctions>,
  t: number
): CognitiveFunctions {
  const result: CognitiveFunctions = {
    Ne: 0,
    Ni: 0,
    Se: 0,
    Si: 0,
    Fe: 0,
    Fi: 0,
    Te: 0,
    Ti: 0,
  };

  for (const key in result) {
    const from = min[key as keyof CognitiveFunctions] ?? 0;
    const to = max[key as keyof CognitiveFunctions] ?? 0;
    result[key as keyof CognitiveFunctions] = from + (to - from) * t;
  }

  return result;
}

export default function SliderQuestion({
  question,
  onAnswer,
}: {
  question: SliderQuestionType;
  onAnswer: (effect: any) => void;
}) {
  const [value, setValue] = useState(50);

  const handleSubmit = () => {
    const t = value / 100;
    const interpolatedEffect = interpolateEffects(
      question.effectRange[0],
      question.effectRange[1],
      t
    );
    onAnswer(interpolatedEffect);
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center">
      <p className="text-2xl font-bold mb-8 text-green-400">{question.question}</p>
      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>{question.minLabel}</span>
        <span>{question.maxLabel}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-green-500"
      />
      <p className="text-green-300 mt-2 mb-6">{value}</p>
      <button
        onClick={handleSubmit}
        className="bg-green-500 hover:bg-green-600 transition-colors text-black py-3 px-6 rounded font-semibold"
      >
        Submit
      </button>
    </div>
  );
}
