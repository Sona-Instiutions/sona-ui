"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function StudentActivitiesSection() {
  const activities = [
    {
      id: 1,
      title: "Robotics & AI Club",
      description:
        "Build autonomous robots, develop AI algorithms, and compete in national robotics competitions.",
      image: "/images/activity-robotics.jpg",
      meta: "150+ Active Members",
    },
    {
      id: 2,
      title: "Cultural Society",
      description:
        "Express creativity through music, dance, drama, and art while celebrating diverse cultures.",
      image: "/images/activity-cultural.jpg",
      meta: "200+ Artists",
    },
    {
      id: 3,
      title: "Tech Hackathons",
      description:
        "48-hour coding marathons solving real-world problems with cutting-edge technology.",
      image: "/images/activity-hackathon.jpg",
      meta: "Monthly Events",
    },
    {
      id: 4,
      title: "Sports & Fitness",
      description:
        "Encouraging teamwork, discipline, and physical excellence through diverse sports activities.",
      image: "/images/activity-sports.jpg",
      meta: "Year-round Activities",
    },
  ];

  const GAP = 24;

  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [visibleCards, setVisibleCards] = useState(3);
  const [cardWidth, setCardWidth] = useState(360);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* ---------------- RESPONSIVE LOGIC ---------------- */
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      const viewportEl = viewportRef.current;
      const viewportWidth = viewportEl?.offsetWidth || 0;

      if (width < 640) {
        setIsMobile(true);
        setVisibleCards(1);
        setCardWidth(viewportWidth);
        setCurrentIndex(0);
      } else if (width < 1024) {
        setIsMobile(false);
        setVisibleCards(2);
        setCardWidth(360);
        setCurrentIndex(0);
      } else {
        setIsMobile(false);
        setVisibleCards(3);
        setCardWidth(360);
        setCurrentIndex(0);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);


  const maxIndex = activities.length - visibleCards;

  const next = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const viewportWidth = cardWidth * visibleCards + GAP * (visibleCards - 1);

  return (
    <section className="py-16 md:py-24 bg-white overflow-x-hidden">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="w-20 h-[2px] bg-[#002D72] mx-auto mb-4 rounded-sm" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Student <span className="text-yellow-500">Activities</span> & Clubs
          </h2>
          <p className="mt-4 text-gray-600">
            Discover endless opportunities to explore your passions, develop new
            skills, and create lasting memories through our diverse range of
            student organizations.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative bg-gray-50 rounded-3xl p-8">
          {/* VIEWPORT */}
          <div
            ref={viewportRef}
            className="overflow-hidden mx-auto w-full sm:w-auto"
            style={{
              width: isMobile ? "100%" : viewportWidth,
            }}
          >
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (cardWidth + GAP)}px)`,
              }}
            >
              {activities.map((item) => (
                <div
                  key={item.id}
                  style={{ width: cardWidth }}
                  className="shrink-0"
                >
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    {/* Image */}
                    <div className="relative h-48 w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-4 text-sm font-semibold text-yellow-500 flex items-center gap-1">
                        {item.meta}
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="px-6 py-2 rounded-lg bg-[#002D72] text-white text-sm font-semibold disabled:opacity-40"
            >
              ← Previous
            </button>

            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="px-6 py-2 rounded-lg bg-[#002D72] text-white text-sm font-semibold disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
