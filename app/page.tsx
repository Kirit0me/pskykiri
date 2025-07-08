import HeroSection from "@/app/components/HeroSection";
import QuizDescription from "@/app/components/QuizDescription";
import FunctionsScroller from "@/app/components/FunctionsScroller";
import PersonalityGrid from "@/app/components/PersonalityGrid";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <QuizDescription />
      <FunctionsScroller />
      <PersonalityGrid />
    </main>
  );
}
