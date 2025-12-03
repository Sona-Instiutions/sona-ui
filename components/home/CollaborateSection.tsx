import { GraduationCap, FlaskConical, Handshake, Lightbulb } from "lucide-react";

export default function CollaborateSection() {
  const items = [
    {
      id: 1,
      icon: <GraduationCap className="w-8 h-8 text-yellow-500" />,
      title: "Partner-driven learning ",
      description:
        "Industry mentors collaborate to drive real-world project outcomes. ",
    },
    {
      id: 2,
      icon: <FlaskConical className="w-8 h-8 text-yellow-500" />,
      title: "Innovation through research ",
      description:
        "Labs advance ideas in AI, digital transformation, and future technologies. ",
    },
    {
      id: 3,
      icon: <Handshake className="w-8 h-8 text-yellow-500" />,
      title: "Cross-border opportunities ",
      description:
        "Global institutions expand student mobility and academic exposure. ",
    },
    {
      id: 4,
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: "Corporate-ready talent",
      description:
        "Programs aligned with industry needs create high-impact professionals.",
    },
  ];

  return (
    <section
      className="relative bg-fixed bg-center bg-cover py-7 md:py-20 text-white"
      style={{ backgroundImage: "url('/images/collabarate-bg.webp')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-4xl font-extrabold mb-4">
          Collaborate <span className="text-yellow-400">&amp; Innovate</span>
        </h2>
        <p className="text-gray-200 max-w-3xl mx-auto mb-16">
          CALE brings together enterprises, innovators, students, and global institutions to co-create solutions, accelerate research, develop talent, and build industry-focused projects that shape the future of business and technology.

        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-start hover:shadow-xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-yellow-100 flex items-center justify-center rounded-lg mb-6">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {/* <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-md transition-all">
          Collaborate with us
        </button> */}
      </div>
    </section>
  );
}
