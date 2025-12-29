"use client";

import {
  GraduationCapIcon,
  CpuIcon,
  BrainIcon,
  BriefcaseIcon,
  HandshakeIcon,
  BuildingsIcon,
} from "@phosphor-icons/react";

export default function ExploreInstitutionsSection() {
  const institutions = [
    {
      id: 1,
      name: "Sona Finishing School",
      icon: GraduationCapIcon,
    },
    {
      id: 2,
      name: "Sona Tech School",
      icon: CpuIcon,
    },
    {
      id: 3,
      name: "AI Consultancy",
      icon: BrainIcon,
    },
    {
      id: 4,
      name: "Sona Business School",
      icon: BriefcaseIcon,
    },
    {
      id: 5,
      name: "Contract to Hire",
      icon: HandshakeIcon,
    },
    {
      id: 6,
      name: "GCC",
      icon: BuildingsIcon,
    },
  ];

  return (
    <section className="py-20 bg-[#C9A227] relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        {/* Decorative circles */}
        <span className="absolute top-16 left-12 w-14 h-14 bg-white/10 rounded-full" />
        <span className="absolute top-24 right-20 w-20 h-20 bg-white/10 rounded-full" />
        <span className="absolute bottom-16 left-20 w-16 h-16 bg-white/10 rounded-lg" />

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Explore Our Institutions
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-white/90">
          Discover the diverse academic opportunities across our six specialized
          institutions, each designed to nurture excellence in their respective
          fields
        </p>

        {/* Institution buttons */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {institutions.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl border border-white/30 text-white font-medium
                           hover:bg-white/10 transition-all duration-300"
              >
                <Icon
                  size={20}
                  weight="bold"
                />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <button
            className="px-8 py-3 rounded-xl border-2 border-white text-white font-semibold
                       hover:bg-white hover:text-[#C9A227] transition-all duration-300"
          >
            Schedule Campus Tour
          </button>
        </div>
      </div>
    </section>
  );
}
