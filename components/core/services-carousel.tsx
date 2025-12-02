"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EmblaBase from "./embla-base";
import servicesData from "@/content/services.json";
import {
  fadeUp100,
  overlayIn,
  kontrixStagger,
  withReducedMotion,
  prefersReducedMotion,
} from "@/lib/animations";

interface ServiceSlideProps {
  title: string;
  summary: string;
  image: string;
  slug: string;
  isActive: boolean;
}

/**
 * Individual service slide with Kontrix-style animations
 */
function ServiceSlide({ title, summary, image, slug, isActive }: ServiceSlideProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference on client side only
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (isActive && isInView) {
      setShouldAnimate(true);
    }
  }, [isActive, isInView]);

  return (
    <div
      ref={ref}
      className="relative h-full overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lg hover:border-neutral-300"
    >
      <Link
        href={`/services/${slug}`}
        className="group block h-full"
      >
        {/* Content Section */}
        <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10 lg:p-12">
          {/* Text with stagger animation */}
          <motion.div
            variants={reducedMotion ? undefined : kontrixStagger}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            className="space-y-4 overflow-hidden"
          >
            {/* Small heading */}
            <div className="overflow-hidden">
              <motion.h3
                variants={reducedMotion ? undefined : fadeUp100}
                className="text-sm font-semibold uppercase tracking-wider text-brand"
              >
                Service
              </motion.h3>
            </div>

            {/* Main title */}
            <div className="overflow-hidden">
              <motion.h4
                variants={reducedMotion ? undefined : fadeUp100}
                className="text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl"
              >
                {title}
              </motion.h4>
            </div>

            {/* Description */}
            <div className="overflow-hidden">
              <motion.p
                variants={reducedMotion ? undefined : fadeUp100}
                className="text-base text-neutral-600 md:text-lg max-w-lg"
              >
                {summary}
              </motion.p>
            </div>

            {/* Learn More Link */}
            <div className="overflow-hidden pt-4">
              <motion.span
                variants={reducedMotion ? undefined : fadeUp100}
                className="inline-flex items-center text-sm font-semibold text-brand"
              >
                Learn More
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.span>
            </div>
          </motion.div>

          {/* Image Section */}
          <div className="relative mt-8 md:mt-12">
            <div className="relative w-full max-w-[360px] md:max-w-[360px] lg:max-w-[390px] aspect-[390/451] ml-auto">
              {/* Main Image */}
              <div className="relative h-full overflow-hidden rounded-2xl">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 360px, 390px"
                />
              </div>

              {/* Animated Overlay */}
              <motion.div
                variants={reducedMotion ? undefined : withReducedMotion(overlayIn)}
                initial="hidden"
                animate={shouldAnimate ? "visible" : "hidden"}
                className="absolute inset-0 bg-gradient-to-t from-brand/60 to-transparent rounded-2xl pointer-events-none"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/**
 * Services Carousel with Kontrix-style animations
 * Features: Embla Carousel, Framer Motion, staggered text, overlay effects
 */
export default function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      <EmblaBase
        loop={true}
        align="start"
        showArrows={true}
        showDots={true}
        arrowsPosition="outside"
        className="max-w-7xl mx-auto"
        slideClassName="basis-full md:basis-1/2 lg:basis-1/3 flex-shrink-0"
        onSelect={setActiveIndex}
        aria-label="Services carousel"
      >
        {servicesData.services.map((service, index) => (
          <div key={service.slug} className="h-[600px] md:h-[650px] lg:h-[700px]">
            <ServiceSlide
              title={service.title}
              summary={service.summary}
              image={service.heroImage}
              slug={service.slug}
              isActive={index === activeIndex}
            />
          </div>
        ))}
      </EmblaBase>
    </div>
  );
}

