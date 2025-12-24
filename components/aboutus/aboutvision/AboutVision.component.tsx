"use client";
import { CheckIcon } from "@phosphor-icons/react";
import Image from "next/image";

export default function VisionMissionSection() {
  const visionParagraphs = [
    `To empower organizations, institutions, and innovators to accelerate business transformation, capability expansion, and entrepreneurial impact through integrated talent development, technology-enabled learning, and strategic innovation ecosystems.`,
  ];

  const missionIntro = `Empower students with industry-relevant, technology-driven management education by integrating AI, digital transformation, analytics, and emerging technologies into every aspect of learning. Empower students with industry-relevant, technology-driven management education by integrating AI, digital transformation, analytics, and emerging technologies into every aspect of learning.`;

  const missionPoints = [
    {
      id: 1,
      title: "Build a vibrant ecosystem of global collaboration",
      text: "through partnerships with international universities, industry mentors, thought leaders, and cross-border experiential programs.",
    },
    {
      id: 2,
      title: "Foster a culture of entrepreneurship and innovation",
      text: "through a world-class startup incubation centre that nurtures founders, accelerates ideas, and builds job creators.",
    },
    {
      id: 3,
      title: "Provide a transformative residential learning environment",
      text: "that develops leadership, character, creativity, teamwork, and lifelong learning habits.",
    },
    {
      id: 4,
      title: "Bridge academia and industry meaningfully",
      text: "through live projects, corporate internships, labs, problem-solving workshops, and curricula designed in collaboration with industry experts.",
    },
    {
      id: 5,
      title: "Cultivate ethical, socially responsible leaders",
      text: "who apply their knowledge to build inclusive, sustainable, and community-focused business solutions.",
    },
  ];

  return (
    <div>
      {/* Vision Section */}
      <section className='py-14 md:py-20 bg-white'>
        <div className='container mx-auto px-6 text-center max-w-4xl'>
          {/* Top Divider */}
          <div className='w-20 h-[2px] bg-[#002D72] mx-auto mb-6 rounded-sm' />

          {/* Heading */}
          <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900 mb-8'>
            Our <span className='text-yellow-500'>Vision</span>
          </h2>

          {/* Paragraphs */}
          <div className='text-gray-600 leading-relaxed text-lg md:text-xl'>
            {visionParagraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "mb-8" : "mt-6"}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-16 md:py-24 bg-gray-50'>
        <div className='container mx-auto px-6 max-w-7xl'>
          <div className='grid grid-cols-1 md:grid-cols-12 gap-8 items-center'>
            {/* Left: text column (col-span 6) */}
            <div className='md:col-span-6 lg:col-span-6'>
              <div className='w-12 h-[2px] bg-[#002D72] rounded-sm mr-4' />
              {/* small divider + heading */}
              <div className='flex items-center mb-6'>
                <h3 className='text-2xl md:text-3xl font-extrabold text-gray-900'>
                  Our <span className='text-yellow-500'>Mission</span>
                </h3>
              </div>

              {/* intro */}
              <p className='text-gray-600 mb-8 leading-relaxed'>{missionIntro}</p>

              {/* bullet points with icon badges */}
              <div className='space-y-6'>
                {missionPoints.map((m) => (
                  <div key={m.id} className='flex gap-4 items-start'>
                    {/* round icon badge (blue) */}
                    <div className='flex-shrink-0 mt-1'>
                      <div className='bg-[#002D72] rounded-full w-[26px] h-[26px] flex items-center justify-center text-white flex-shrink-0'>
                        {/* simple icon - clipboard/target like */}
                        <CheckIcon weight='bold' className='w-3.5 h-3.5' />
                      </div>
                    </div>

                    <div>
                      <h4 className='text-sm md:text-base font-semibold text-gray-900'>{m.title}</h4>
                      <p className='text-md text-gray-600 leading-relaxed max-w-xl'>{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image card (col-span 6) */}
            <div className='md:col-span-6 lg:col-span-6 flex justify-center md:justify-end'>
              <div className='relative w-full max-w-md md:max-w-lg'>
                <div className='rounded-2xl overflow-hidden shadow-xl'>
                  <div className='relative aspect-[16/12] w-full'>
                    <Image
                      src='/images/mission-page.webp' // replace with your image
                      alt='Students group'
                      fill
                      className='object-cover'
                      priority
                    />
                  </div>
                </div>

                {/* stat badge (overlapping bottom-left of image) */}
                <div className='absolute -bottom-6 left-6 transform translate-y-0'>
                  <div className='bg-white rounded-xl shadow-lg px-5 py-4 border-2 border-red-300'>
                    <div className='text-2xl md:text-3xl font-extrabold text-yellow-500'>25,000+</div>
                    <div className='text-xs text-gray-500 mt-1'>Lives Transformed</div>
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
