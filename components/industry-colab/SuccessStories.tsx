"use client";

import Image from "next/image";
import { BuildingsIcon, HeartbeatIcon, LeafIcon, UsersThreeIcon } from "@phosphor-icons/react";

export default function SuccessStories() {
  const stories = [
    {
      company: "TechCorp Solutions",
      field: "Software Development",
      icon: <BuildingsIcon size={22} weight='fill' className='text-blue-500' />,
      img: "/images/event-2.webp",
      title: "50% Faster Time-to-Market",
      desc: "Through our joint R&D program, TechCorp developed a revolutionary AI platform that reduced their product development cycle by 50%, resulting in $2M additional revenue.",
      duration: "18 months",
      participants: "25 Students Involved",
    },
    {
      company: "HealthTech Innovations",
      field: "Medical Technology",
      icon: <HeartbeatIcon size={22} weight='fill' className='text-green-500' />,
      img: "/images/event-2.webp",
      title: "FDA-Approved Medical Device",
      desc: "Collaborative research with our Medical College led to the development of a groundbreaking diagnostic device that received FDA approval and is now used in 200+ hospitals.",
      duration: "24 months",
      participants: "15 Researchers",
    },
    {
      company: "GreenEnergy Corp",
      field: "Renewable Energy",
      icon: <LeafIcon size={22} weight='fill' className='text-green-600' />,
      img: "/images/event-2.webp",
      title: "30% Efficiency Improvement",
      desc: "Our engineering students developed an innovative solar panel design that increased energy efficiency by 30%, helping GreenEnergy secure $10M in new contracts.",
      duration: "12 months",
      participants: "20 Students",
    },
  ];

  return (
    <section className='py-16 bg-white'>
      {/* Heading */}
      <div className='text-center max-w-2xl mx-auto mb-14'>
        <h2 className='text-4xl font-extrabold'>
          Success <span className='text-yellow-400'>Stories</span>
        </h2>
        <p className='text-gray-600 mt-4'>
          Discover how leading organizations have transformed their business through strategic partnerships with SCALE
        </p>
      </div>

      {/* Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-6'>
        {stories.map((item, index) => (
          <div key={index} className='bg-white rounded-3xl shadow-md hover:shadow-xl transition-all overflow-hidden'>
            {/* Top Image */}
            <div className='relative w-full h-56'>
              <Image src={item.img} alt={item.company} fill className='object-cover' priority />
            </div>

            {/* Card Content */}
            <div className='p-6 space-y-4'>
              {/* Company + Icon */}
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center'>{item.icon}</div>
                <div>
                  <h4 className='font-semibold'>{item.company}</h4>
                  <p className='text-sm text-gray-500'>{item.field}</p>
                </div>
              </div>

              {/* Title */}
              <h3 className='text-lg font-bold'>{item.title}</h3>

              {/* Description */}
              <p className='text-gray-600 text-sm leading-relaxed'>{item.desc}</p>

              {/* Footer Stats */}
              <div className='flex items-center justify-between pt-2 text-sm'>
                <p className='text-yellow-500 font-medium'>Partnership Duration: {item.duration}</p>

                <div className='flex items-center gap-2 text-gray-700'>
                  <UsersThreeIcon size={18} weight='fill' className='text-gray-500' />
                  <span>{item.participants}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
