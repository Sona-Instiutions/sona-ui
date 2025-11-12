import Image from "next/image";
import { Monitor, Calculator, Users, Briefcase } from "lucide-react";

export default function WhyChooseSection() {
    return (
        <section className="relative py-20 bg-white bg-pattern">
            <div className="container mx-auto px-6 lg:px-12 text-center">
                {/* Section Heading */}
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Why Choose <span className="text-yellow-500">SCALE</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-16">
                    Discover what makes SCALE the preferred choice for students and
                    industry partners worldwide.
                </p>

                {/* Main layout grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10">
                    {/* LEFT FEATURES */}

                    
                        <div className="flex flex-col items-center space-y-12 text-center">
                            <FeatureCard
                                icon={<Calculator className="w-6 h-6 text-red-500" />}
                                color="bg-red-100"
                                title="Industry-Relevant Curriculum"
                                text="Learn skills and concepts that top companies actively seek in professionals today."
                            />
                            <FeatureCard
                                icon={<Briefcase className="w-6 h-6 text-green-500" />}
                                color="bg-green-100"
                                title="Expert Mentorship"
                                text="Get guided by industry leaders and experienced mentors to accelerate your growth."
                            />
                        </div>
                    

                    {/* CENTER IMAGE */}
                    <div className="flex justify-center">
                        <div className="relative w-[280px] h-[500px] rounded-[2rem] overflow-hidden shadow-lg">
                            <Image
                                src="/images/why-choose-us.webp"
                                alt="Sona Tower"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* RIGHT FEATURES */}
                    <div className="flex flex-col items-center space-y-12 text-center">
                        <FeatureCard
                            icon={<Monitor className="w-6 h-6 text-yellow-500" />}
                            color="bg-yellow-100"
                            title="Career-Driven Outcomes"
                            text="Structured support to help you land roles at leading companies."
                        />
                        <FeatureCard
                            icon={<Users className="w-6 h-6 text-blue-500" />}
                            color="bg-blue-100"
                            title="Vibrant Learning Community"
                            text="Connect with peers and professionals to stay motivated, networked, and inspired."
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
