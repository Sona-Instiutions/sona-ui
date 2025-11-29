import Image from "next/image";
import { Check } from "lucide-react";

export default function PioneeringExcellenceSection() {
  const highlights = [
    {
      id: 1,
      title: "Innovative Curriculum Design",
      description:
        "Courses crafted with direct industry input and future-focused learning outcomes.",
    },
    {
      id: 2,
      title: "Research-Driven Excellence",
      description:
        "Cutting-edge research facilities fostering innovation and discovery.",
    },
    {
      id: 3,
      title: "Global Impact Focus",
      description:
        "Preparing graduates to address global challenges through sustainable solutions.",
    },
  ];

  return (
    <section className="bg-white py-7 md:py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* LEFT: Content */}
        <div className="md:w-1/2 text-left">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Pioneering Excellence in{" "}
            <span className="text-yellow-500">Higher Education</span>
          </h2>

          {/* Divider (thin blue line) */}
          <div className="w-20 h-[2px] bg-[#002D72] mb-6"></div>

          {/* Paragraphs */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            SCALE by Sona Valliappa Group represents a revolutionary approach to
            education, bridging the gap between traditional learning and
            industry requirements through innovative curriculum and cutting-edge
            technology.
          </p>

          <p className="text-gray-600 mb-10 leading-relaxed">
            Founded on the principles of academic excellence and practical
            application, SCALE has emerged as a premier destination for students
            seeking world-class education that prepares them for the challenges
            of tomorrow&apos;s dynamic professional landscape.
          </p>

          {/* Highlights List */}
          <div className="space-y-6">
            {highlights.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-[#002D72] rounded-full w-6 h-6 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Image with Badge */}
        <div className="md:w-1/2 relative">
          <div className="relative w-[520px] h-[400px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/pioneering.webp"
              alt="SCALE Campus"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>

          {/* Badge */}
          <div className="absolute bottom-10 right-10 bg-[#002D72] text-white px-6 py-3 rounded-xl shadow-md text-center">
            <p className="text-2xl font-bold leading-none">105</p>
            <p className="text-sm">Years of Legacy</p>
          </div>
        </div>
      </div>
    </section>
  );
}
