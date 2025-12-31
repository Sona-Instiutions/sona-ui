"use client";
import Image from "next/image";
import { BookOpen, Users, ClipboardCheck, GraduationCap } from "lucide-react";

const steps = [
  {
    title: "Career Preparation",
    description:
      "Comprehensive skill development, resume building, and interview preparation through dedicated training programs and workshops.",
    icon: BookOpen,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    title: "Industry Interaction",
    description:
      "Direct engagement with industry professionals through campus visits, networking events, and pre-placement talks by leading companies.",
    icon: Users,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
  },
  {
    title: "Interview Process",
    description:
      "Structured interview rounds including technical assessments, HR discussions, and group activities conducted on campus.",
    icon: ClipboardCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    title: "Job Placement",
    description:
      "Successful placement with continuous support for offer negotiations and career guidance for long-term professional growth.",
    icon: GraduationCap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
];

export default function PlacementProcessFlow() {
  return (
    <section className="relative w-full py-20">
      {/* Background */}

      <Image
        src="/images/placements/placement_process_flow.webp"
        alt="Placement Process Flow"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/95" />

      <div className="mx-auto max-w-7xl px-4 z-10 relative">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Placement <span className="text-yellow-500">Process Flow</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
          Our comprehensive placement process ensures every student is industry-ready and connected with the right opportunities.
          </p>
        </div>

        {/* Process Cards */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
            >
              {/* Arrow (desktop only) */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-0 h-0 border-t-12 border-b-12 border-l-15 border-transparent border-l-red-500" />
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-md p-6 text-center h-full">
                <div
                  className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${step.iconBg}`}
                >
                  <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                </div>

                <h4 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h4>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
