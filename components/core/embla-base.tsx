"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";
import { cn } from "@/lib/utils";

interface EmblaBaseProps {
  children: React.ReactNode[];
  loop?: boolean;
  align?: "start" | "center" | "end";
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  slideClassName?: string;
  arrowsPosition?: "inside" | "outside";
  onSelect?: (index: number) => void;
  "aria-label"?: string;
}

/**
 * Generic Embla Carousel wrapper with arrows and dots
 * Supports keyboard navigation and ARIA accessibility
 */
export default function EmblaBase({
  children,
  loop = true,
  align = "center",
  showDots = true,
  showArrows = true,
  className,
  slideClassName,
  arrowsPosition = "outside",
  onSelect,
  "aria-label": ariaLabel = "Carousel",
}: EmblaBaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Configure options
  const options: EmblaOptionsType = {
    loop,
    align,
    containScroll: "trimSnaps",
    dragFree: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

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

  const updateButtonState = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    updateButtonState();
    onSelect?.(index);
  }, [emblaApi, onSelect, updateButtonState]);

  useEffect(() => {
    if (!emblaApi) return;
    handleSelect();
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);
    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi, handleSelect]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  const isOutside = arrowsPosition === "outside";

  return (
    <div
      className={cn("relative", isOutside && "px-16", className)}
      onKeyDown={handleKeyDown}
    >
      <div
        className="relative"
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
      >
        {/* Carousel viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4" role="list">
            {children.map((child, index) => (
              <div
                key={index}
                className={cn(
                  "min-w-0 flex-[0_0_100%] pl-4",
                  slideClassName
                )}
                role="listitem"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${children.length}`}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {showArrows && (
          <>
            <button
              onClick={scrollPrev}
              disabled={!loop && !canScrollPrev}
              className={cn(
                "absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md transition-all hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
                isOutside ? "-left-16" : "left-4"
              )}
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
              disabled={!loop && !canScrollNext}
              className={cn(
                "absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md transition-all hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
                isOutside ? "-right-16" : "right-4"
              )}
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
      </div>

      {/* Dots Navigation */}
      {showDots && (
        <div
          className="flex justify-center gap-2 mt-8"
          role="group"
          aria-label="Carousel navigation"
        >
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              type="button"
              className={cn(
                "h-2 rounded-full transition-all",
                index === selectedIndex
                  ? "w-8 bg-brand"
                  : "w-2 bg-neutral-300 hover:bg-neutral-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

