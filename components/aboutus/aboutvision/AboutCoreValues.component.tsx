// components/CoreValuesSection.tsx
import Image from "next/image";

export default function CoreValuesSection() {
  const values = [
    {
      id: 1,
      title: "Industry Interaction",
      description:
        "Fostering creative thinking and breakthrough solutions that push the boundaries of knowledge and technology.",
      color: "from-blue-400 to-blue-600",
      underline: "bg-blue-400",
      icon: (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#ffffff"
          width="40"
          height="40"
        >
          <path
            stroke="#ffffff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M10 18v-.107c0-.795-.496-1.488-1.117-1.984a5 5 0 1 1 6.235 0c-.622.497-1.118 1.189-1.118 1.984V18m-4 0v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2m-4 0h4m-2-3v-2"
          ></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Green Campus",
      description:
        "Upholding the highest ethical standards in all our academic, research, and professional endeavors.",
      color: "from-green-400 to-green-600",
      underline: "bg-green-400",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
        >
          <path
            d="M9 12L11 14L15 9.99999M20 12C20 16.4611 14.54 19.6937 12.6414 20.683C12.4361 20.79 12.3334 20.8435 12.191 20.8712C12.08 20.8928 11.92 20.8928 11.809 20.8712C11.6666 20.8435 11.5639 20.79 11.3586 20.683C9.45996 19.6937 4 16.4611 4 12V8.21759C4 7.41808 4 7.01833 4.13076 6.6747C4.24627 6.37113 4.43398 6.10027 4.67766 5.88552C4.9535 5.64243 5.3278 5.50207 6.0764 5.22134L11.4382 3.21067C11.6461 3.13271 11.75 3.09373 11.857 3.07827C11.9518 3.06457 12.0482 3.06457 12.143 3.07827C12.25 3.09373 12.3539 3.13271 12.5618 3.21067L17.9236 5.22134C18.6722 5.50207 19.0465 5.64243 19.3223 5.88552C19.566 6.10027 19.7537 6.37113 19.8692 6.6747C20 7.01833 20 7.41808 20 8.21759V12Z"
            stroke="#ffffff"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Collaboration",
      description:
        "Building strong partnerships across disciplines, industries, and cultures to achieve collective success.",
      color: "from-violet-400 to-violet-600",
      underline: "bg-violet-400",
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#ffffff"
            stroke-linecap="round"
            stroke-width="1"
            d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Curiosity",
      description:
        "Encouraging relentless questioning and exploration that drives discovery and lifelong learning.",
      color: "from-orange-400 to-orange-600",
      underline: "bg-orange-400",
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#ffffff"
            stroke-linecap="round"
            stroke-width="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Impact",
      description:
        "Creating meaningful change that benefits society, the environment, and future generations.",
      color: "from-red-400 to-red-600",
      underline: "bg-red-400",
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="none"
          viewBox="0 0 24 24"
        >
          <g transform="rotate(-45 12 12)">
            <path
              stroke="#ffffff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="m10.051 8.102-3.778.322-1.994 1.994a.94.94 0 0 0 .533 1.6l2.698.316m8.39 1.617-.322 3.78-1.994 1.994a.94.94 0 0 1-1.595-.533l-.4-2.652m8.166-11.174a1.366 1.366 0 0 0-1.12-1.12c-1.616-.279-4.906-.623-6.38.853-1.671 1.672-5.211 8.015-6.31 10.023a.932.932 0 0 0 .162 1.111l.828.835.833.832a.932.932 0 0 0 1.111.163c2.008-1.102 8.35-4.642 10.021-6.312 1.475-1.478 1.133-4.77.855-6.385Zm-2.961 3.722a1.88 1.88 0 1 1-3.76 0 1.88 1.88 0 0 1 3.76 0Z"
            />
          </g>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="w-20 h-[2px] bg-[#002D72] mx-auto mb-4 rounded-sm" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Our <span className="text-yellow-500">Core Values</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            These fundamental principles guide every aspect of our institution,
            from curriculum design to student support, ensuring we maintain the
            highest standards of educational excellence.
          </p>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
          {values.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center p-6 pt-10 relative overflow-hidden"
            >
              {/* icon badge */}
              <div
                className={`relative -top-6 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${v.color} shadow-[0_10px_30px_rgba(0,0,0,0.08)]`}
              >
                {v.icon}
              </div>

              {/* content */}
              <div className="mt-1">
                <h4 className="text-base md:text-lg font-semibold text-gray-900">
                  {v.title}
                </h4>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-[12rem] md:max-w-[14rem] mx-auto">
                  {v.description}
                </p>
              </div>

              {/* colored underline at bottom */}
              <div className="mt-auto w-full pt-6">
                <div
                  className={`h-1 w-10 mx-auto rounded-full ${v.underline} mb-1`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
