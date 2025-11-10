"use client";

import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { number: "25K+", label: "Students Graduated", sub: "Alumni worldwide making impact" },
    { number: "98%", label: "Placement Rate", sub: "In top global companies" },
    { number: "100+", label: "Industry Partners", sub: "Leading corporations worldwide" },
    { number: "105+", label: "Years Legacy", sub: "Educational excellence since 1947" },
  ];

  return (
    <section
      className="relative bg-fixed bg-center bg-cover py-20 text-white"
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
