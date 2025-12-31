"use client";

import Image from "next/image";
import { Trophy, IndianRupee, Building2, Star } from "lucide-react";

const stats = [
  {
    icon: Trophy,
    value: "97",
    title: "Placement Rate",
    description: "Percentage of students placed",
  },
  {
    icon: IndianRupee,
    value: "12.5",
    title: "Average Package",
    description: "LPA across all programs",
  },
  {
    icon: Building2,
    value: "250",
    title: "Recruiting Companies",
    description: "Industry partners hiring",
  },
  {
    icon: Star,
    value: "45",
    title: "Highest Package",
    description: "LPA record achievement",
  },
];

export default function PlacementsPage() {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Background image */}
      
        <Image
          src="/images/placements/placement_statistics_bg.webp"
          alt="Placements"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-white/95" />
     

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Placement <span className="text-yellow-500">Statistics</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-700 text-sm md:text-base">
          Our remarkable placement record speaks volumes about the quality of education and industry readiness of our graduates
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                <item.icon className="h-6 w-6 text-yellow-500" />
              </div>

              <h3 className="text-3xl font-bold text-gray-900">{item.value}</h3>

              <p className="mt-2 font-semibold text-gray-800">{item.title}</p>

              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
