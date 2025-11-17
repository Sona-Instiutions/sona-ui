import {
  GraduationCap,
  Award,
  ShieldCheck,
  Globe,
  Star,
  Medal,
  Lightbulb,
} from "lucide-react";

export default function GlobalPartnershipsSection() {
  const universityPartners = [
    { id: 1, name: "MIT", location: "USA" },
    { id: 2, name: "Stanford", location: "USA" },
    { id: 3, name: "Oxford", location: "UK" },
    { id: 4, name: "Cambridge", location: "UK" },
    { id: 5, name: "NUS", location: "Singapore" },
    { id: 6, name: "ETH Zurich", location: "Switzerland" },
  ];

  const accreditations = [
    {
      id: 1,
      icon: <Lightbulb className="w-7 h-7 text-yellow-400" />,
      title: "NAAC A++",
      subtitle: "National Accreditation",
    },
    {
      id: 2,
      icon: <Globe className="w-7 h-7 text-yellow-400" />,
      title: "ISO 9001",
      subtitle: "Quality Management",
    },
    {
      id: 3,
      icon: <ShieldCheck className="w-7 h-7 text-yellow-400" />,
      title: "ABET",
      subtitle: "Engineering Programs",
    },
    {
      id: 4,
      icon: <Medal className="w-7 h-7 text-yellow-400" />,
      title: "NIRF",
      subtitle: "Top 50 Ranking",
    },
    {
      id: 5,
      icon: <Star className="w-7 h-7 text-yellow-400" />,
      title: "QS Rating",
      subtitle: "5 Star Excellence",
    },
  ];

  return (
    <section
      className="relative bg-cover bg-center bg-fixed py-24 text-white"
      style={{ backgroundImage: "url('/images/sona-velliappa.webp')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold mb-4">
          Global <span className="text-yellow-400">Partnerships</span> & Accreditations
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-16">
          Our commitment to excellence is recognized worldwide through strategic
          partnerships and prestigious accreditations.
        </p>

        {/* University Partners */}
        <h3 className="text-2xl font-semibold mb-8">International University Partners</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {universityPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-white/20 transition-all duration-300"
            >
              <GraduationCap className="w-8 h-8 text-yellow-400 mb-3" />
              <h4 className="font-semibold text-gray-300">{partner.name}</h4>
              <p className="text-gray-300 text-sm">{partner.location}</p>
            </div>
          ))}
        </div>

        {/* Accreditations */}
        <h3 className="text-2xl font-semibold mb-8">Accreditations & Certifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {accreditations.map((item) => (
            <div
              key={item.id}
              className="bg-white backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h4 className="font-semibold text-gray-300">{item.title}</h4>
              <p className="text-gray-300 text-sm">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
