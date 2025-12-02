import Image from "next/image";

export default function ExecutiveLeadershipSection() {
  const ececutiveLeaders = [
    {
      id: 1,
      image: "/images/male.webp",
      name: "Mr. Vijay Kumar Nair",
      designation: " Volvo India – VP",
      description:
        "Leads Volvo Group’s digital transformation, smart manufacturing, and enterprise technology  initiatives globally. ",
    },
    {
      id: 2,
      image: "/images/male.webp",
      name: "Mr. Aaloka Anant",
      designation: "Data Privacy Leader, Global Consultant",
      description:
        "Drives enterprise data privacy, digital transformation, and responsible AI innovation for global organizations.",
    },
    {
      id: 3,
      image: "/images/male.webp",
      name: "Pankaj Kumar Mishraa",
      designation: "TCS – GenAI Head ",
      description:
        "Leads TCS AI.Cloud’s GenAI strategy, cloud modernization, and high-impact transformation for global enterprises.",
    },
    {
      id: 4,
      image: "/images/male.webp",
      name: "Palash Gupta",
      designation: "DeepTech & GCC Leader ",
      description:
        "Drives deep-tech innovation, GCC scaling, and enterprise product engineering across global technology ecosystems.",
    },
    {
      id: 5,
      image: "/images/male.webp",
      name: "Saikat Das",
      designation: "Walmart – Program Leader ",
      description:
        "Leads Walmart Global Tech’s large-scale e-commerce, agile delivery, and digital modernization programs.",
    },
    {
      id: 6,
      image: "/images/male.webp",
      name: "Madhusudhan S J",
      designation: "Manufacturing Digital Expert, Digital Transformation Consulting",
      description:
        " Enables manufacturing modernization through IIoT, XR, Digital Twin, and strategic digital transformation roadmaps.",
    },
    {
      id: 7,
      image: "/images/male.webp",
      name: "Sai Krishnan Mohan",
      designation: "Data & AI Leader ",
      description:
        "Builds enterprise analytics functions, AI governance frameworks, and data-driven digital transformation strategies.",
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
            A dynamic team of industry experts, academic leaders, and innovators shaping programs, research, and institutional strategy.
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
