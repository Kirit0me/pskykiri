"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface CardProps {
  type: string;
  desc: string;
  color: string;
}

export default function FlipCard({ type, desc, color }: CardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full h-40 perspective"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={flipped ? { rotateY: 180 } : { rotateY: 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-lg p-4 flex items-center justify-center backface-hidden"
          style={{ backgroundColor: color }}
        >
          <h3 className="text-2xl font-bold text-white">{type}</h3>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-lg p-4 flex items-center justify-center backface-hidden rotate-y-180"
          style={{ backgroundColor: color }}
        >
          <p className="text-white text-center">{desc}</p>
        </div>
      </motion.div>
    </div>
  );
}
