"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

interface EmblaCarouselProps {
  children: React.ReactNode[];
  loop?: boolean;
  align?: "start" | "center" | "end";
  autoplay?: boolean | { delay?: number; stopOnInteraction?: boolean };
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  onSelect?: (index: number) => void;
}

export default function EmblaCarousel({
  children,
  loop = true,
  align = "center",
  autoplay = false,
  showDots = true,
  showArrows = true,
  className,
  onSelect,
}: EmblaCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Configure options
  const options: EmblaOptionsType = {
    loop,
    align,
  };

  // Configure autoplay plugin
  const plugins = [];
  if (autoplay) {
    const autoplayOptions =
      typeof autoplay === "object"
        ? autoplay
        : { delay: 5000, stopOnInteraction: true };
    plugins.push(Autoplay(autoplayOptions));
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    onSelect?.(index);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    handleSelect();
    emblaApi.on("select", handleSelect);
    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi, handleSelect]);

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex" role="list">
          {children.map((child, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_100%]"
              role="listitem"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${children.length}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-soft transition-all hover:scale-110 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
            type="button"
          >
            <svg
              className="h-6 w-6 text-neutral-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-soft transition-all hover:scale-110 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
            type="button"
          >
            <svg
              className="h-6 w-6 text-neutral-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {showDots && (
        <div
          className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10"
          role="group"
          aria-label="Carousel navigation dots"
        >
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              type="button"
              className={cn(
                "h-2 rounded-full transition-all",
                index === selectedIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1} of ${children.length}`}
              aria-current={index === selectedIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
