import Image from "next/image";

export default function ExecutiveLeadershipSection() {
  const ececutiveLeaders = [
    {
      id: 1,
      image: "/images/dr_venu_mittapally_gopal.webp",
      name: "Dr. M Venugopal",
      designation: "Vice President",
      description:
        "",
    },
    {
      id: 2,
      image: "/images/dr_sheelan_misra.webp",
      name: "Dr. Sheelan Misra",
      designation: "Dean (Marketing Strategy, IR & Industry Collaboration)",
      description:
        "",
    },
    {
      id: 3,
      image: "/images/nt_srinivasalu.webp",
      name: "N. T. Srinivasulu",
      designation: "Dean – MBA Admissions ",
      description:
        "",
    },
    {
      id: 4,
      image: "/images/akhil.webp",
      name: "Akhil Narayan",
      designation: "Learning and Development Manager",
      description:
        "",
    },
    {
      id: 5,
      image: "/images/mm.webp",
      name: "G Madan",
      designation: "HR Manager",
      description:
        "",
    },
    
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
             SCALE <span className="text-yellow-500">Leadership Team</span>
          </h2>
          <div className="w-20 h-[2px] bg-yellow-500 mx-auto mb-4"></div>
          {/* <p className="text-gray-600 max-w-3xl mx-auto">
            A dynamic team of industry experts, academic leaders, and innovators shaping programs, research, and institutional strategy.
          </p> */}
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
