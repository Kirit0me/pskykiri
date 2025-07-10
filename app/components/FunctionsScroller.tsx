"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const functions = [
  { name: "Introverted Thinking (Ti)", emoji: "🧠", desc: "Analytical and precise thinking." },
  { name: "Extraverted Thinking (Te)", emoji: "📊", desc: "Organizing external world efficiently." },
  { name: "Introverted Feeling (Fi)", emoji: "❤️", desc: "Deep personal values and authenticity." },
  { name: "Extraverted Feeling (Fe)", emoji: "🤝", desc: "Harmony and caring for others." },
  { name: "Introverted Intuition (Ni)", emoji: "🔮", desc: "Seeing future patterns." },
  { name: "Extraverted Intuition (Ne)", emoji: "✨", desc: "Exploring new possibilities." },
  { name: "Introverted Sensing (Si)", emoji: "📚", desc: "Past experience and detail recall." },
  { name: "Extraverted Sensing (Se)", emoji: "🎯", desc: "Experiencing the present vividly." },
];

export default function FunctionsScroller() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], 
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black py-20 overflow-hidden"
    >
      <motion.div
        className="hidden md:block absolute left-1/2 top-0 w-1 bg-gradient-to-b from-green-400 via-pink-400 to-yellow-300"
        style={{
          height: lineHeight,
          translateX: "-50%",
        }}
      />


      <motion.div
        className="md:hidden absolute left-6 top-0 w-1 bg-gradient-to-b from-green-400 via-pink-400 to-yellow-300"
        style={{
          height: lineHeight,
        }}
      />


      <div className="relative max-w-6xl mx-auto flex flex-col space-y-16 mt-10">
        {functions.map((fn, idx) => (
          <motion.div
            key={fn.name}
            className={`
              flex flex-col md:flex-row
              ${idx % 2 === 0 ? "md:justify-end md:pr-16" : "md:justify-start md:pl-16"}
              items-center md:items-start text-center md:text-left
            `}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            <div className="hidden md:block w-1 h-24 bg-gradient-to-b from-transparent to-green-400" />

            <div
              className={`
                max-w-sm rounded-xl p-6
                bg-gradient-to-br from-gray-800 to-gray-700
                text-white shadow-lg
                hover:scale-105 transition
              `}
            >
              <div className="text-5xl mb-3">{fn.emoji}</div>
              <h3 className="text-2xl font-bold text-green-300 mb-2">
                {fn.name}
              </h3>
              <p className="text-yellow-300">{fn.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
