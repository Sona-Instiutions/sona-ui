"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function LatestBlogsSection() {
  const blogs = [
    {
      id: 1,
      title: "Building a Sustainable Future Through Green Technology",
      category: "Sustainability",
      date: "March 3, 2025",
      description:
        "SCALE’s environmental engineering program leads groundbreaking research in renewable energy solutions...",
      image: "/images/blog-1.webp",
      color: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      title: "Virtual Reality Transforms Medical Education at SCALE",
      category: "EdTech",
      date: "March 1, 2025",
      description:
        "Immersive VR simulations provide students with hands-on surgical training without risk...",
      image: "/images/blog-2.webp",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 3,
      title: "SCALE Students Embark on Global Exchange Programs",
      category: "Global",
      date: "February 28, 2025",
      description:
        "Cultural immersion and academic excellence combine in our expanded international partnerships...",
      image: "/images/blog-3.webp",
      color: "bg-blue-100 text-blue-700",
    },
  ];

  return (
    <section className="py-7 md:py-20 bg-white text-center">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Latest <span className="text-yellow-500">Blogs</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          Stay updated with the latest developments in education, technology, and innovation
          from SCALE’s thought leaders and industry experts.
        </p>

        {/* MOBILE CAROUSEL */}
        <div className="md:hidden">
          <Carousel>
            <CarouselContent>
              {blogs.map((blog) => (
                <CarouselItem key={blog.id} >
                  <div className="basis-full sm:basis-1/2 px-2 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 text-left mb-10">
                    {/* Image */}
                    <div className="relative w-full h-56">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${blog.color}`}>
                          {blog.category}
                        </span>
                        <span className="text-gray-500 text-xs">{blog.date}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-yellow-500 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600">{blog.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrow Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <CarouselPrevious className="bg-black/50 text-white left-0" />
              <CarouselNext className="bg-black/50 text-white right-0" />
            </div>
          </Carousel>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 text-left"
            >
              {/* Image */}
              <div className="relative w-full h-56">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${blog.color}`}>
                    {blog.category}
                  </span>
                  <span className="text-gray-500 text-xs">{blog.date}</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-yellow-500 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-md transition">
          View All Articles
        </button>

      </div>
    </section>
  );
}
