import { BookOpen, Wrench, Users, Lightbulb } from "lucide-react";

export default function TeachingApproachSection() {
    const approaches = [
        {
            id: 1,
            icon: <BookOpen className="w-7 h-7 text-red-500" />,
            iconColor: "bg-red-100",
            title: "Foundation Knowledge",
            description:
                "Building strong theoretical foundations through comprehensive curriculum and expert faculty guidance.",
            color: "bg-red-500",
        },
        {
            id: 2,
            icon: <Wrench className="w-7 h-7 text-yellow-500" />,
            iconColor: "bg-yellow-100",
            title: "Practical Application",
            description:
                "Hands-on learning through state-of-the-art laboratories and real-world project implementations.",
            color: "bg-yellow-500",
        },
        {
            id: 3,
            icon: <Users className="w-7 h-7 text-green-500" />,
            iconColor: "bg-green-100",
            title: "Industry Integration",
            description:
                "Direct collaboration with industry partners through internships, projects, and mentorship programs.",
            color: "bg-green-500",
        },
        {
            id: 4,
            icon: <Lightbulb className="w-7 h-7 text-blue-500" />,
            iconColor: "bg-blue-100",
            title: "Innovation Excellence",
            description:
                "Fostering creativity and entrepreneurship through research projects and startup incubation.",
            color: "bg-blue-500",
        },
    ];

    const outcomes = [
        { id: 1, percentage: "95%", label: "Industry Readiness" },
        { id: 2, percentage: "87%", label: "Innovation Projects" },
        { id: 3, percentage: "92%", label: "Career Satisfaction" },
    ];

    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6 text-center">
                {/* Heading */}
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Our <span className="text-yellow-500">Teaching Approach</span>
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto mb-16">
                    Transforming education through our innovative methodology that bridges
                    theoretical knowledge with practical application.
                </p>

                {/* Teaching Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {approaches.map((item) => (
                        <div
                            key={item.id}
                            className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            {/* Colored Dot */}
                            <div
                                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 ${item.color} rounded-full`}
                            ></div>

                            {/* Icon */}
                            <div className={`w-16 h-16 flex items-center justify-center rounded-lg mx-auto ${item.iconColor} mb-6`}>{item.icon}</div>

                            {/* Title */}
                            <h3 className="font-bold text-gray-900 mb-2">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Learning Outcomes */}
                <div className="bg-[#002D72] text-white rounded-3xl py-10 px-6">
                    <h3 className="text-2xl font-bold mb-8">Learning Outcomes</h3>

                    <div className="flex flex-col sm:flex-row items-center justify-around gap-10">
                        {outcomes.map((outcome) => (
                            <div key={outcome.id}>
                                <p className="text-4xl font-extrabold mb-1">
                                    {outcome.percentage}
                                </p>
                                <p className="text-sm opacity-90">{outcome.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
