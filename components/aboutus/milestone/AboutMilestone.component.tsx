// components/AboutMilestoneSection.tsx
import Image from "next/image";

export default function AboutMilestoneSection() {
  const milestones = [
    {
      id: 1,
      titleLeft: "Gandhi's Educational",
      titleHighlight: "Philosophy",
      paragraphs: [
        `Our founder did with tea plantations workers what our Father of Nation Mahatma Gandhi did with the mining workers in South Africa and the two men formed a lasting friendship. It was in 1921 in Kalaithanthai’s house that the famous loin cloth incident took place (where Mahatma Gandhi removed his shirt, never to wear one again).`,
        `The British had set up the Indian education system in a thoughtful manner i.e. there were many English schools for people to learn English, which made it easy for them to communicate with a large number of Indians. The British did not, however, invest much in higher education. As a visionary, our founder decided that the best way to develop India was to set up institutes that facilitate higher education in engineering. This resulted in the backward integration of human resources for the Group. Fondly named as ‘Kalathani’, which means ‘Father of Education’ people look up to him for his pioneering seminal work towards education.`,
        `As a philanthropic group, The Sona Group believes that ‘Education is Knowledge’ and has started several educational institutions, which have grown to become some of the best colleges in India.`,
      ],
      image: "/images/gandhis-educational-philosophy.webp",
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#ffffff"
            strokeWidth="2"
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          />
        </svg>
      ),
      yearLabel: "1921 — CHANGING WAY HE CLOTHS",
    },
    {
      id: 2,
      titleLeft: "Sona Towers",
      titleHighlight: "IT Revolution",
      paragraphs: [
        `The establishment of Sona Towers marked a pivotal moment in our technological evolution, transforming us into a digitally-enabled institution at the forefront of educational innovation. This state-of-the-art facility houses our advanced computing laboratories, research centers, and digital infrastructure.`,
        `With cutting-edge servers, high-speed connectivity, and cloud computing capabilities, Sona Towers enables seamless digital learning experiences, virtual laboratories, and collaborative research projects that connect our students and faculty with global academic communities.`,
        `The Towers serves as the nerve center for our digital transformation initiatives, supporting everything from AI-powered learning analytics to virtual reality classrooms, ensuring our students are prepared for the digital economy of tomorrow.`,
      ],
      image: "/images/sona-Towers-it-revolution.webp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z" />
          <path d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z" />
        </svg>
      ),
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
      image: "/images/isro-and-chandrayaan-legacy.webp",
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
        >
          <g transform="rotate(-45 12 12)">
            <path
              stroke="#ffffff"
              strokeWidth="1"
              d="m10.051 8.102-3.778.322-1.994 1.994a.94.94 0 0 0 .533 1.6l2.698.316m8.39 1.617-.322 3.78-1.994 1.994a.94.94 0 0 1-1.595-.533l-.4-2.652m8.166-11.174a1.366 1.366 0 0 0-1.12-1.12c-1.616-.279-4.906-.623-6.38.853-1.671 1.672-5.211 8.015-6.31 10.023a.932.932 0 0 0 .162 1.111l.828.835.833.832a.932.932 0 0 0 1.111.163c2.008-1.102 8.35-4.642 10.021-6.312 1.475-1.478 1.133-4.77.855-6.385Zm-2.961 3.722a1.88 1.88 0 1 1-3.76 0 1.88 1.88 0 0 1 3.76 0Z"
            />
          </g>
        </svg>
      ),
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
                        {m.icon}
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
