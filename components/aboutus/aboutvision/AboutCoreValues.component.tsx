"use client";
import { LightbulbIcon, ShieldCheckIcon, UsersIcon } from "@phosphor-icons/react";

export default function CoreValuesSection() {
  const values = [
    {
      id: 1,
      title: "Designed with industry leaders ",
      description: "Curriculum and initiatives shaped by CXOs, founders, and tech practitioners",
      color: "from-blue-400 to-blue-600",
      underline: "bg-blue-400",
      icon: <LightbulbIcon weight='bold' className='w-8 h-8 text-white' />,
    },
    {
      id: 2,
      title: "Delivered alongside industry ",
      description: "Real projects, live challenges, corporate mentors embedded in every program",
      color: "from-green-400 to-green-600",
      underline: "bg-green-400",
      icon: <ShieldCheckIcon weight='bold' className='w-8 h-8 text-white' />,
    },
    {
      id: 3,
      title: "Deployed to industry ",
      description: "Graduates are immediately productive in enterprise environments",
      color: "from-violet-400 to-violet-600",
      underline: "bg-violet-400",
      icon: <UsersIcon weight='bold' className='w-8 h-8 text-white' />,
    },
  ];

  return (
    <section className='py-16 md:py-24 bg-white'>
      <div className='container mx-auto px-6'>
        {/* Heading */}
        <div className='max-w-3xl mx-auto text-center mb-10'>
          <div className='w-20 h-[2px] bg-[#002D72] mx-auto mb-4 rounded-sm' />
          <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900'>
            Our <span className='text-yellow-500'>Core Philosophy</span>
          </h2>
          <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
            By the Industry, For the Industry, To the Industry. All SCALE verticals operate on a principle of industry
            co-creation. Rather than theoretical learning disconnected from real business needs, SCALE programs are:
          </p>
        </div>

        {/* Cards row */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 items-stretch'>
          {values.map((v) => (
            <div
              key={v.id}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center p-6 pt-10 relative overflow-hidden'
            >
              {/* icon badge */}
              <div
                className={`relative -top-6 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${v.color} shadow-[0_10px_30px_rgba(0,0,0,0.08)]`}
              >
                {v.icon}
              </div>

              {/* content */}
              <div className='mt-1'>
                <h4 className='text-base md:text-lg font-semibold text-gray-900'>{v.title}</h4>
                <p className='mt-3 text-sm text-gray-600 leading-relaxed max-w-[12rem] md:max-w-[14rem] mx-auto'>
                  {v.description}
                </p>
              </div>

              {/* colored underline at bottom */}
              <div className='mt-auto w-full pt-6'>
                <div className={`h-1 w-10 mx-auto rounded-full ${v.underline} mb-1`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
