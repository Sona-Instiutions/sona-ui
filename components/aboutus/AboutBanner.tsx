import Image from "next/image";

export default function AboutBanner() {
  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/images/aboutus-banner.webp" // replace with your image path
        alt="About SCALE Banner"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Text Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold">
          About <span className="text-yellow-400">SCALE</span>
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-light">
          Shaping Tomorrow&apos;s Innovators Today
        </p>
      </div>
    </section>
  );
}
