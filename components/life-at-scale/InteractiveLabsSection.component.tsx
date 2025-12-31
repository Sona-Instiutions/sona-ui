"use client";

// components/InteractiveLabsSection.tsx
import Image from "next/image";
import { CheckIcon } from "@phosphor-icons/react";

export default function InteractiveLabsSection() {
  const labs = [
    {
      id: 1,
      title: "24/7 HOT Lab (Hands-On Training Lab)",
      description:
        "SCALE’s 24/7 HOT Lab is an always-on innovation space that allows students to learn, experiment, and build without time constraints. Equipped with industry-grade platforms and real-world datasets, the lab enables continuous hands-on practice aligned with global enterprise and GCC requirements.",
      points: [
        "AI & Generative AI Development Environments",
        "Cloud, DevOps & Edge Computing Sandboxes",
        "Enterprise-Grade Development & Testing Platforms",
      ],
      image: "/images/life-at-scale/hot_lab.webp",
      reverse: false,
    },
    {
      id: 2,
      title: "AI & Emerging Technologies Innovation Lab",
      description:
        "This lab acts as SCALE’s central innovation hub, where students work on applied AI, analytics, and next-generation technologies. Guided by industry mentors, learners develop scalable solutions addressing real business and societal challenges.",
      points: [
        "Machine Learning & Advanced Analytics Workstations",
        "Responsible AI, Ethics & Governance Toolkits",
        "Digital Twins & Simulation Platforms",
      ],
      image: "/images/life-at-scale/ai_and_emerging_technologies_innovation_lab.webp",
      reverse: true,
    },
    {
      id: 3,
      title: "Green IT & Sustainable Computing Lab",
      description:
        "The Green IT & Sustainable Computing Lab focuses on building technology solutions that are efficient, responsible, and future-ready. Students explore sustainable architectures, energy-efficient systems, and environmentally conscious digital practices aligned with global ESG goals.",
      points: [
        "Energy-Efficient Computing & Optimization Tools",
        "Sustainable Cloud & Infrastructure Models",
        "ESG, Carbon Tracking & Impact Analytics Platforms",
      ],
      image: "/images/life-at-scale/green_it_and_sustainable_computing_lab.webp",
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
          Explore our cutting-edge facilities where theoretical knowledge transforms into practical innovation and breakthrough discoveries.
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
                        <CheckIcon
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
