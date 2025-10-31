/**
 * Animation Examples
 * Demonstrates the animation system for Virtue Enclosure Systems
 *
 * This file contains working examples - you can copy/paste sections
 * into your actual components.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeY, FadeIn } from "@/components/core/reveal";
import {
  staggerContainer,
  staggerItem,
  getCarouselVariants,
  carouselTransition,
  createStaggerVariants,
} from "@/lib/animations";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Example 1: Basic FadeY Usage
 * Simple reveal animation on scroll
 */
export function BasicFadeYExample() {
  return (
    <section className="py-24">
      <Container>
        <FadeY>
          <Heading level={2} className="mb-4">
            This Heading Fades In From Below
          </Heading>
        </FadeY>

        <FadeY delay={0.2}>
          <Text className="mb-8">
            This paragraph appears 200ms after the heading, creating a smooth
            cascading effect.
          </Text>
        </FadeY>

        <FadeY delay={0.4}>
          <Button>Get Started</Button>
        </FadeY>
      </Container>
    </section>
  );
}

/**
 * Example 2: FadeIn for Images
 * Simple fade without vertical movement
 */
export function ImageFadeExample() {
  return (
    <section className="py-24 bg-neutral-50">
      <Container>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <FadeIn>
            <img
              src="/images/hero.jpg"
              alt="Hero"
              className="rounded-2xl w-full"
            />
          </FadeIn>

          <FadeY delay={0.3}>
            <Badge variant="brand-light" className="mb-4">
              New Technology
            </Badge>
            <Heading level={2} className="mb-4">
              Advanced Manufacturing
            </Heading>
            <Text>
              Our state-of-the-art facilities ensure precision in every project.
            </Text>
          </FadeY>
        </div>
      </Container>
    </section>
  );
}

/**
 * Example 3: Staggered Children
 * Multiple items animating in sequence
 */
export function StaggeredGridExample() {
  const services = [
    { id: 1, title: "MSB Manufacturing", icon: "⚡" },
    { id: 2, title: "MDB Solutions", icon: "🔧" },
    { id: 3, title: "Custom Enclosures", icon: "📦" },
    { id: 4, title: "Powder Coating", icon: "🎨" },
    { id: 5, title: "Assembly", icon: "🔩" },
    { id: 6, title: "Quality Testing", icon: "✓" },
  ];

  return (
    <section className="py-24">
      <Container>
        <FadeY>
          <Heading level={2} className="text-center mb-16">
            Our Services
          </Heading>
        </FadeY>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              className="bg-white rounded-2xl shadow-soft p-8 hover:shadow-soft-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <Heading level={3} className="mb-2">
                {service.title}
              </Heading>
              <Text className="text-sm">
                Excellence in every detail of {service.title.toLowerCase()}.
              </Text>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * Example 4: Custom Stagger Timing
 * Faster animation for many items
 */
export function FastStaggerExample() {
  const stats = [
    { value: "25+", label: "Years Experience" },
    { value: "500+", label: "Projects Completed" },
    { value: "50+", label: "Team Members" },
    { value: "100%", label: "Client Satisfaction" },
  ];

  const fastStagger = createStaggerVariants(0.1, 0);

  return (
    <section className="py-16 bg-neutral-900 text-white">
      <Container>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={fastStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="text-center"
            >
              <Heading level={2} className="text-brand mb-2">
                {stat.value}
              </Heading>
              <Text className="text-neutral-400">{stat.label}</Text>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * Example 5: Image Carousel with Direction
 * Slides transition based on navigation direction
 */
export function CarouselExample() {
  const slides = [
    { id: 1, image: "/images/slide-1.jpg", title: "Modern Facilities" },
    { id: 2, image: "/images/slide-2.jpg", title: "Expert Team" },
    { id: 3, image: "/images/slide-3.jpg", title: "Quality Results" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goNext = () => {
    setDirection("next");
    setCurrentIndex((i) => (i + 1) % slides.length);
  };

  const goPrev = () => {
    setDirection("prev");
    setCurrentIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              {...getCarouselVariants(direction)}
              transition={carouselTransition}
              className="aspect-video relative"
            >
              <img
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent flex items-end p-12">
                <Heading level={2} className="text-white">
                  {slides[currentIndex].title}
                </Heading>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
            <Button
              variant="white"
              size="sm"
              onClick={goPrev}
              className="rounded-full"
            >
              ←
            </Button>
            <Button
              variant="white"
              size="sm"
              onClick={goNext}
              className="rounded-full"
            >
              →
            </Button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? "next" : "prev");
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-brand w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Example 6: Hero Section with Staggered Content
 * Complete hero implementation
 */
export function HeroWithAnimations() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-neutral-50 to-brand-50">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={staggerItem}>
            <Badge variant="brand-light" className="mb-6">
              Industry Leaders Since 1999
            </Badge>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Heading level={1} className="mb-6">
              Excellence in Switchboard Manufacturing
            </Heading>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Text size="body-lg" className="mb-8 max-w-2xl">
              From custom MSB and MDB solutions to precision powder coating,
              Virtue Enclosure Systems delivers unmatched quality in every
              project.
            </Text>
          </motion.div>

          <motion.div variants={staggerItem} className="flex gap-4">
            <Button variant="primary" size="lg">
              Request a Quote
            </Button>
            <Button variant="outline" size="lg">
              View Projects
            </Button>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="mt-12 flex items-center gap-8"
          >
            <div>
              <Heading level={3} className="text-brand">
                25+
              </Heading>
              <Text className="text-sm">Years Experience</Text>
            </div>
            <div>
              <Heading level={3} className="text-brand">
                500+
              </Heading>
              <Text className="text-sm">Projects</Text>
            </div>
            <div>
              <Heading level={3} className="text-brand">
                100%
              </Heading>
              <Text className="text-sm">Satisfaction</Text>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * Example 7: Using asChild Prop
 * Avoids wrapper divs for cleaner HTML
 */
export function AsChildExample() {
  return (
    <FadeY asChild>
      <section className="py-24 bg-neutral-900 text-white">
        <Container>
          <Heading level={2} className="mb-4">
            This section element has animation without a wrapper div
          </Heading>
          <Text className="text-neutral-400">
            Using asChild renders the animation directly on the section element.
          </Text>
        </Container>
      </section>
    </FadeY>
  );
}
