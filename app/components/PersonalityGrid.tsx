"use client";

import FlipCard from "./FlipCard";

const personalities = [
  { type: "INTJ", desc: "The Strategic Mastermind", color: "#264653" },
  { type: "INFJ", desc: "The Insightful Idealist", color: "#6D3D7A" },
  { type: "ENTJ", desc: "The Bold Leader", color: "#8B0000" },
  { type: "ENFJ", desc: "The Charismatic Helper", color: "#FF6F61" },
  { type: "INTP", desc: "The Logical Architect", color: "#1D3557" },
  { type: "INFP", desc: "The Dreamy Creator", color: "#E76F51" },
  { type: "ENTP", desc: "The Debate Wizard", color: "#2A9D8F" },
  { type: "ENFP", desc: "The Sparkling Optimist", color: "#F4A261" },
  { type: "ISTJ", desc: "The Reliable Organizer", color: "#808080" },
  { type: "ISFJ", desc: "The Gentle Protector", color: "#C08081" },
  { type: "ESTJ", desc: "The Efficient Overseer", color: "#4682B4" },
  { type: "ESFJ", desc: "The Friendly Caregiver", color: "#008000" },
  { type: "ISTP", desc: "The Problem Solver", color: "#A0522D" },
  { type: "ISFP", desc: "The Artistic Free Spirit", color: "#9370DB" },
  { type: "ESTP", desc: "The Thrill Seeker", color: "#B22222" },
  { type: "ESFP", desc: "The Life of the Party", color: "#BB7700" },
];

export default function PersonalityGrid() {
  return (
    <section className="bg-black py-16 px-4">
      <h2 className="text-center text-white text-3xl mb-10 font-bold">
        The 16 Personality Types
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {personalities.map((p) => (
          <FlipCard
            key={p.type}
            type={p.type}
            desc={p.desc}
            color={p.color}
          />
        ))}
      </div>
    </section>
  );
}
