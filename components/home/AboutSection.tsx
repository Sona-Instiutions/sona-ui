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
                       A new-age tech business school where industry-built learning, global exposure, and innovation-driven education prepare students to become future-ready, ethical, and technology-powered leaders.
                    </p>

                    {/* Bullet points */}
                    <ul className="space-y-5 mb-10">
                        <li className="flex items-start gap-3">
                            <div className="bg-yellow-400 rounded-full w-[26px] h-[26px] flex items-center justify-center text-white flex-shrink-0">
                                <Check className="w-3.5 h-3.5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Tech-powered leadership</h4>
                                <p className="text-sm text-gray-600">
                                    Building managers fluent in AI, analytics, digital strategy, and emerging technologies.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <div className="bg-yellow-400 rounded-full w-[26px] h-[26px] flex items-center justify-center text-white flex-shrink-0">
                                <Check className="w-3.5 h-3.5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Industry-built ecosystem</h4>
                                <p className="text-sm text-gray-600">
                                    Curriculum co-created with CXOs, founders, and global industry leaders.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <div className="bg-yellow-400 rounded-full w-[26px] h-[26px] flex items-center justify-center text-white flex-shrink-0">
                                <Check className="w-3.5 h-3.5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Global-ready education</h4>
                                <p className="text-sm text-gray-600">
                                    International mentors, cross-border learning, and real-world business immersion.
                                </p>
                            </div>
                        </li>
                    </ul>

                    <button className="cursor-pointer px-6 py-3 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-800 transition">
                        Discover more
                    </button>
                </div>

                {/* RIGHT SIDE — 4 IMAGES */}
                <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-5">
                        <div className="rounded-[50%_0_0_0] overflow-hidden">
                            <Image
                                src="/images/about-us-section-1.webp"
                                alt="About Sona Image 1"
                                width={400}
                                height={300}
                                className="w-72 h-72 object-cover object-top shadow-lg"
                            />
                        </div>
                        <div className="rounded-[0_0_0_50%] overflow-hidden">
                            <Image
                                src="/images/about-us-section-2.webp"
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
                                src="/images/about-us-section-3.webp"
                                alt="About Sona Image 2"
                                width={400}
                                height={300}
                                className="w-72 h-72 object-cover object-top shadow-lg"
                            />
                        </div>
                        <div className="rounded-[0_0_50%_0] overflow-hidden">
                            <Image
                                src="/images/about-us-section-4.webp"
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
