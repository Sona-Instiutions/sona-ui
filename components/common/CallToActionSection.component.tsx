import Link from "next/link";

interface CallToActionProps {
    bgColor?: string; // only color will change
    heading?: string;
    description?: string;
    cta1?: string;
    cta2?: string;
    cta1Link?: string;
    cta2Link?: string;
}

export default function CallToActionSection({
    bgColor = "bg-yellow-600",
    heading = "Ready to Shape Your Future?",
    description = "Join thousands of successful graduates who chose SCALE to transform their dreams into reality. Your journey to excellence starts here.",
    cta1 = "Apply for Admission",
    cta2 = "Schedule Campus Visit",
    cta1Link = "/contact", // ✅ default link
    cta2Link = "/contact",
}: CallToActionProps) {
    return (
        <section className={`${bgColor} text-white py-12 relative overflow-hidden bg-opacity-20`}>
            <div className="absolute inset-0 bg-black/20 bg-opacity-20"></div>
            <div className="container mx-auto px-6 text-center relative z-10 ">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    {heading}{/* Ready to Shape Your Future? */}
                </h2>
                <p className="text-sm md:text-lg mb-10 opacity-90 max-w-3xl mx-auto">
                    {description}
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <Link
                        href={cta1Link}
                        className="bg-white text-yellow-700 font-semibold px-8 py-3 rounded-md shadow hover:bg-gray-100 transition"
                    >
                        {cta1}
                    </Link>
                    <Link
                        href={cta2Link}
                        className="border border-white text-white font-semibold px-8 py-3 rounded-md transition-all duration-300 hover:bg-white hover:text-black"
                    >
                        {cta2}
                    </Link>
                </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute top-10 left-10 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/30 rounded-full blur-3xl"></div>
            </div>
            <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 bg-opacity-10 rounded-full floating-element"></div>
            <div className="absolute bottom-20 left-20 w-16 h-16 bg-white/10 bg-opacity-10 rounded-lg floating-element"></div>
            <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-white/10 bg-opacity-10 rounded-full floating-element"></div>
        </section>
    );
}
