"use client";

import Image from "next/image";
import { useState } from "react";

/* ✅ Define tab type */
type GalleryTab = "Infrastructure" | "Class Room" ;

export default function CampusGallerySection() {
  /* ✅ Tabs typed */
  const tabs: GalleryTab[] = ["Infrastructure", "Class Room"];

  /* ✅ Gallery data typed */
  const galleryData: Record<GalleryTab, string[]> = {
    Infrastructure: [
      "/images/life-at-scale/gallery/infrastucture_1.webp",
      "/images/life-at-scale/gallery/infrastucture_2.webp",
      "/images/life-at-scale/gallery/infrastucture_3.webp",
      "/images/life-at-scale/gallery/infrastucture_4.webp",
      "/images/life-at-scale/gallery/infrastucture_5.webp",
      "/images/life-at-scale/gallery/infrastucture_6.webp",
    ],
    "Class Room": [
      "/images/life-at-scale/gallery/class_room_1.webp",
      "/images/life-at-scale/gallery/class_room_2.webp",
      "/images/life-at-scale/gallery/class_room_3.webp",
      "/images/life-at-scale/gallery/class_room_4.webp",
      "/images/life-at-scale/gallery/class_room_5.webp",
      "/images/life-at-scale/gallery/class_room_6.webp",
    ],
    // "Interactive Lab": [
    //   "/images/gallery/lab-1.jpg",
    //   "/images/gallery/lab-2.jpg",
    //   "/images/gallery/lab-3.jpg",
    //   "/images/gallery/lab-4.jpg",
    //   "/images/gallery/lab-5.jpg",
    //   "/images/gallery/lab-6.jpg",
    // ],
  };

  /* ✅ activeTab correctly typed */
  const [activeTab, setActiveTab] = useState<GalleryTab>("Infrastructure");

  return (
    <section className="py-16 md:py-24 bg-[#f9fafb]">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="w-20 h-[2px] bg-[#002D72] mx-auto mb-4 rounded-sm" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Campus <span className="text-yellow-500">Gallery</span>
          </h2>
          <p className="mt-4 text-gray-600">
          Explore our vibrant campus life through different perspectives and discover the spaces where memories are made.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all
                ${
                  activeTab === tab
                    ? "bg-[#002D72] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData[activeTab].map((img, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={img}
                  alt={`${activeTab} ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
