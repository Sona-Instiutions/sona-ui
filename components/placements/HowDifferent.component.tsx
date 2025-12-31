"use client";

import {
  Code2,
  Users,
  Lightbulb,
  Wrench,
  BadgeCheck,
  UserCheck,
  Globe,
} from "lucide-react";
import Image from "next/image";


export default function HowWeAreDifferent() {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Background */}
      <Image
        src="/images/placements/how_are_we_different.webp"
        alt="How Are We Different"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        {/* ===== Top Section ===== */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            How Are We <span className="text-yellow-400">Different</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300 text-sm md:text-base">
          SCALE&apos;s unique approach to industry training and career preparation sets our graduates apart in the competitive job market.
          </p>
        </div>

        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <FeatureCard
            icon={<Code2 className="h-6 w-6 text-white" />}
            iconBg="bg-red-500"
            title="Industry-Integrated Curriculum"
            description="Features real-world projects with live industry data, ensuring students work on actual business challenges from day one."
          />

          <FeatureCard
            icon={<Users className="h-6 w-6 text-white" />}
            iconBg="bg-blue-500"
            title="Industry Mentorship Program"
            description="Offers direct mentorship from senior professionals at top companies for personalized career guidance."
          />

          <FeatureCard
            icon={<Lightbulb className="h-6 w-6 text-white" />}
            iconBg="bg-green-500"
            title="Innovation Labs"
            description="State-of-the-art facilities equipped with cutting-edge technology for hands-on experience with industry-standard tools."
          />
        </div>

        {/* ===== Bottom Section ===== */}
        <div className="bg-zinc-100 rounded-3xl shadow-xl px-6 md:px-10 py-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Industry Training{" "}
              <span className="text-yellow-500">Excellence</span>
            </h3>
            <p className="mt-3 max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
            Our comprehensive industry training program bridges the gap between academic learning and professional requirements
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <MiniFeature
              icon={<Wrench className="h-7 w-7 text-red-500" />}
              title="Live Project Training"
              description="Work on real company projects with industry professionals as guides and mentors"
              bgClass="bg-red-50"
            />

            <MiniFeature
              icon={<BadgeCheck className="h-7 w-7 text-blue-500" />}
              title="Industry Certifications"
              description="Earn globally recognized certifications from leading technology companies"
              bgClass="bg-blue-50"
            />

            <MiniFeature
              icon={<UserCheck className="h-7 w-7 text-green-500" />}
              title="Soft Skills Development"
              description="Communication, leadership, and teamwork skills through structured programs"
              bgClass="bg-green-50"
            />

            <MiniFeature
              icon={<Globe className="h-7 w-7 text-green-500" />}
              title="Global Exposure"
              description="International internships and exchange programs with partner universities"
              bgClass="bg-green-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Components ---------- */

function FeatureCard({
  icon,
  iconBg,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#f3f3f4] rounded-2xl shadow-lg p-6 text-center">
      <div
        className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function MiniFeature({
  icon,
  title,
  description,
  bgClass,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgClass: string;
}) {
  return (
    <div className="text-center">
      <div
        className={`mx-auto mb-4 flex h-15 w-15 items-center justify-center rounded-xl ${bgClass}`}
      >
        {icon}
      </div>

      <h5 className="font-semibold text-gray-900">{title}</h5>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}

