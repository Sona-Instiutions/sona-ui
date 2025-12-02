"use client";

import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { number: "100", label: "Years of legacy", sub: "Shaped by excellence across generations." },
    { number: "2", label: "Year fully residential PGDM program", sub: " Immersive learning designed for future leaders."},
    { number: "100+", label: "Industry Partners", sub: "Robust ecosystem enabling career-ready exposure." },
    { number: "5,000+", label: "Successful Alumni Worldwide", sub: "Strong network driving global professional growth." },
  ];

  return (
    <section
      className="relative bg-fixed bg-center bg-cover py-7 md:py-20 text-white"
      style={{ backgroundImage: "url('/images/usp-bg.webp')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative z-10"
          >
            <h2 className="text-4xl font-bold">{stat.number}</h2>
            <p className="font-semibold">{stat.label}</p>
            <p className="text-sm opacity-80">{stat.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
