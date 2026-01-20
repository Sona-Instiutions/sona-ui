"use client";
import Image from "next/image";
import {
  UserPlusIcon,
  FlaskIcon,
  CurrencyDollarIcon,
  GlobeIcon,
  GraduationCapIcon,
  MedalIcon,
} from "@phosphor-icons/react";

export default function WhyCollaborate() {
  const cards = [
    {
      title: "Access to Top-Tier talent",
      desc: "Connect with pre-screened, industry-ready graduates who possess cutting-edge technical skills.",
      img: "/images/access_top_talent.webp",
      icon: <UserPlusIcon size={24} weight='duotone' className='text-white' />,
    },
    {
      title: "100% Tech-Integrated Talent Pipeline",
      desc: "Graduates are trained in a curriculum where AI, Data Science, and Cloud are embedded into every business discipline, ensuring they are tech-enabled business leaders.",
      img: "/images/research_&_innovation.webp",
      icon: <FlaskIcon size={24} weight='duotone' className='text-white' />,
    },
    {
      title: "Day-One Productivity",
      desc: "Through the Sona Finishing School’s 12-week bootcamp, candidates are certified and 'Day-One Productive,' eliminating the need for long internal training cycles.",
      img: "/images/customized_training.webp",
      icon: <MedalIcon size={24} weight='duotone' className='text-white' />,
    },
    {
      title: "Direct Curriculum Influence",
      desc: "Industry leaders can join the Academic Council to co-design programs, ensuring the talent produced meets specific corporate requirements.",
      img: "/images/global_network_access.webp",
      icon: <CurrencyDollarIcon size={24} weight='duotone' className='text-white' />,
    },
    {
      title: "Brand Enhancement",
      desc: "Strengthen your corporate reputation through a strategic association with a center of educational and technological excellence.",
      img: "/images/brand_enhancement.webp",
      icon: <GlobeIcon size={24} weight='duotone' className='text-white' />,
    },
    {
      title: "Cost-Effective R&D",
      desc: "Reduce internal innovation costs by leveraging SCALE's state-of-the-art facilities and expert faculty for breakthrough research.",
      img: "/images/cost-effective_solutions.webp",
      icon: <GraduationCapIcon size={24} weight='duotone' className='text-white' />,
    },
  ];

  return (
    <section className='py-16 bg-white'>
      {/* Heading */}
      <div className='text-center max-w-2xl mx-auto mb-14'>
        <h2 className='text-4xl font-extrabold'>
          Why <span className='text-yellow-400'>Collaborate</span> With SCALE
        </h2>
        <p className='text-gray-600 mt-4'>
        Unlock the power of academic excellence and industry innovation through strategic partnerships that benefit both your organization and our students
        </p>
      </div>

      {/* Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6'>
        {cards.map((item, index) => (
          <div
            key={index}
            className='relative rounded-2xl overflow-hidden shadow-md group cursor-pointer transition-all'
          >
            {/* Background Image */}
            <Image
              src={item.img}
              alt={item.title}
              className='w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500'
              priority
              width={500}
              height={300}
            />

            {/* Dark overlay */}
            <div className='absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all'></div>

            {/* Content */}
            <div className='absolute bottom-5 left-5 right-5 text-white space-y-2'>
              <div className='bg-yellow-400 text-black rounded-full flex items-center justify-center w-10 h-10'>
                {item.icon}
              </div>

              <h3 className='text-xl font-semibold'>{item.title}</h3>
              <p className='text-sm opacity-90'>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
