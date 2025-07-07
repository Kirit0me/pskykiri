"use client";

import { CognitiveFunctions } from "@/types/cognitiveFunctions";

const colors: Record<keyof CognitiveFunctions, string> = {
  Ne: "bg-green-400",
  Ni: "bg-purple-400",
  Se: "bg-yellow-400",
  Si: "bg-blue-400",
  Fe: "bg-pink-400",
  Fi: "bg-red-400",
  Te: "bg-orange-400",
  Ti: "bg-indigo-400",
};

export default function ResultChart({
  result,
  personalityType,
}: {
  result: CognitiveFunctions;
  personalityType: string;
}) {
  return (
    <div className="p-6 bg-gray-900 rounded-lg text-gray-100 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-green-400 mb-6">
        Your MBTI Result: {personalityType}
      </h2>

      <div className="space-y-4">
        {Object.entries(result).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span>{key}</span>
              <span>{value.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-700 rounded h-3 overflow-hidden">
              <div
                className={`${colors[key as keyof CognitiveFunctions]} h-3`}
                style={{ width: `${Math.min(Math.abs(value), 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
