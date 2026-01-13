import Image from "next/image";

export default function LeadershipSection() {
  const leaders = [
    {
      id: 1,
      image: "/images/leader-valliappa.webp",
      name: "C. Valliappa",
      highlight: "Valliappa",
      designation: "Chairman",
      description: [
        "Founder of The Sona Group, is a prominent industrialist in South India with diverse interests spanning textiles, construction, and information technology. He has served as President of both the Industrial and Trade Chambers, including the Greater Mysore Chamber of Commerce and Industry and the Federation of Karnataka Chambers of Commerce & Industry.",
        "A pivotal figure in placing India on the global IT map, he facilitated the partnership between Texas Instruments and the Sona Valliappa Group. In recognition of his contributions, he was invited by the White House to explore U.S.-India business opportunities—a rare distinction awarded to only one Indian businessman annually.",
      ],
      boldText: "",
    },
    {
      id: 2,
      image: "/images/leader-thyagu.webp",
      name: "Thyagu Valliappa",
      highlight: "Valliappa",
      designation: "Founder & Chief Mentor",
      description: [
        "Thyagu Valliappa is a fourth-generation entrepreneur and a transformative leader known for driving innovation across diverse sectors including technology, real estate, textiles, healthcare, logistics, and education. With over four decades of entrepreneurial experience, he has mentored more than 50 startups and played a pivotal role in shaping India’s startup and industry ecosystem.",
        "As Founder & Chief Mentor of SCALE, he brings unmatched industry insight, a global mindset, and a passion for developing future-ready leaders. His work spans building world-class infrastructure, pioneering sportainment, advancing heritage healthcare, and strengthening industry–academia partnerships.",
        "A visionary strategist and thought leader, he continues to inspire change through innovation, sustainability, and purposeful leadership.",
      ],
      boldText:
        "",
    },
  ];

  return (
    <section className="bg-white">
      {/* Leader Profiles */}
      {leaders.map((leader, index) => (
        <div
          id={leader.id === 1 ? "chairman-message" : "vice-chairman-message"}
          key={leader.id}
          className={`flex flex-col ${index % 2 === 0 ? "md:flex-row bg-gray-50" : "md:flex-row-reverse bg-white"
            } items-center justify-center p-10 py-20`}
        >
          {/* Image Card */}
          <div className="relative">

            <div className="relative w-[280px] h-[320px] md:w-[320px] md:h-[360px] rounded-xl overflow-hidden">
              <Image
                src={leader.image}
                alt={leader.name}
                fill
                className="object-cover object-top rounded-xl"
                priority
              />
            </div>

            {/* Decorative Dots */}
            <div
              className={`absolute ${index % 2 === 0
                  ? "bottom-6 left-6 flex flex-col gap-2"
                  : "bottom-6 right-6 flex flex-col gap-2 items-end"
                }`}
            >
              <div className="w-5 h-5 bg-[#002D72] rounded-md"></div>
              <div className="w-4 h-4 bg-[#002D72] rounded-full"></div>
            </div>

            <div
              className={`absolute ${index % 2 === 0 ? "top-6 right-6" : "top-6 left-6"
                } w-6 h-6 bg-[#002D72] rounded-md`}
            ></div>
          </div>

          {/* Text Section */}
          <div
            className={`md:w-2/3 text-left ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"
              }`}
          >
            <h2
              className={`text-3xl md:text-4xl font-extrabold mb-2 ${index % 2 === 0 ? "text-gray-900" : "text-[#002D72]"
                }`}
            >
              {leader.name.split(" ")[0]}{" "}
              <span className="text-yellow-500">
                {leader.highlight || leader.name.split(" ")[1]}
              </span>
            </h2>

            {/* Decorative underline for 2nd leader */}
            {index === 1 && (
              <div className="w-20 h-[2px] bg-yellow-500 mb-3"></div>
            )}

            <h4 className="text-lg font-semibold text-gray-700 mb-6">
              {leader.designation}
            </h4>

            <div className="text-gray-600 space-y-4 leading-relaxed">
              {leader.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              {leader.boldText && (
                <p className="font-semibold text-gray-900">
                  {leader.boldText}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
