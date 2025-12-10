"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BlogListingPage() {
  // ------------------------------------
  // STATIC EVENTS JSON (matches your UI)
  // ------------------------------------
  const STATIC_EVENTS = [
    {
      id: 1,
      title: "Annual Robotics Championship 2025",
      slug: "annual-robotics-championship-2025",
      category: "Student Events",
      date: "March 15, 2025",
      excerpt:
        "Join us for the most anticipated robotics competition where engineering students showcase their innovative designs and compete for the championship title.",
      image: "/images/blog-1.webp",
    },
    {
      id: 2,
      title: "Industry Innovation Summit",
      slug: "industry-innovation-summit",
      category: "Industry Events",
      date: "March 22, 2025",
      excerpt:
        "Connect with industry leaders and explore cutting-edge technologies shaping the future of engineering and business innovation.",
      image: "/images/blog-1.webp",
    },
    {
      id: 3,
      title: "Spring Convocation 2025",
      slug: "spring-convocation-2025",
      category: "Student Events",
      date: "April 5, 2025",
      excerpt:
        "Celebrate the achievements of our graduating class as they embark on their professional journeys with SCALE’s world-class education.",
      image: "/images/blog-1.webp",
    },
    {
      id: 4,
      title: "Healthcare Innovation Conference",
      slug: "healthcare-innovation-conference",
      category: "Industry Events",
      date: "April 12, 2025",
      excerpt:
        "Discover breakthrough medical technologies and research findings that are revolutionizing healthcare delivery and patient outcomes.",
      image: "/images/blog-1.webp",
    },
    {
      id: 5,
      title: "Cultural Festival Spectrum",
      slug: "cultural-festival-spectrum",
      category: "Student Events",
      date: "April 18, 2025",
      excerpt:
        "Experience the vibrant cultural diversity of SCALE through music, dance, art, and performances celebrating our global student community.",
      image: "/images/blog-1.webp",
    },
    {
      id: 6,
      title: "ISRO Collaboration Symposium",
      slug: "isro-collaboration-symposium",
      category: "Industry Events",
      date: "May 8, 2025",
      excerpt:
        "Explore SCALE's partnership with ISRO in advancing space technology and satellite research for India's space exploration missions.",
      image: "/images/blog-1.webp",
    },
    {
      id: 7,
      title: "Student Research Showcase",
      slug: "student-sesearch-showcase",
      category: "Student Events",
      date: "May 15, 2025",
      excerpt:
        "Witness groundbreaking research projects by undergraduate and graduate students across engineering, medicine, and business disciplines.",
      image: "/images/blog-1.webp",
    },
    {
      id: 8,
      title: "Entrepreneurship Summit",
      slug: "entrepreneurship-summit",
      category: "Industry Events",
      date: "May 22, 2025",
      excerpt:
        "Connect with successful entrepreneurs, investors, and startup founders to explore opportunities in innovation and business development.",
      image: "/images/blog-1.webp",
    },
    {
      id: 9,
      title: "Inter–College Sports Championship",
      slug: "inter–College-sports-championship",
      category: "Student Events",
      date: "June 2, 2025",
      excerpt:
        "Cheer for SCALE athletes as they compete in various sports disciplines, showcasing excellence beyond academics.",
      image: "/images/blog-1.webp",
    },
  ];

  // ------------------------------------
  // STATE MANAGEMENT
  // ------------------------------------
  const TABS = ["All Events", "Student Events", "Industry Events"];

  const [activeTab, setActiveTab] = useState("All Events");
  const [allPosts, setAllPosts] = useState(STATIC_EVENTS);
  const [displayedPosts, setDisplayedPosts] = useState<typeof STATIC_EVENTS>(STATIC_EVENTS.slice(0, 6));
  const [visibleCount, setVisibleCount] = useState(6);

  // ------------------------------------
  // FILTER LOGIC
  // ------------------------------------
  useEffect(() => {
    let filtered = allPosts;

    if (activeTab !== "All Events") {
      filtered = allPosts.filter((post) => post.category === activeTab);
    }

    setDisplayedPosts(filtered.slice(0, visibleCount));
  }, [activeTab, visibleCount, allPosts]);


  // ------------------------------------
  // LOAD MORE FUNCTION
  // ------------------------------------
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // ------------------------------------
  // JSX OUTPUT
  // ------------------------------------
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">

        {/* ---------- TABS ---------- */}
        <div className="flex justify-center mb-10 gap-3">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setVisibleCount(6);
              }}
              className={`px-6 py-2 rounded-[10px] cursor-pointer font-semibold border transition ${activeTab === tab
                ? "bg-blue-900 text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ---------- GRID / LIST ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {displayedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-6">
                <div className="text-sm font-semibold text-blue-600 mb-2">
                  {post.category} • {post.date}
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} >
                  <button className="cursor-pointer bg-blue-900 text-white px-5 py-2 rounded-md hover:bg-blue-950 transition">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}

        </div>

        {/* ---------- LOAD MORE BUTTON ---------- */}
        {displayedPosts.length < allPosts.filter(post =>
          activeTab === "All Events" ? true : post.category === activeTab
        ).length && (
            <div className="text-center mt-10">
              <button
                onClick={handleLoadMore}
                className="cursor-pointer px-8 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Load More Events
              </button>
            </div>
          )}
      </div>
    </section>
  );
}
