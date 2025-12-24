"use client";
import Image from "next/image";
import { CheckIcon } from "@phosphor-icons/react";

export default function PioneeringExcellenceSection() {
  const highlights = [
    {
      id: 1,
      title: "By the Industry. For the Industry. To the Industry.",
      description:
        "Sona Tech School is built through direct collaboration with global industry leaders to ensure every programme is relevant, current, and aligned with real-world expectations.",
    },
    {
      id: 2,
      title: "Specialised Focus Areas for GCCs ",
      description:
        "Learners gain expertise in domains such as Green IT, Synthetic Data Engineering, AI Ethics, Zero Trust Systems, and Autonomous Systems Governance.",
    },
    {
      id: 3,
      title: "Training on Emerging Technologies",
      description:
        "The curriculum covers top global emerging technologies including AI, Quantum, Cybersecurity, Digital Twins, Blockchain, Robotics, and Spatial Computing.",
    },
  ];

  return (
    <section className='bg-white py-7 md:py-20'>
      <div className='container mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-12'>
        {/* LEFT: Content */}
        <div className='md:w-1/2 text-left'>
          {/* Heading */}
          <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight'>
            Pioneering Excellence in <span className='text-yellow-500'>Higher Education</span>
          </h2>

          {/* Divider (thin blue line) */}
          <div className='w-20 h-[2px] bg-[#002D72] mb-6'></div>

          {/* Paragraphs */}
          <p className='text-gray-600 mb-6 leading-relaxed'>
            SCALE- Sona Centre for Advanced Learning and Entrepreneurship, prepares high-quality, industry-ready
            professionals equipped with advanced technologies, global industry practices, and future-focused skills
            demanded by GCCs. Designed in collaboration with industry leaders, the School develops talent that is
            technically strong, innovation-driven, and capable of contributing from day one. With specialised pathways,
            global certifications, and 24×7 HOT Labs, Sona Tech School ensures learners gain practical expertise, deep
            industry awareness, and the agility to excel in a global tech ecosystem.
          </p>
          {/* Highlights List */}
          <div className='space-y-6'>
            {highlights.map((item) => (
              <div key={item.id} className='flex items-start gap-3'>
                <div className='flex-shrink-0 mt-1'>
                  <div className='bg-[#002D72] rounded-full w-6 h-6 flex items-center justify-center text-white'>
                    <CheckIcon className='w-4 h-4 text-white' weight='bold' />
                  </div>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-1'>{item.title}</h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Image with Badge */}
        <div className='md:w-1/2 relative'>
          <div className='relative w-[520px] h-[400px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg'>
            <Image
              src='/images/about-page-intro.webp'
              alt='SCALE Campus'
              fill
              className='object-cover rounded-2xl'
              priority
            />
          </div>

          {/* Badge */}
          <div className='absolute bottom-10 right-10 bg-[#002D72] text-white px-6 py-3 rounded-xl shadow-md text-center'>
            <p className='text-2xl font-bold leading-none'>105+</p>
            <p className='text-sm'>Years of Legacy</p>
          </div>
        </div>
      </div>
    </section>
  );
}
