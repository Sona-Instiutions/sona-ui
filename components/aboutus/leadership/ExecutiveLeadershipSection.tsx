import Image from "next/image";

export default function ExecutiveLeadershipSection() {
  const ececutiveLeaders = [
    {
      id: 1,
      image: "/images/leader-1.webp",
      name: "Dr. Sarah Mitchell",
      designation: "Chancellor & Chief Executive",
      description:
        "Leading SCALE with 25+ years in higher education administration and strategic development.",
    },
    {
      id: 2,
      image: "/images/leader-2.webp",
      name: "Prof. Michael Chen",
      designation: "Provost & Vice Chancellor",
      description:
        "Overseeing academic excellence and curriculum innovation across all departments and programs.",
    },
    {
      id: 3,
      image: "/images/leader-3.webp",
      name: "Dr. Priya Sharma",
      designation: "Dean of Research & Innovation",
      description:
        "Driving groundbreaking research initiatives and fostering innovation across all academic disciplines.",
    },
    {
      id: 4,
      image: "/images/leader-4.webp",
      name: "James Rodriguez",
      designation: "Registrar & Student Affairs",
      description:
        "Ensuring exceptional student experience and comprehensive support throughout their academic journey.",
    },
    {
      id: 5,
      image: "/images/leader-5.webp",
      name: "Dr. Lisa Thompson",
      designation: "Chief Financial Officer",
      description:
        "Managing institutional resources and strategic financial planning for sustainable growth.",
    },
    {
      id: 6,
      image: "/images/leader-6.webp",
      name: "David Kim",
      designation: "Chief Technology Officer",
      description:
        "Leading digital transformation and technology infrastructure for modern educational delivery.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            Executive <span className="text-yellow-500">Leadership Team</span>
          </h2>
          <div className="w-20 h-[2px] bg-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our distinguished leadership team combines academic excellence with
            industry expertise to drive institutional growth and student
            success.
          </p>
        </div>

        {/* Grid of Leaders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {ececutiveLeaders.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 p-8 flex flex-col items-center text-center"
            >
              <div className="relative w-28 h-28 mb-6 rounded-2xl overflow-hidden">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {leader.name}
              </h3>
              <p className="text-sm font-semibold text-[#002D72] mb-4">
                {leader.designation}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {leader.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
