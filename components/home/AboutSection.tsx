import Image from "next/image";
import { Check } from "lucide-react"; // optional icons

export default function AboutSection() {
    return (
        <section className="relative py-7 md:py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-12">

                {/* LEFT SIDE — TEXT CONTENT */}
                <div className="flex-1">
                    <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                        About <span className="text-yellow-500">SCALE</span>
                    </h2>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        SCALE by Sona Valliappa Group represents a revolutionary approach to education,
                        bridging the gap between traditional learning and industry requirements through
                        innovative curriculum and cutting-edge technology.
                    </p>

                    {/* Bullet points */}
                    <ul className="space-y-5 mb-10">
                        <li className="flex items-start gap-3">
                            <div className="bg-yellow-400 rounded-full w-[26px] h-[26px] flex items-center justify-center text-white flex-shrink-0">
                                <Check className="w-3.5 h-3.5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Industry-Aligned Curriculum</h4>
                                <p className="text-sm text-gray-600">
                                    Courses designed with direct input from leading industry professionals
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <div className="bg-yellow-400 rounded-full w-[26px] h-[26px] flex items-center justify-center text-white flex-shrink-0">
                                <Check className="w-3.5 h-3.5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Global Partnerships</h4>
                                <p className="text-sm text-gray-600">
                                    Strategic alliances with top universities and corporations worldwide
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <div className="bg-yellow-400 rounded-full w-[26px] h-[26px] flex items-center justify-center text-white flex-shrink-0">
                                <Check className="w-3.5 h-3.5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Future-Ready Skills</h4>
                                <p className="text-sm text-gray-600">
                                    Focus on emerging technologies and sustainable solutions
                                </p>
                            </div>
                        </li>
                    </ul>

                    <button className="cursor-pointer px-6 py-3 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-800 transition">
                        Discover Our Story
                    </button>
                </div>

                {/* RIGHT SIDE — 4 IMAGES */}
                <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-5">
                        <div className="rounded-[50%_0_0_0] overflow-hidden">
                            <Image
                                src="/images/home-about-section.webp"
                                alt="About Sona Image 1"
                                width={400}
                                height={300}
                                className="w-72 h-72 object-cover object-top shadow-lg"
                            />
                        </div>
                        <div className="rounded-[0_0_0_50%] overflow-hidden">
                            <Image
                                src="/images/home-about-section.webp"
                                alt="About Sona Image 4"
                                width={400}
                                height={300}
                                className="w-72 h-72 object-cover object-top shadow-lg"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5 mt-6">
                        <div className="rounded-[0_50%_0_0] overflow-hidden">
                            <Image
                                src="/images/home-about-section.webp"
                                alt="About Sona Image 2"
                                width={400}
                                height={300}
                                className="w-72 h-72 object-cover object-top shadow-lg"
                            />
                        </div>
                        <div className="rounded-[0_0_50%_0] overflow-hidden">
                            <Image
                                src="/images/home-about-section.webp"
                                alt="About Sona Image 3"
                                width={400}
                                height={300}
                                className="w-72 h-72 object-cover object-top shadow-lg"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
