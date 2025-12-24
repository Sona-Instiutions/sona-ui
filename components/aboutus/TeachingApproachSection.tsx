"use client";
import { BookOpenIcon, WrenchIcon, UsersIcon, LightbulbIcon } from "@phosphor-icons/react";

export default function TeachingApproachSection() {
  const approaches = [
    {
      id: 1,
      icon: <BookOpenIcon weight='bold' className='w-7 h-7 text-red-500' />,
      iconColor: "bg-red-100",
      title: "Industry-co-created curriculum",
      description:
        "Courses are shaped with GCCs and tech enterprises to ensure immediate workplace relevance and global competitiveness.",
      color: "bg-red-500",
    },
    {
      id: 2,
      icon: <WrenchIcon weight='bold' className='w-7 h-7 text-yellow-500' />,
      iconColor: "bg-yellow-100",
      title: "Project-based learning",
      description:
        "Students work on industry challenges, simulations, and functional prototypes that build practical confidence and skill.",
      color: "bg-yellow-500",
    },
    {
      id: 3,
      icon: <UsersIcon weight='bold' className='w-7 h-7 text-green-500' />,
      iconColor: "bg-green-100",
      title: "Global Mentorship",
      description:
        "Learners receive guidance from industry experts who bring global experience and real-world insights.",
      color: "bg-green-500",
    },
    {
      id: 4,
      icon: <LightbulbIcon weight='bold' className='w-7 h-7 text-blue-500' />,
      iconColor: "bg-blue-100",
      title: "Continuous learning",
      description:
        "24×7 hands-on access to labs that support experimentation, advanced practice, and deployment-ready skill-building.",
      color: "bg-blue-500",
    },
  ];

  // const outcomes = [
  //     { id: 1, percentage: "95%", label: "Aligned with GCC talent needs" },
  //     { id: 2, percentage: "87%", label: "Global certifications" },
  //     { id: 3, percentage: "92%", label: "24×7 HOT Labs" },
  // ];

  return (
    <section className='bg-white py-7 md:py-20'>
      <div className='container mx-auto px-6 text-center'>
        {/* Heading */}
        <h2 className='text-4xl font-extrabold text-gray-900 mb-4'>
          Our <span className='text-yellow-500'>Approach</span>
        </h2>
        <p className='text-gray-600 max-w-3xl mx-auto mb-16'>
          A structured, industry-integrated model focused on creating day-one-ready technology professionals.
        </p>

        {/* Teaching Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
          {approaches.map((item) => (
            <div
              key={item.id}
              className='relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300'
            >
              {/* Colored Dot */}
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 ${item.color} rounded-full`}></div>

              {/* Icon */}
              <div className={`w-16 h-16 flex items-center justify-center rounded-lg mx-auto ${item.iconColor} mb-6`}>
                {item.icon}
              </div>

              {/* Title */}
              <h3 className='font-bold text-gray-900 mb-2'>{item.title}</h3>

              {/* Description */}
              <p className='text-gray-600 text-sm leading-relaxed'>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Learning Outcomes */}
        {/* <div className="bg-[#002D72] text-white rounded-3xl py-10 px-6">
                    <h3 className="text-2xl font-bold mb-8">Unique Strengths of Sona Tech School </h3>

                    <div className="flex flex-col sm:flex-row items-center justify-around gap-10">
                        {outcomes.map((outcome) => (
                            <div key={outcome.id}>
                                <p className="text-4xl font-extrabold mb-1">
                                    {outcome.percentage}
                                </p>
                                <p className="text-sm opacity-90">{outcome.label}</p>
                            </div>
                        ))}
                    </div>
                </div> */}
      </div>
    </section>
  );
}
