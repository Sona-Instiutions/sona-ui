"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function StudentStoriesSection() {
  const stories = [
    {
      id: 1,
      name: "Aarav S. ",
      role: "AI Enthusiast ",
      batch: " ",
      text: `"I’m really looking forward to getting hands-on experience with advanced tools and labs. SCALE’s 24/7 HOT Labs will let me experiment freely and build practical skills, which I think is key to bridging the gap between what I learn in class and real-world industry demands."`,
      image: "/images/male.webp",
    },
    {
      id: 2,
      name: "Meera P. ",
      role: "Software Developer Aspirant ",
      batch: " ",
      text: `"Global certifications have always been a goal for me, and SCALE offers internationally recognized credentials that can really boost my career prospects. I’m excited to learn, prove my skills, and make myself more employable on a global scale."`,
      image: "/images/female.webp",
    },
    {
      id: 3,
      name: "Rohan K. ",
      role: "Data Science Student ",
      batch: " ",
      text: `"I’m eager to follow a curriculum that’s designed alongside top industry leaders. Knowing that the courses are co-created with tech companies gives me confidence that I’ll learn exactly what enterprises need, preparing me to be productive from day one."`,
      image: "/images/male.webp",
    },
    {
      id: 4,
      name: "Ananya T.",
      role: "Future Tech Leader",
      batch: "",
      text: `"Day-One readiness is what excites me the most. I want to join SCALE to not only gain knowledge but also to develop practical skills and confidence to immediately contribute in real enterprise projects right after graduation."`,
      image: "/images/female.webp",
    },
  ];

  return (
    <section className="py-4 md:py-10 bg-white">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
          Student <span className="text-yellow-500">Stories</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          Real experiences shared by learners who transformed through SCALE’s tech-driven education.
        </p>

        {/* Carousel for both mobile + desktop */}
        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {stories.map((story) => (
              <CarouselItem
                key={story.id}
                className="basis-full md:basis-1/2 px-2 py-2 pl-4"
              >
                <div className="bg-white rounded-2xl p-8 text-left border-l-4 border-blue-900 shadow-md hover:-translate-y-1 transition-all duration-300">
                  
                  {/* Profile */}
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={story.image}
                        alt={story.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.role}</p>
                      <p className="text-sm text-yellow-500 font-semibold">
                        {story.batch}
                      </p>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 italic leading-relaxed">
                    {story.text}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows */}
          <CarouselPrevious className="left-0 bg-black/50 text-white" />
          <CarouselNext className="right-0 bg-black/50 text-white" />
        </Carousel>
      </div>
    </section>
  );
}
