"use client";

import Image from "next/image";

const partners = [
  {
    name: "Google",
    logo: "/images/partners/google.svg",
  },
  {
    name: "Microsoft",
    logo: "/images/partners/microsoft.svg",
  },
  {
    name: "Amazon",
    logo: "/images/partners/amazon.svg",
  },
  {
    name: "Apple",
    logo: "/images/partners/apple.svg",
  },
  {
    name: "Meta",
    logo: "/images/partners/meta.svg",
  },
  {
    name: "Netflix",
    logo: "/images/partners/netflix.svg",
  },
];

export default function HiringPartners() {
  return (
    <section className="w-full py-20 bg-[#f9fafb]">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our <span className="text-yellow-500">Hiring Partners</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
            Leading companies across diverse industries trust SCALE graduates
            for their technical expertise and professional excellence
          </p>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 h-28 transition-all duration-300 hover:shadow-md"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={80}
                height={40}
                className="object-contain"
              />
              <p className="mt-2 text-sm text-gray-600">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
