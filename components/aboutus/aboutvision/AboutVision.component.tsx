// components/VisionMissionSection.tsx
import Image from "next/image";

export default function VisionMissionSection() {
  const visionParagraphs = [
    `To become an institute of great repute, in the fields of Science, Engineering, Technology and Management studies, by offering a full range of programmes of global standard to foster research, and to transform the students into globally competent personalities.`,
    `We envision a future where SCALE graduates become global leaders, entrepreneurs, and innovators who drive positive change across industries and communities. Our commitment extends beyond traditional education to create an ecosystem that nurtures creativity, critical thinking, and sustainable solutions for tomorrow's challenges.`,
  ];

  const missionIntro = `To provide world-class education that combines academic rigor with practical application, fostering innovation, research excellence, and ethical leadership in our students.`;

  const missionPoints = [
    {
      id: 1,
      title: "Innovation Excellence",
      text: "Cultivating a culture of innovation through cutting-edge research, entrepreneurship programs, and industry partnerships that drive technological advancement.",
    },
    {
      id: 2,
      title: "Global Impact",
      text: "Preparing students to address global challenges through sustainable solutions, cross-cultural understanding, and collaborative international initiatives.",
    },
    {
      id: 3,
      title: "Lifelong Learning",
      text: "Instilling a passion for continuous learning and adaptation in an ever-evolving technological and social landscape.",
    },
  ];

  return (
    <div>
      {/* Vision Section */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          {/* Top Divider */}
          <div className="w-20 h-[2px] bg-[#002D72] mx-auto mb-6 rounded-sm" />

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
            Our <span className="text-yellow-500">Vision</span>
          </h2>

          {/* Paragraphs */}
          <div className="text-gray-600 leading-relaxed text-lg md:text-xl">
            {visionParagraphs.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "mb-8" : "mt-6"}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: text column (col-span 6) */}
            <div className="md:col-span-6 lg:col-span-6">
              <div className="w-12 h-[2px] bg-[#002D72] rounded-sm mr-4" />
              {/* small divider + heading */}
              <div className="flex items-center mb-6">
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  Our <span className="text-yellow-500">Mission</span>
                </h3>
              </div>

              {/* intro */}
              <p className="text-gray-600 mb-8 leading-relaxed">
                {missionIntro}
              </p>

              {/* bullet points with icon badges */}
              <div className="space-y-6">
                {missionPoints.map((m) => (
                  <div
                    key={m.id}
                    className="flex gap-4 items-start"
                  >
                    {/* round icon badge (blue) */}
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-[#002D72] flex items-center justify-center shadow-md">
                        {/* simple icon - clipboard/target like */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm md:text-base font-semibold text-gray-900">
                        {m.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-xl">
                        {m.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image card (col-span 6) */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center md:justify-end">
              <div className="relative w-full max-w-md md:max-w-lg">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <div className="relative aspect-[16/12] w-full">
                    <Image
                      src="/images/mission-group.jpg" // replace with your image
                      alt="Students group"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* stat badge (overlapping bottom-left of image) */}
                <div className="absolute -bottom-6 left-6 transform translate-y-0">
                  <div className="bg-white rounded-xl shadow-lg px-5 py-4 border-2 border-red-300">
                    <div className="text-2xl md:text-3xl font-extrabold text-yellow-500">
                      25,000+
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Lives Transformed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* grid */}
        </div>
      </section>
    </div>
  );
}
