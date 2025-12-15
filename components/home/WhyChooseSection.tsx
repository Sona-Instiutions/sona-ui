"use client";
import Image from "next/image";
import {Laptop  ,Medal , Books , UserSquare } from "phosphor-react";

export default function WhyChooseSection() {
    return (
        <section className="relative py-7 md:py-20 bg-white bg-pattern">
            <div className="container mx-auto px-6 lg:px-12 text-center">
                {/* Section Heading */}
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Why Choose <span className="text-yellow-500">SCALE</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-16">
                A fully tech-integrated, industry-driven, globally connected ecosystem that provides education, capability centers, and innovation hubs to shape future-ready leaders.
                </p>

                {/* Main layout grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10">
                    {/* LEFT FEATURES */}
                    <div className="flex flex-col items-center space-y-12 text-center">
                        <FeatureCard
                            icon={<Laptop className="w-6 h-6 text-red-500" />}
                            color="bg-red-100"
                            title="24/7 HOT Labs"
                            text="Hands-on Training lab, always-on access to real industry tools for practical learning."
                        />
                        <FeatureCard
                            icon={<Medal className="w-6 h-6 text-green-500" />}
                            color="bg-green-100"
                            title="Global Certifications"
                            text="Internationally backed credentials boosting global career readiness."
                        />
                    </div>
                    {/* CENTER IMAGE */}
                    <div className="flex justify-center">
                        <div className="relative w-[280px] h-[500px] rounded-[2rem] overflow-hidden shadow-lg">
                            <Image
                                src="/images/why_choose_scale_center.webp"
                                alt="Sona Tower"
                                fill
                                className="object-fill"
                            />
                        </div>
                    </div>

                    {/* RIGHT FEATURES */}
                    <div className="flex flex-col items-center space-y-12 text-center">
                        <FeatureCard
                            icon={<Books   className="w-6 h-6 text-yellow-500" />}
                            color="bg-yellow-100"
                            title="Industry-Built Curriculum"
                            text="Programs co-created with GCC leaders to match real enterprise needs."
                        />
                        <FeatureCard
                            icon={<UserSquare  className="w-6 h-6 text-blue-500" />}
                            color="bg-blue-100"
                            title="Day-One Readiness"
                            text="Talent trained to deliver impact from the very first day at work."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* Reusable Feature Card Component */
function FeatureCard({
    icon,
    color,
    title,
    text,
}: {
    icon: React.ReactNode;
    color: string;
    title: string;
    text: string;
}) {
    return (
        <div className="max-w-xs">
            <div className={`w-12 h-12 ${color} flex items-center justify-center rounded-lg mx-auto lg:mx-0 mb-4`}>
                {icon}
            </div>
            <div className="bg-blue-900 text-white font-semibold py-2 px-4 inline-block mb-2">
                {title}
            </div>
            <p className="text-gray-600 text-sm">{text}</p>
        </div>
    );
}
