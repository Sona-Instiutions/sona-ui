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
        "Mr. Valliappa is a Chairman par excellence having been given the Herculean task of maintaining the world-class organizations and institutions.",
        "He is a wizard when it comes to management and improvisation, and the astronomical growth of the Sona Group is a witness to it. Under his able guidance and erudition, The Sona Group has seen a business school, an arts and science college, a public school of international standard, and a medical college of naturopathy and yoga added to its name.",
        "He is a visionary by all means and is fitting to be called the Father of IT in India. He was the first to house an IT firm, the Texas Instrument, at the Sona Tower. He is a multi-faceted personality bringing his magical touch to areas such as textile, education, and construction. He has held prestigious positions in Chamber of Commerce, FKCCI, BCIC, and KTMA, to mention a few.",
      ],
      boldText: "",
    },
    {
      id: 2,
      image: "/images/leader-thyagu.webp",
      name: "Thyagu Valliappa",
      highlight: "Valliappa",
      designation: "Vice Chairman",
      description: [
        "At SCALE, we believe in nurturing not just academic brilliance, but holistic development that prepares our students for global leadership. Our commitment extends beyond traditional classroom learning to create transformative educational experiences.",
        "Through innovative research partnerships, industry collaborations, and cutting-edge technology integration, we ensure our graduates are equipped with both theoretical knowledge and practical skills essential for tomorrow's challenges.",
        "Our faculty comprises renowned experts who bring real-world experience into the classroom, fostering an environment where curiosity thrives and innovation flourishes. We are committed to maintaining the highest standards of academic integrity and excellence.",
      ],
      boldText:
        "Together, we are building a legacy of educational excellence that will continue to inspire generations of learners and leaders.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="">
        
        {/* Leader Profiles */}
        {leaders.map((leader, index) => (
          <div
            key={leader.id}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row bg-gray-50" : "md:flex-row-reverse bg-white"
            } items-center gap-10  p-10`}
          >
            {/* Image Card */}
                <div className="relative bg-white rounded-2xl shadow-lg p-6 md:w-1/3 w-full flex justify-center items-center">
                    
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
                className={`absolute ${
                  index % 2 === 0
                    ? "bottom-6 left-6 flex flex-col gap-2"
                    : "bottom-6 right-6 flex flex-col gap-2 items-end"
                }`}
              >
                <div className="w-5 h-5 bg-[#002D72] rounded-md"></div>
                <div className="w-4 h-4 bg-[#002D72] rounded-full"></div>
              </div>

              <div
                className={`absolute ${
                  index % 2 === 0 ? "top-6 right-6" : "top-6 left-6"
                } w-6 h-6 bg-[#002D72] rounded-md`}
              ></div>
            </div>

            {/* Text Section */}
            <div
              className={`md:w-2/3 text-left ${
                index % 2 === 0 ? "md:pl-10" : "md:pr-10"
              }`}
            >
              <h2
                className={`text-3xl md:text-4xl font-extrabold mb-2 ${
                  index % 2 === 0 ? "text-gray-900" : "text-[#002D72]"
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
      </div>
    </section>
  );
}
