import { CognitiveFunctions } from "./cognitiveFunctions";

export type AnswerEffect = {
  [key in keyof CognitiveFunctions]?: number;
};

export type YesNoQuestion = {
  id: string;
  type: "yesno";
  question: string;
  yesEffect: AnswerEffect;
  noEffect: AnswerEffect;
};

export type MCQOption = {
  text: string;
  effect: AnswerEffect;
};

export type MCQQuestion = {
  id: string;
  type: "mcq";
  question: string;
  options: MCQOption[];
};

export type SliderQuestion = {
  id: string;
  type: "slider";
  question: string;
  minLabel: string;
  maxLabel: string;
  effectRange: [AnswerEffect, AnswerEffect]; // minEffect, maxEffect
};

export type Question = YesNoQuestion | MCQQuestion | SliderQuestion;