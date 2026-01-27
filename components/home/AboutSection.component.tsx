"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "@phosphor-icons/react"; // optional icons

export default function AboutSection() {
  return (
    <section className='relative py-4 md:py-10 bg-white'>
      <div className='container mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-12'>
        {/* LEFT SIDE — TEXT CONTENT */}
        <div className='flex-1'>
          <h2 className='text-4xl font-extrabold text-gray-900 leading-tight mb-6'>
            About <span className='text-yellow-500'>SCALE</span>
          </h2>

          <p className='text-gray-600 mb-8 leading-relaxed'>
            Sona Centre of Advanced Learning & Entrepreneurship (SCALE) is a next-generation ecosystem built to bridge
            the world of industry, talent, technology, and entrepreneurship. Backed by the 100+ year legacy of the Sona
            Group, SCALE unites global capability development, emerging-tech education, corporate innovation, startup
            incubation, and workforce solutions into one integrated platform. Designed by the industry, for the
            industry, and to the industry, SCALE accelerates talent readiness, enterprise capability, and
            innovation-driven growth for organizations across the world.
          </p>
          {/* Bullet points */}
          <ul className='space-y-5 mb-10'>
            <li className='flex items-start gap-3'>
              <div className='bg-yellow-400 rounded-full w-[26px] h-[26px] flex items-center justify-center text-white flex-shrink-0'>
                <CheckIcon weight='bold' className='w-3.5 h-3.5' />
              </div>
              <div>
                <h4 className='font-semibold text-gray-800'>Industry-Built Learning</h4>
                <p className='text-sm text-gray-600'>
                  Learning frameworks co-created with CXOs, innovators, and enterprise leaders.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <div className='bg-yellow-400 rounded-full w-[26px] h-[26px] flex items-center justify-center text-white flex-shrink-0'>
                <CheckIcon weight='bold' className='w-3.5 h-3.5' />
              </div>
              <div>
                <h4 className='font-semibold text-gray-800'>Future-Ready Talent</h4>
                <p className='text-sm text-gray-600'>
                  Programs aligned with emerging technologies and global capability needs.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <div className='bg-yellow-400 rounded-full w-[26px] h-[26px] flex items-center justify-center text-white flex-shrink-0'>
                <CheckIcon className='w-3.5 h-3.5' />
              </div>
              <div>
                <h4 className='font-semibold text-gray-800'>Innovation & Enterprise Growth</h4>
                <p className='text-sm text-gray-600'>
                  A platform where ideas evolve into ventures and talent becomes industry-ready.
                </p>
              </div>
            </li>
          </ul>

          <Link href='/about'>
            <button className='cursor-pointer px-6 py-3 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-800 transition'>
              Discover more
            </button>
          </Link>
        </div>

        {/* RIGHT SIDE — 4 IMAGES */}
        <div className='flex-1 grid grid-cols-2 gap-4'>
          <div className='flex flex-col space-y-5'>
            <div className='rounded-[50%_0_0_0] overflow-hidden'>
              <Image
                src='/images/about-us-section-1.webp'
                alt='About Sona Image 1'
                width={400}
                height={300}
                className='w-72 h-72 object-cover object-top shadow-lg'
              />
            </div>
            <div className='rounded-[0_0_0_50%] overflow-hidden'>
              <Image
                src='/images/about-scale-3.webp'
                alt='About Sona Image 4'
                width={400}
                height={300}
                className='w-72 h-72 object-cover object-top shadow-lg'
              />
            </div>
          </div>
          <div className='flex flex-col space-y-5 mt-6'>
            <div className='rounded-[0_50%_0_0] overflow-hidden'>
              <Image
                src='/images/about-us-section-3.webp'
                alt='About Sona Image 2'
                width={400}
                height={300}
                className='w-72 h-72 object-cover object-top shadow-lg'
              />
            </div>
            <div className='rounded-[0_0_50%_0] overflow-hidden'>
              <Image
                src='/images/about-scale-4.webp'
                alt='About Sona Image 3'
                width={400}
                height={300}
                className='w-72 h-72 object-cover object-top shadow-lg'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
