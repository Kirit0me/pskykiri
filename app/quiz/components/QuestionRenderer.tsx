// app/quiz/components/QuestionRenderer.tsx
"use client";

import { AnswerEffect, Question } from "@/types/quiz";
import YesNoQuestion from "./YesNoQuestion";
import MCQQuestion from "./MCQQuestion";
import SliderQuestion from "./SliderQuestion";

export default function QuestionRenderer({
  question,
  onAnswer,
}: {
  question: Question;
  onAnswer: (effect: AnswerEffect) => void;
}) {
  switch (question.type) {
    case "yesno":
      return <YesNoQuestion question={question} onAnswer={onAnswer} />;
    case "mcq":
      return <MCQQuestion question={question} onAnswer={onAnswer} />;
    case "slider":
      return <SliderQuestion question={question} onAnswer={onAnswer} />;
    default:
      return null;
  }
}
