import Image from "next/image";

interface BreadcrumbBannerProps {
  title: string;              // Main heading text (e.g. "Visionary Leadership")
  highlight?: string;         // Optional highlighted word (e.g. "Leadership")
  description?: string;       // Subheading or description below title
  backgroundImage: string;    // Path to background image
  overlayOpacity?: string;    // Optional overlay opacity (default = 40%)
}

export default function BreadcrumbBanner({
  title,
  highlight,
  description,
  backgroundImage,
  overlayOpacity = "bg-black/40",
}: BreadcrumbBannerProps) {
  return (
    <section className="relative w-full h-[350px] md:h-[250px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayOpacity}`}></div>

      {/* Text content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
          {title.split(" ").slice(0, -1).join(" ")}{" "}
          {highlight && <span className="text-yellow-400">{highlight}</span>}
        </h1>

        {description && (
          <p className="text-white/90 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
