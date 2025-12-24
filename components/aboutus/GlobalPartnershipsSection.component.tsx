"use client";
import Image from "next/image";

export default function GlobalPartnershipsSection() {
  const universityPartners = [
    { id: 1, name: "Mr. Kamal Bali", location: "President & MD, Volvo", image: "/images/kamal_bali.webp" },
    {
      id: 2,
      name: "Dr. Augustus (augie) Azariah",
      location: "Regional Director , Kyndryl India",
      image: "/images/dr_augustus.webp",
    },
    {
      id: 3,
      name: "Madhusudan Murthy",
      location: "Senior Vice President of Engineering GlobalLogic",
      image: "/images/madhusudan_murthy.webp",
    },
    {
      id: 4,
      name: "Viswanath PS",
      location: "Managing Director & CEO of Randstad India",
      image: "/images/viswanath_ps.webp",
    },
    {
      id: 5,
      name: "Dr Akali Fulmar",
      location: "Director of International Relations University of West Alabama",
      image: "/images/dr_akali_fulmer.webp",
    },
    {
      id: 6,
      name: "Pankaj Kumar Mishraa",
      location:
        "Head - Sales, GTM & GenAI at TCS AI.Cloud | Life-Sciences & Healthcare | AWS Business - North America | Business Story Telling Coach | Contextual Master | 8X AWS Certified",
      image: "/images/pankaj_kumar_mishraa.webp",
    },
    {
      id: 7,
      name: "Palash Gupta",
      location:
        "Product R&D, Engineering, Strategy| GCC Leader| NASSCOM DeepTech| President PMI Bangalore| Board Member & Mentor Startup.",
      image: "/images/palash_gupta.webp",
    },
  ];

  // const accreditations = [
  //   {
  //     id: 1,
  //     icon: <Lightbulb className="w-7 h-7 text-yellow-400" />,
  //     title: "NAAC A++",
  //     subtitle: "National Accreditation",
  //   },
  //   {
  //     id: 2,
  //     icon: <Globe className="w-7 h-7 text-yellow-400" />,
  //     title: "ISO 9001",
  //     subtitle: "Quality Management",
  //   },
  //   {
  //     id: 3,
  //     icon: <ShieldCheck className="w-7 h-7 text-yellow-400" />,
  //     title: "ABET",
  //     subtitle: "Engineering Programs",
  //   },
  //   {
  //     id: 4,
  //     icon: <Medal className="w-7 h-7 text-yellow-400" />,
  //     title: "NIRF",
  //     subtitle: "Top 50 Ranking",
  //   },
  //   {
  //     id: 5,
  //     icon: <Star className="w-7 h-7 text-yellow-400" />,
  //     title: "QS Rating",
  //     subtitle: "5 Star Excellence",
  //   },
  // ];

  return (
    <section
      className='relative bg-cover bg-center bg-fixed py-7 md:py-20 text-white'
      style={{ backgroundImage: "url('/images/sona-velliappa.webp')" }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black/70' />

      <div className='relative z-10 container mx-auto px-6 text-center'>
        {/* Section Title */}
        <h2 className='text-4xl font-extrabold mb-4'>
          Governing <span className='text-yellow-400'>Council</span>
        </h2>
        <p className='text-gray-300 max-w-3xl mx-auto mb-16'>
          Sona Tech School connects learners with global standards through international partnerships, recognised
          certifications, and globally benchmarked technology training. (25 words)
        </p>

        {/* University Partners */}
        <h3 className='text-2xl font-semibold mb-8'>SCALE Governing Council</h3>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-16'>
          {universityPartners.map((partner) => (
            <div
              key={partner.id}
              className='bg-white group backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-white/10 transition-all duration-300'
            >
              {/* <GraduationCap className="w-8 h-8 text-yellow-400 mb-3" /> */}
              <div className='relative w-28 h-28 mb-6 rounded-2xl overflow-hidden'>
                <Image src={partner.image} alt={partner.name} fill className='object-cover' />
              </div>
              <h4 className='font-semibold text-gray-500 group-hover:text-white '>{partner.name}</h4>
              <p className='text-gray-500 text-sm group-hover:text-white '>{partner.location}</p>
            </div>
          ))}
        </div>

        {/* Accreditations */}
        {/* <h3 className="text-2xl font-semibold mb-8">Accreditations and Certifications </h3>
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
        </div> */}
      </div>
    </section>
  );
}
