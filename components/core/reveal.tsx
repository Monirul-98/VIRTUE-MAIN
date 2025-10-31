"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  asChild?: boolean;
}

/**
 * FadeY - Animates children with vertical fade (translateY) effect
 * Defaults: opacity 0 → 1, translateY 24px → 0 in 0.6s
 * Viewport: triggers once, with -100px margin
 */
export function FadeY({
  children,
  delay = 0,
  duration = 0.6,
  className,
  asChild = false,
}: RevealProps) {
  const fadeYVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  const Component = asChild ? Slot : motion.div;
  const MotionComponent = asChild ? motion(Slot) : motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeYVariants}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * FadeIn - Animates children with fade effect (no translation)
 * Defaults: opacity 0 → 1 in 0.6s
 * Viewport: triggers once, with -100px margin
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className,
  asChild = false,
}: RevealProps) {
  const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const MotionComponent = asChild ? motion(Slot) : motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInVariants}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * Legacy Reveal component for backward compatibility
 * Use FadeY for new implementations
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: Omit<RevealProps, "asChild">) {
  return (
    <FadeY delay={delay} duration={duration} className={className}>
      {children}
    </FadeY>
  );
}
