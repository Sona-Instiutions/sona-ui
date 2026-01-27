"use client";

import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { number: "100+", label: "Years of legacy", sub: "Heritage shaping innovation and industry growth." },
    { number: "200+", label: "Industry Collaborations", sub: "Partnerships driving capability and real outcomes.  "},
    { number: "150+", label: "Hiring & Workforce Partners", sub: "Enterprises trusting SCALE for future-ready talent. " },
    { number: "300+", label: "Corporate Projects Delivered", sub: "Practical learning aligned with real business needs." },
  ];

  return (
    <section
      className="relative bg-fixed bg-center bg-cover py-4 md:py-10 text-white"
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
