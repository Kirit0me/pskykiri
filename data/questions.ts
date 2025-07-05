// data/questions.ts
import { Question } from "@/types/quiz";

export const questions: Question[] = [
  {
    id: "q1",
    type: "yesno",
    question: "Do you enjoy exploring new possibilities and ideas?",
    yesEffect: { Ne: 10, Ni: -1 },
    noEffect: { Si: 2 },
  },
  {
    id: "q2",
    type: "mcq",
    question: "What do you value most in making decisions?",
    options: [
      {
        text: "Efficiency and results",
        effect: { Te: 2, Fi: -1 },
      },
      {
        text: "Harmony and feelings",
        effect: { Fe: 2, Ti: -1 },
      },
      {
        text: "Inner values and authenticity",
        effect: { Fi: 2, Te: -1 },
      },
    ],
  },
  {
    id: "q3",
    type: "slider",
    question: "Do you trust facts more or your gut feeling?",
    minLabel: "Facts",
    maxLabel: "Gut feeling",
    effectRange: [
      { Te: 2, Ti: 1 },    
      { Fi: 2, Ni: 1 },    
    ],
  },
];
