import Image from "next/image";

export default function LifeAtScaleSection() {
  const images = [
    { id: 1, src: "/images/life-1.webp", alt: "Campus Celebration", title: "Campus Celebration", subtitle: "Moments of joy and togetherness" },
    { id: 2, src: "/images/life-2.webp", alt: "Students Collaboration", title: "Student Collaboration", subtitle: "Teamwork and creativity at SCALE" },
    { id: 3, src: "/images/life-3.webp", alt: "Seminar and Workshop", title: "Workshops & Seminars", subtitle: "Learning beyond classrooms" },
    { id: 4, src: "/images/life-4.webp", alt: "Classroom Learning", title: "Classroom Learning", subtitle: "Interactive and engaging education" },
    { id: 5, src: "/images/life-5.webp", alt: "Graduation Ceremony", title: "Graduation Day", subtitle: "Celebrating student achievements" },
    { id: 6, src: "/images/life-6.webp", alt: "Sports Event", title: "Sports & Fitness", subtitle: "Building champions and teamwork" },
    { id: 7, src: "/images/life-7.webp", alt: "Student Discussion", title: "Student Interaction", subtitle: "Collaborative academic experiences" },
    { id: 8, src: "/images/life-8.webp", alt: "Cultural Dance", title: "Cultural Fest", subtitle: "Celebrating art, culture and unity" },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Life at <span className="text-yellow-500">SCALE</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-16">
          Experience vibrant campus life filled with cultural celebrations,
          academic achievements, and memorable moments that shape lifelong
          friendships.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative overflow-hidden rounded-2xl shadow-md group cursor-pointer"
            >
              {/* Image */}
              <Image
                src={img.src}
                alt={img.alt}
                width={300}
                height={200}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />

              {/* Text that slides up */}
              <div className="absolute bottom-0 left-0  p-5 text-white opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <h3 className="font-semibold text-lg">{img.title}</h3>
                <p className="text-sm text-gray-200">{img.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-md transition">
          Explore Campus Life
        </button>
      </div>
    </section>
  );
}
