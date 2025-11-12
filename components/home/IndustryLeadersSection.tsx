"use client"; // Needed for interactivity
import { useState } from "react";
import Image from "next/image";

export default function IndustryLeadersSection() {
  // Partner data with category tags
  const partners = [
    { id: 1, name: "MICROSOFT", tagline: "Cloud Solutions", icon: "/logos/microsoft.svg", categories: ["Internships", "Campus Recruitment"] },
    { id: 2, name: "GOOGLE", tagline: "AI & Analytics", icon: "/logos/google.svg", categories: ["Research Collaboration", "Internships"] },
    { id: 3, name: "AMAZON", tagline: "Web Services", icon: "/logos/amazon.svg", categories: ["Guest Lectures", "Campus Recruitment"] },
    { id: 4, name: "APPLE", tagline: "Innovation", icon: "/logos/apple.svg", categories: ["Internships", "Research Collaboration"] },
    { id: 5, name: "META", tagline: "Virtual Reality", icon: "/logos/meta.svg", categories: ["Research Collaboration"] },
    { id: 6, name: "NETFLIX", tagline: "Streaming Tech", icon: "/logos/netflix.svg", categories: ["Guest Lectures"] },
    { id: 7, name: "TESLA", tagline: "Electric Vehicles", icon: "/logos/tesla.svg", categories: ["Internships"] },
    { id: 8, name: "PAYPAL", tagline: "Fintech", icon: "/logos/paypal.svg", categories: ["Campus Recruitment"] },
    { id: 9, name: "SPOTIFY", tagline: "Audio Tech", icon: "/logos/spotify.svg", categories: ["Guest Lectures", "Internships"] },
    { id: 10, name: "UBER", tagline: "Mobility", icon: "/logos/uber.svg", categories: ["Campus Recruitment"] },
    { id: 11, name: "AIRBNB", tagline: "Hospitality", icon: "/logos/airbnb.svg", categories: ["Research Collaboration", "Guest Lectures"] },
      { id: 12, name: "SLACK", tagline: "Collaboration", icon: "/logos/slack.svg", categories: ["Internships", "Guest Lectures"] },
    { id: 13, name: "MICROSOFT", tagline: "Cloud Solutions", icon: "/logos/microsoft.svg", categories: ["Internships", "Campus Recruitment"] },
    { id: 14, name: "GOOGLE", tagline: "AI & Analytics", icon: "/logos/google.svg", categories: ["Research Collaboration", "Internships"] },
    { id: 15, name: "AMAZON", tagline: "Web Services", icon: "/logos/amazon.svg", categories: ["Guest Lectures", "Campus Recruitment"] },
    { id: 16, name: "APPLE", tagline: "Innovation", icon: "/logos/apple.svg", categories: ["Internships", "Research Collaboration"] },
    { id: 17, name: "META", tagline: "Virtual Reality", icon: "/logos/meta.svg", categories: ["Research Collaboration"] },
    { id: 18, name: "NETFLIX", tagline: "Streaming Tech", icon: "/logos/netflix.svg", categories: ["Guest Lectures"] },
    { id: 19, name: "TESLA", tagline: "Electric Vehicles", icon: "/logos/tesla.svg", categories: ["Internships"] },
    { id: 20, name: "PAYPAL", tagline: "Fintech", icon: "/logos/paypal.svg", categories: ["Campus Recruitment"] },
    { id: 21, name: "SPOTIFY", tagline: "Audio Tech", icon: "/logos/spotify.svg", categories: ["Guest Lectures", "Internships"] },
    { id: 22, name: "UBER", tagline: "Mobility", icon: "/logos/uber.svg", categories: ["Campus Recruitment"] },
    { id: 23, name: "AIRBNB", tagline: "Hospitality", icon: "/logos/airbnb.svg", categories: ["Research Collaboration", "Guest Lectures"] },
    { id: 24, name: "SLACK", tagline: "Collaboration", icon: "/logos/slack.svg", categories: ["Internships", "Guest Lectures"] },
  ];

  const tags = [
    { id: 1, text: "Internships", color: "bg-yellow-400 text-black cursor-pointer" },
    { id: 2, text: "Research Collaboration", color: "bg-yellow-400 text-black cursor-pointer" },
    { id: 3, text: "Campus Recruitment", color: "bg-yellow-400 text-black cursor-pointer" },
    { id: 4, text: "Guest Lectures", color: "bg-yellow-400 text-black cursor-pointer" },
  ];

  // State for active tab
  const [activeTab, setActiveTab] = useState("Internships");

  // Filter partners based on tab
  const filteredPartners = partners.filter((partner) =>
    partner.categories.includes(activeTab)
  );

  return (
    <section className="py-20 bg-gray-50 text-center">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Trusted by <span className="text-yellow-500">Industry Leaders</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          SCALE partners with global technology leaders and innovative companies to provide
          students with real-world experience and career opportunities
        </p>

        {/* Logos Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16 transition-all duration-700"
          key={activeTab} // re-render animation on change
        >
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 relative mb-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={partner.icon}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-800">{partner.name}</h3>
              <p className="text-xs text-gray-500">{partner.tagline}</p>
            </div>
          ))}
        </div>

        {/* Partnership Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-white px-6 py-4 rounded-full shadow-sm w-fit mx-auto">
          <span className="text-gray-700 font-medium">
            Partnership Opportunities:
          </span>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setActiveTab(tag.text)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                activeTab === tag.text
                  ? `${tag.color} ring-2 ring-yellow-400`
                  : "bg-gray-100 text-gray-700 hover:bg-yellow-100"
              }`}
            >
              {tag.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
