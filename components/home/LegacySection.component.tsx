"use client";
import Image from "next/image";
import { DownloadIcon, BellIcon, TargetIcon } from "@phosphor-icons/react"; // optional icons

export default function LegacySection() {
  const items = [
    {
      id: 1,
      title: "Gandhi's Vision",
      description:
        "Transforming India through education and peaceful revolution, inspiring generations of change-makers.",
      image: "/images/gandhi.webp",
      icon: <TargetIcon weight='bold' className='w-8 h-8 text-white' />,
    },
    {
      id: 2,
      title: "Sona Towers",
      description:
        "Establishing educational excellence with world-class infrastructure and innovative learning environments.",
      image: "/images/sona-Towers-it-revolution.webp",
      icon: <DownloadIcon weight='bold' className='w-8 h-8 text-white' />,
    },
    {
      id: 3,
      title: "ISRO Collaboration",
      description:
        "Partnering with ISRO for Chandrayaan missions, pioneering space research and technology innovation.",
      image: "/images/isro-and-chandrayaan-legacy.webp",
      icon: <BellIcon weight='bold' className='w-8 h-8 text-white' />,
    },
  ];

  return (
    <section className='w-full py-0 bg-white '>
      <div className='mx-auto '>
        <div className='grid grid-cols-1 md:grid-cols-3 '>
          {items.map((item) => (
            <div key={item.id} className='relative group h-[300px] overflow-hidden '>
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-700'
              />

              {/* Overlay */}
              <div className='absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all duration-500' />

              {/* Content */}
              <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4'>
                {/* Icon */}
                <div className='bg-white/20 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-full mb-4'>
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>

                {/* Description */}
                <p className='text-sm opacity-90 max-w-xs'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
