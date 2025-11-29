import Image from "next/image";

type NewsItem =
  | {
      id: number;
      type: "image";
      src: string;
      date: string;
      title: string;
      color?: never;
    }
  | {
      id: number;
      type: "card";
      color: string;
      date: string;
      title: string;
      src?: never;
    };

export default function NewsEventsSection() {
  const news: NewsItem[] = [
    {
      id: 1,
      type: "image",
      src: "/images/event-1.webp",
      date: "",
      title: "",
    },
    {
      id: 2,
      type: "card",
      color: "bg-blue-600",
      date: "June 27, 2022",
      title: "Sona College Students Receive Diplomas in Tie-up with TCS",
    },
    {
      id: 3,
      type: "image",
      src: "/images/event-2.webp",
      date: "",
      title: "",
    },
    {
      id: 4,
      type: "card",
      color: "bg-yellow-400",
      date: "June 27, 2022",
      title: "Sona College Launches New Program in Collaboration with TCS",
    },
    {
      id: 5,
      type: "image",
      src: "/images/event-3.webp",
      date: "",
      title: "",
    },
    {
      id: 6,
      type: "card",
      color: "bg-yellow-400",
      date: "Oct 13, 2025",
      title:
        "Sona College of Technology Launches India's First Applied Quantum Computing with Dynex Course",
    },
    {
      id: 7,
      type: "image",
      src: "/images/event-4.webp",
      date: "",
      title: "",
    },
    {
      id: 8,
      type: "card",
      color: "bg-gray-800",
      date: "June 27, 2022",
      title:
        "Sona College of Technology Launches Online Course on Quantum Computing",
    },
    {
      id: 9,
      type: "image",
      src: "/images/event-5.webp",
      date: "",
      title: "",
    },
    {
      id: 10,
      type: "card",
      color: "bg-blue-600",
      date: "June 27, 2022",
      title:
        "Online Graduation Ceremony for Dynex Course Held at Sona College of Technology, Salem",
    },
  ];

  return (
    <section className="py-7 md:py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          News <span className="text-yellow-500">& Events</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-16">
          Stay updated with the latest happenings, achievements, and upcoming
          events at SCALE and across the Sona Valliappa Group institutions.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {news.map((item) =>
            item.type === "image" ? (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl shadow-md group cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.title || "News Image"}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ) : (
              <div
                key={item.id}
                className={`${item.color} text-white rounded-2xl p-6 flex flex-col justify-center text-left shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-white/20 flex items-center justify-center rounded-full">
                    <span className="text-xs">👤</span>
                  </div>
                  <p className="text-sm opacity-90">{item.date}</p>
                </div>
                <h3 className="font-semibold text-lg leading-snug">
                  {item.title}
                </h3>
              </div>
            )
          )}
        </div>

        {/* Button */}
        <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-10 py-4 rounded-md transition">
          View All News & Events
        </button>
      </div>
    </section>
  );
}
