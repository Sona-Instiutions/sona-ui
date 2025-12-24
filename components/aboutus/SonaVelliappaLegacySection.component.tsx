"use client";
import { GraduationCapIcon, FlaskIcon, RocketIcon, GlobeIcon } from "@phosphor-icons/react";

export default function SonaVelliappaLegacySection() {
  const items = [
    {
      id: 1,
      icon: <GraduationCapIcon weight='bold' className='w-7 h-7 text-yellow-400' />,
      title: "Educational Pioneer",
      description:
        "Sona Velliappa’s visionary leadership established a foundation of academic excellence that has educated over 100,000 students across multiple disciplines.",
      highlight: "1947",
      subtext: "Foundation Year",
    },
    {
      id: 2,
      icon: <FlaskIcon weight='bold' className='w-7 h-7 text-yellow-400' />,
      title: "Ethical and sustainable technology",
      description:
        "Preparing responsible professionals capable of innovating in environments where technology and ethics intersect.",
      highlight: "500+",
      subtext: "Patents Filed",
    },
    {
      id: 3,
      icon: <RocketIcon weight='bold' className='w-7 h-7 text-yellow-400' />,
      title: "Decades of academic excellence ",
      description:
        "A proven legacy of producing technically strong, industry-ready graduates for global organisations. ",
      highlight: "15+",
      subtext: "Space Projects",
    },
    {
      id: 4,
      icon: <GlobeIcon weight='bold' className='w-7 h-7 text-yellow-400' />,
      title: "Built with global partnerships",
      description: "Supporting learners with global exposure, advanced labs, and international training standards",
      highlight: "50+",
      subtext: "Global Partners",
    },
  ];

  return (
    <section
      className='relative bg-center bg-cover bg-fixed py-7 md:py-20 text-white'
      style={{ backgroundImage: "url('/images/sona-velliappa.webp')" }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black/70' />

      <div className='relative z-10 container mx-auto px-6 text-center'>
        {/* Section Heading */}
        <h2 className='text-4xl font-extrabold mb-4'>
          A Legacy of <span className='text-yellow-400'>Global-Ready</span> Talent
        </h2>
        <div className='w-20 h-[2px] bg-yellow-400 mx-auto mb-4'></div>
        <p className='text-gray-200 max-w-3xl mx-auto mb-16'></p>

        {/* Cards Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {items.map((item) => (
            <div
              key={item.id}
              className='bg-white text-gray-900 rounded-3xl shadow-lg p-8 flex flex-col items-center justify-start hover:shadow-2xl transition-all duration-500'
            >
              {/* Icon */}
              <div className='w-14 h-14 bg-[#002D72] rounded-2xl flex items-center justify-center mb-6'>
                {item.icon}
              </div>

              {/* Title */}
              <h3 className='font-bold text-lg mb-3'>{item.title}</h3>

              {/* Description */}
              <p className='text-gray-600 text-sm leading-relaxed mb-6'>{item.description}</p>

              {/* Highlight */}
              {/* <div>
                <p className="text-yellow-500 text-xl font-extrabold leading-none">
                  {item.highlight}
                </p>
                <p className="text-sm text-gray-500">{item.subtext}</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
