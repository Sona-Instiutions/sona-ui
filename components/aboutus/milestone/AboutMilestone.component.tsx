// components/AboutMilestoneSection.tsx
import Image from "next/image";

export default function AboutMilestoneSection() {
  const milestones = [
    {
      id: 1,
      titleLeft: "Gandhi's Educational",
      titleHighlight: "Philosophy",
      paragraphs: [
        `Our founder did with tea plantations workers what our Father of Nation Mahatma Gandhi did with the mining workers in South Africa and the two men formed a lasting friendship. It was in 1921 in Kaliahthanthi’s house that the famous loin cloth incident took place (where Mahatma Gandhi removed his shirt, never to wear one again).`,
        `The British had set up the Indian education system in a thoughtful manner i.e. there were many English schools for people to learn English, which made it easy for them to communicate with a large number of Indians. The British did not, however, invest much in higher education. As a visionary, our founder decided that the best way to develop India was to set up institutes that facilitate higher education in engineering. This resulted in the backward integration of human resources for the Group. Fondly named as ‘Kalathani’, which means ‘Father of Education’ people look up to him for his pioneering seminal work towards education.`,
        `As a philanthropic group, The Sona Group believes that ‘Education is Knowledge’ and has started several educational institutions, which have grown to become some of the best colleges in India.`,
      ],
      image: "/images/milestone-gandhi.jpg",
      yearLabel: "1921 — CHANGING WAY HE CLOTHS",
    },
    {
      id: 2,
      titleLeft: "Sona Tower",
      titleHighlight: "IT Revolution",
      paragraphs: [
        `The establishment of Sona Tower marked a pivotal moment in our technological evolution, transforming us into a digitally-enabled institution at the forefront of educational innovation. This state-of-the-art facility houses our advanced computing laboratories, research centers, and digital infrastructure.`,
        `With cutting-edge servers, high-speed connectivity, and cloud computing capabilities, Sona Tower enables seamless digital learning experiences, virtual laboratories, and collaborative research projects that connect our students and faculty with global academic communities.`,
        `The tower serves as the nerve center for our digital transformation initiatives, supporting everything from AI-powered learning analytics to virtual reality classrooms, ensuring our students are prepared for the digital economy of tomorrow.`,
      ],
      image: "/images/milestone-tower.jpg",
      yearLabel: "1980 — TECHNOLOGICAL LEAP",
    },
    {
      id: 3,
      titleLeft: "ISRO &",
      titleHighlight: "Chandrayaan Legacy",
      paragraphs: [
        `Our proud association with ISRO’s Chandrayaan missions represents the pinnacle of our commitment to space research and national scientific advancement. Several of our faculty members and alumni have contributed directly to India’s lunar exploration program, bringing world-class space technology expertise to our campus.`,
        `Through collaborative research programs with ISRO, our students gain hands-on experience with satellite technology, space communications, and aerospace engineering. Our specialized laboratories simulate space conditions, allowing students to work on real mission-critical projects.`,
        `This partnership has established us as a premier institution for space science education in India, inspiring a new generation of space scientists and engineers who will lead future missions to the Moon, Mars, and beyond.`,
      ],
      image: "/images/milestone-space.jpg",
      yearLabel: "2019 — SPACE EXCELLENCE",
    },
  ];

  return (
    <section className="bg-pink-50 py-12 md:py-20">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="w-20 h-[2px] bg-yellow-500 mx-auto mb-4 rounded-sm" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Legacy <span className="text-yellow-500">Highlights</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600">
            Three pivotal stories that define our institutional character and
            commitment to excellence, innovation, and national progress.
          </p>
        </div>

        {/* Milestones */}
        <div className="space-y-16">
          {milestones.map((m, idx) => {
            const reversed = idx % 2 === 1;

            return (
              <article
                key={m.id}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                  reversed ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image Card */}
                <div className="md:w-1/2 w-full">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-400 p-4">
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
                      <Image
                        src={m.image}
                        alt={m.titleLeft}
                        fill
                        className="object-cover"
                        priority={idx < 2}
                      />
                    </div>

                    {/* Badge */}
                    <div className="mt-4 flex items-start">
                      <div className="bg-[#002D72] text-white px-4 py-2 rounded-full shadow-md inline-flex items-center gap-3 text-xs font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 2v6" />
                          <path d="M12 22v-6" />
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                          />
                        </svg>
                        <span>{m.yearLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="md:w-1/2 w-full">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {m.titleLeft}{" "}
                    <span className="text-yellow-500">{m.titleHighlight}</span>
                  </h3>

                  {/* Render paragraphs with spacing */}
                  <div className="mt-4 text-gray-600 leading-relaxed">
                    {m.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className={i === 0 ? "mb-4" : "mt-4"}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
