"use client";
import Image from "next/image";
import {
  UserPlus,
  Flask,
  CurrencyDollar,
  Globe,
  GraduationCap,
  Medal,
} from "phosphor-react";

export default function WhyCollaborate() {
    const cards = [
        {
            title: "Access Top Talent",
            desc: "Connect with pre-screened, industry-ready graduates with cutting-edge skills",
            img: "/images/about-us-section-1.webp",
            icon: <UserPlus size={24} weight="duotone" className="text-white"/>,
        },
        {
            title: "Research & Innovation",
            desc: "Leverage our state-of-the-art facilities and expert faculty for breakthrough solutions",
            img: "/images/about-us-section-1.webp",
            icon: <Flask size={24} weight="duotone" className="text-white"/>,
        },
        {
            title: "Cost–Effective Solutions",
            desc: "Reduce training costs while accessing high-quality talent and research capabilities",
            img: "/images/about-us-section-1.webp",
            icon: <CurrencyDollar size={24} weight="duotone" className="text-white"/>,
        },
        {
            title: "Global Network Access",
            desc: "Tap into our extensive alumni network and international partnerships worldwide",
            img: "/images/about-us-section-1.webp",
            icon: <Globe size={24} weight="duotone" className="text-white"/>,
        },
        {
            title: "Customized Training",
            desc: "Tailored programs designed specifically for your industry needs and requirements",
            img: "/images/about-us-section-1.webp",
            icon: <GraduationCap size={24} weight="duotone" className="text-white"/>,
        },
        {
            title: "Brand Enhancement",
            desc: "Enhance your corporate reputation through association with educational excellence",
            img: "/images/about-us-section-1.webp",
            icon: <Medal size={24} weight="duotone" className="text-white"/>,
        },
    ];

    return (
        <section className="py-16 bg-white">
            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto mb-14">
                <h2 className="text-4xl font-extrabold">
                    Why <span className="text-yellow-400">Collaborate</span> With SCALE
                </h2>
                <p className="text-gray-600 mt-4">
                    Unlock the power of academic excellence and industry innovation through
                    strategic partnerships that benefit both your organization and our students
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
                {cards.map((item, index) => (
                    <div
                        key={index}
                        className="relative rounded-2xl overflow-hidden shadow-md group cursor-pointer transition-all"
                    >
                        {/* Background Image */}
                        <Image
                            src={item.img}
                            alt={item.title}
                            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                            priority
                            width={500}
                            height={300}
                        />

                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all"></div>

                        {/* Content */}
                        <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                            <div className="bg-yellow-400 text-black rounded-full flex items-center justify-center w-10 h-10">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <p className="text-sm opacity-90">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
