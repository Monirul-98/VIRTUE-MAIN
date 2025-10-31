"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import EmblaCarousel from "./embla-carousel";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem } from "@/lib/animations";

const slides = [
  {
    id: 1,
    eyebrow: "Australian Standard Compliance",
    title: "Custom Switchboard Enclosures",
    subtitle: "Built to Australian Standards",
    description:
      "Precision-engineered MSB and MDB solutions that meet and exceed Australian electrical standards. Quality you can trust.",
    cta1: { text: "View Services", href: "/services" },
    cta2: { text: "Request a Quote", href: "/contact" },
    image: "/images/hero-switchboard.jpg",
  },
  {
    id: 2,
    eyebrow: "Complete In-House Solutions",
    title: "Fabrication & Powder Coating",
    subtitle: "End-to-end in one shop",
    description:
      "From initial fabrication to final powder coating, everything happens under one roof. Streamlined quality control, faster turnaround.",
    cta1: { text: "Our Process", href: "/services" },
    cta2: { text: "Get Started", href: "/contact" },
    image: "/images/hero-fabrication.jpg",
  },
  {
    id: 3,
    eyebrow: "Victoria-Wide Delivery",
    title: "On-time Site Delivery",
    subtitle: "Proven lead times across Victoria",
    description:
      "Reliable scheduling and delivery you can count on. Our track record speaks for itself with 98% on-time delivery across Victoria.",
    cta1: { text: "View Projects", href: "/projects" },
    cta2: { text: "Contact Us", href: "/contact" },
    image: "/images/hero-delivery.jpg",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section
      className="relative bg-neutral-900 text-white overflow-hidden"
      aria-label="Hero carousel"
    >
      <EmblaCarousel
        loop
        align="center"
        autoplay={{ delay: 7000, stopOnInteraction: false }}
        onSelect={setCurrentSlide}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)] py-16">
              {/* Left Content */}
              <Container className="lg:pl-12">
                <AnimatePresence mode="wait">
                  {currentSlide === index && (
                    <motion.div
                      key={`slide-${slide.id}`}
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="max-w-2xl"
                    >
                      {/* Eyebrow */}
                      <motion.div variants={staggerItem}>
                        <Badge variant="brand-light" size="md" className="mb-6">
                          {slide.eyebrow}
                        </Badge>
                      </motion.div>

                      {/* Heading */}
                      <motion.div variants={staggerItem}>
                        <Heading
                          level={1}
                          className="mb-2 text-white text-balance"
                        >
                          {slide.title}
                        </Heading>
                      </motion.div>

                      <motion.div variants={staggerItem}>
                        <p className="text-2xl md:text-3xl font-semibold text-brand mb-6">
                          {slide.subtitle}
                        </p>
                      </motion.div>

                      {/* Description */}
                      <motion.div variants={staggerItem}>
                        <Text
                          size="body-lg"
                          className="mb-8 text-neutral-300 max-w-xl"
                        >
                          {slide.description}
                        </Text>
                      </motion.div>

                      {/* CTAs */}
                      <motion.div
                        variants={staggerItem}
                        className="flex flex-wrap gap-4"
                      >
                        <Link href={slide.cta1.href}>
                          <Button variant="primary" size="lg">
                            {slide.cta1.text}
                          </Button>
                        </Link>
                        <Link href={slide.cta2.href}>
                          <Button variant="white" size="lg">
                            {slide.cta2.text}
                          </Button>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Container>

              {/* Right Image */}
              <div className="hidden lg:block relative px-12">
                <AnimatePresence mode="wait">
                  {currentSlide === index && (
                    <motion.div
                      key={`image-${slide.id}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                      className="relative aspect-[4/3] w-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent rounded-3xl z-10 pointer-events-none" />
                      <Image
                        src={slide.image}
                        alt={`${slide.title} - ${slide.description}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover rounded-3xl shadow-soft-lg"
                        priority={index === 0}
                      />
                      {/* Decorative border */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-brand/20 z-20 pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Gradient overlay for mobile */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/50 to-neutral-900 lg:hidden pointer-events-none" />
          </div>
        ))}
      </EmblaCarousel>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none" />
    </section>
  );
}
