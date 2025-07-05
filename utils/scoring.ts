// utils/scoring.ts
import { AnswerEffect } from "@/types/quiz";
import { CognitiveFunctions } from "@/types/cognitiveFunctions";

export function applyEffect(
  base: CognitiveFunctions,
  effect: AnswerEffect
): CognitiveFunctions {
  const result = { ...base };
  for (const key in effect) {
    const cfKey = key as keyof CognitiveFunctions;
    result[cfKey] += effect[cfKey] ?? 0;
  }
  return result;
}

export const initialCognitiveFunctions: CognitiveFunctions = {
  Ne: 0,
  Ni: 0,
  Se: 0,
  Si: 0,
  Fe: 0,
  Fi: 0,
  Te: 0,
  Ti: 0,
};

