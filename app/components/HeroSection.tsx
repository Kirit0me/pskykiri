"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();

  const [catXEnd, setCatXEnd] = useState("300%");
  const [catSize, setCatSize] = useState("w-48"); // default mobile

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 768) {
        // Desktop → slide right
        setCatXEnd("300%");
        setCatSize("w-72");
      } else {
        // Mobile → slide left
        setCatXEnd("-200%");
        setCatSize("w-48");
      }
    }
  }, []);

  // Cat horizontal movement
  const catX = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0%", catXEnd]
  );

  // Black block rising
  const blackY = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["100%", "10%"]
  );

  // Text appearing
  const textOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.6],
    [0, 1]
  );

  const textY = useTransform(
    scrollYProgress,
    [0.3, 0.6],
    [50, 0]
  );

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-300 to-red-400" />

      <motion.div
        style={{ y: blackY }}
        className="
          absolute bottom-1/2 left-0 w-full h-[80%]
          bg-black
          rounded-t-[5%]
        "
      ></motion.div>

      <motion.div
        style={{ x: catX }}
        className={`absolute left-1/2 translate-x-[-50%] bottom-[40%] ${catSize} h-auto`}
      >
        <Image
          src="/images/blackcat.png"
          alt="Cat"
          width={512}
          height={512}
          className="w-full h-auto"
          priority
        />
      </motion.div>

      <motion.div
        style={{
          opacity: textOpacity,
          y: textY,
        }}
        className="absolute bottom-10 w-full text-center px-4"
      >
        {/* <h1 className="text-4xl md:text-6xl font-extrabold text-gray-100 mb-4">
          Welcome to the Big Brain MBTI Quiz!
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Discover your cognitive functions and explore the quirky sides of your personality. Take the quiz below!
        </p> */}
      </motion.div>
    </section>
  );
}
