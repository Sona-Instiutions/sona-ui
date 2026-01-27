"use client";

import { FileVueIcon, NotebookIcon, HandshakeIcon, GlobeIcon } from "@phosphor-icons/react";

export default function CollaborateSection() {
  const items = [
    {
      id: 1,
      icon: <FileVueIcon weight='bold' className='w-8 h-8 text-yellow-500' />,
      title: "Talent Pipeline for Emerging Tech",
      description: "Access day-one-ready talent skilled in AI, Cloud, and Data Science.",
    },
    {
      id: 2,
      icon: <NotebookIcon weight='bold' className='w-8 h-8 text-yellow-500' />,
      title: "Innovation & Enterprise Acceleration",
      description: "Co-create solutions and scale high-impact ventures faster.",
    },
    {
      id: 3,
      icon: <HandshakeIcon weight='bold' className='w-8 h-8 text-yellow-500' />,
      title: "Industry Co-Created Capability",
      description: "Ensure maximum relevance and minimum time-to-value for all programs.",
    },
    {
      id: 4,
      icon: <GlobeIcon weight='bold' className='w-8 h-8 text-yellow-500' />,
      title: "Flexible Global Capability Scaling",
      description: "Build, operate, and transform GCCs with reduced operational risk.",
    },
  ];

  return (
    <section
      className='relative bg-fixed bg-center bg-cover py-4 md:py-10 text-white'
      style={{ backgroundImage: "url('/images/collabarate-bg.webp')" }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black/60' />

      <div className='relative z-10 container mx-auto px-6 text-center'>
        {/* Section Heading */}
        <h2 className='text-4xl font-extrabold mb-4'>
          Collaborate <span className='text-yellow-400'>&amp; Innovate</span>
        </h2>
        <p className='text-gray-200 max-w-3xl mx-auto mb-16'>
          SCALE brings together enterprises, innovators, students, and global institutions to co-create solutions,
          accelerate research, develop talent, and build industry-focused projects that shape the future of business and
          technology.
        </p>

        {/* Info Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          {items.map((item) => (
            <div
              key={item.id}
              className='bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-start hover:shadow-xl transition-all duration-500'
            >
              <div className='w-16 h-16 bg-yellow-100 flex items-center justify-center rounded-lg mb-6'>
                {item.icon}
              </div>
              <h3 className='font-semibold text-lg mb-3'>{item.title}</h3>
              <p className='text-sm text-gray-600'>{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {/* <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-md transition-all">
          Collaborate with us
        </button> */}
      </div>
    </section>
  );
}
