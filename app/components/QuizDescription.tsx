"use client";

import { motion } from "framer-motion";

export default function QuizDescription() {
  return (
    <section className="bg-black text-yellow-300 py-12 px-6 text-center">
      <motion.p
        className="max-w-2xl mx-auto text-lg md:text-xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Discover your personality profile based on 8 cognitive functions.
        Take a short quiz and explore the powers that drive your mind!
      </motion.p>
    </section>
  );
}
