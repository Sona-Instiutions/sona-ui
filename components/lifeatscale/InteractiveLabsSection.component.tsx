"use client";

// components/InteractiveLabsSection.tsx
import Image from "next/image";
import { Check } from "phosphor-react";

export default function InteractiveLabsSection() {
  const labs = [
    {
      id: 1,
      title: "Biotechnology Research Center",
      description:
        "Our state-of-the-art biotechnology lab features advanced DNA sequencing equipment, cell culture facilities, and bioinformatics workstations. Students engage in cutting-edge research on genetic engineering, drug discovery, and sustainable biotechnology solutions.",
      points: [
        "PCR Machines & DNA Analyzers",
        "Cell Culture & Fermentation Units",
        "Bioinformatics Computing Cluster",
      ],
      image: "/images/labs/biotech.jpg",
      reverse: false,
    },
    {
      id: 2,
      title: "Advanced Materials Laboratory",
      description:
        "Discover the future of materials science with our comprehensive testing and characterization facilities. From nanomaterials synthesis to mechanical testing, students explore innovative materials for aerospace, automotive, and renewable energy applications.",
      points: [
        "Scanning Electron Microscopy",
        "X-Ray Diffraction Systems",
        "Universal Testing Machines",
      ],
      image: "/images/labs/materials.jpg",
      reverse: true,
    },
    {
      id: 3,
      title: "Renewable Energy Innovation Hub",
      description:
        "Pioneer sustainable energy solutions in our dedicated renewable energy laboratory. Students work on solar cell optimization, wind energy systems, and energy storage technologies, contributing to India’s clean energy future.",
      points: [
        "Solar Cell Testing Stations",
        "Wind Tunnel Facilities",
        "Battery Testing & Development",
      ],
      image: "/images/labs/renewable.jpg",
      reverse: false,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f9fafb]">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="w-20 h-[2px] bg-[#002D72] mx-auto mb-4 rounded-sm" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Interactive <span className="text-yellow-500">Labs</span> &
            Innovation Space
          </h2>
          <p className="mt-4 text-gray-600">
            Explore our cutting-edge facilities where theoretical knowledge
            transforms into practical innovation and breakthrough discoveries.
          </p>
        </div>

        {/* Labs */}
        <div className="space-y-20">
          {labs.map((lab) => (
            <div
              key={lab.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
                lab.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={lab.reverse ? "md:order-2" : ""}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={lab.image}
                      alt={lab.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={lab.reverse ? "md:order-1" : ""}>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {lab.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  {lab.description}
                </p>

                {/* Bullet points */}
                <ul className="mt-6 space-y-3">
                  {lab.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#002D72] flex items-center justify-center">
                        <Check
                          size={14}
                          weight="bold"
                          className="text-white"
                        />
                      </span>
                      <span className="text-sm text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
