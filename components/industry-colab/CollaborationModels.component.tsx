"use client";

import { BookOpenIcon, BriefcaseMetalIcon, UsersThreeIcon, LightbulbIcon } from "@phosphor-icons/react";

export default function CollaborationModels() {
  const models = [
    {
      icon: <BookOpenIcon size={32} weight='duotone' className='text-blue-600' />,
      iconBg: "bg-blue-100",
      title: "Curriculum Design",
      desc: "Collaborate with our faculty to design industry-relevant curricula that address your specific skill requirements and emerging technology needs.",
      points: ["Industry-specific course modules", "Real-world project integration", "Technology trend alignment"],
      image: "/images/curriculum.jpg",
    },
    {
      icon: <BriefcaseMetalIcon size={32} weight='duotone' className='text-green-600' />,
      iconBg: "bg-green-100",
      title: "Internship Programs",
      desc: "Access our top-performing students through structured internship programs that provide real work experience and talent pipeline development.",
      points: ["Pre-screened candidates", "Flexible duration options", "Mentorship support"],
      image: "/images/internship.jpg",
    },
    {
      icon: <UsersThreeIcon size={32} weight='duotone' className='text-purple-600' />,
      iconBg: "bg-purple-100",
      title: "Contract-to-Hire",
      desc: "Evaluate talent through contract positions with the option to hire permanently, reducing recruitment risks and ensuring perfect fit.",
      points: ["Risk-free evaluation period", "Immediate project contribution", "Seamless conversion process"],
      image: "/images/contract.jpg",
    },
    {
      icon: <LightbulbIcon size={32} weight='duotone' className='text-orange-600' />,
      iconBg: "bg-orange-100",
      title: "Joint R&D Projects",
      desc: "Partner with our research centers for collaborative innovation projects that drive breakthrough solutions and competitive advantages.",
      points: ["Cutting-edge research facilities", "Expert faculty collaboration", "IP sharing agreements"],
      image: "/images/rd.jpg",
    },
  ];

  return (
    <section className='py-16 bg-gray-50'>
      {/* Heading */}
      <div className='text-center max-w-2xl mx-auto mb-14 px-4'>
        <h2 className='text-4xl font-extrabold'>
          Collaboration <span className='text-yellow-400'>Models</span>
        </h2>
        <p className='text-gray-600 mt-4'>
          Choose from our flexible partnership models designed to meet your specific business objectives and talent
          requirements
        </p>
      </div>

      {/* GRID */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6'>
        {models.map((item, i) => (
          <div key={i} className='bg-white rounded-3xl shadow-md hover:shadow-xl transition-all p-8 flex flex-col'>
            {/* Icon */}
            <div className={`w-14 h-14 ${item.iconBg} rounded-xl flex items-center justify-center mb-5`}>
              {item.icon}
            </div>

            {/* Title */}
            <h3 className='text-xl font-semibold mb-3'>{item.title}</h3>

            {/* Description */}
            <p className='text-gray-600 text-sm leading-relaxed mb-5'>{item.desc}</p>

            {/* Bullet Points */}
            <ul className='space-y-2 mb-6'>
              {item.points.map((p, idx) => (
                <li key={idx} className='flex items-start gap-2 text-gray-700'>
                  <span className='text-yellow-400 font-bold text-lg'>✓</span>
                  <span className='text-sm'>{p}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            {/* <button className='mt-auto w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl transition'>
              Learn More
            </button> */}
          </div>
        ))}
      </div>
    </section>
  );
}
