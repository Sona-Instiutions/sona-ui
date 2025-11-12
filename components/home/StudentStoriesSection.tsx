import Image from "next/image";

export default function StudentStoriesSection() {
  const stories = [
    {
      id: 1,
      name: "Ananya Krishnan",
      role: "Software Engineer, Microsoft",
      batch: "CSE ’22",
      text: `"The psychometric mapping helped me discover my passion for AI. SCALE's industry connections and practical curriculum prepared me perfectly for my dream job at Microsoft."`,
      image: "/images/user-1.webp",
    },
    {
      id: 2,
      name: "Dr. Arjun Menon",
      role: "Cardiac Surgeon, Apollo Hospitals",
      batch: "MBBS ’20",
      text: `"The research opportunities and mentorship at SCALE Medical College shaped my career. The practical exposure prepared me for complex surgical procedures."`,
      image: "/images/user-2.webp",
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Founder, GreenTech Solutions",
      batch: "MBA ’21",
      text: `"SCALE's entrepreneurship program and incubation center helped me turn my sustainable technology idea into a successful startup with global impact."`,
      image: "/images/user-3.webp",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
          Student <span className="text-yellow-500">Stories</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          Hear from our students and alumni about their transformative journey
          at SCALE
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl p-8 text-left border-l-4 border-blue-900 shadow-md hover:-translate-y-1 transition-all duration-300"
            >
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
                  <h3 className="font-semibold text-gray-900">
                    {story.name}
                  </h3>
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
          ))}
        </div>
      </div>
    </section>
  );
}
