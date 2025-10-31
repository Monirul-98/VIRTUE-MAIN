"use client";

import logosData from "@/content/logos.json";

export default function LogoMarquee() {
  // Triple the logos for seamless infinite loop
  const allLogos = [...logosData.logos, ...logosData.logos, ...logosData.logos];

  return (
    <div className="relative overflow-hidden py-8 group">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee group-hover:[animation-play-state:paused] gap-16">
        {allLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex h-16 min-w-[160px] flex-shrink-0 items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <div className="text-center text-xl font-bold text-neutral-600">
              {logo.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
