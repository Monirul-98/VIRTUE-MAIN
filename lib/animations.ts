import { type Variants, type Transition } from "framer-motion";

/**
 * Fade in animation variants
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * Slide up animation variants (vertical fade)
 */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Slide down animation variants
 */
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Slide from left animation variants
 */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

/**
 * Slide from right animation variants
 */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

/**
 * Scale animation variants
 */
export const scale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

/**
 * Staggered Children Animation Variants
 * Use on parent container to stagger child animations
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger item variants - use on children within staggerContainer
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

/**
 * Create custom stagger variants with configurable delay
 */
export const createStaggerVariants = (
  staggerDelay: number = 0.15,
  delayChildren: number = 0.1
): Variants => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/**
 * Carousel Slide Animation Variants
 * Use for carousel/slider transitions with enter/exit animations
 */
export const carouselSlideVariants = {
  /**
   * Slide enters from right
   */
  enterFromRight: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  /**
   * Slide enters from left
   */
  enterFromLeft: {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  /**
   * Fade transition (no slide)
   */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  /**
   * Scale transition
   */
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
};

/**
 * Helper function to get carousel variants based on direction
 * @param direction - 'next' or 'prev' to determine slide direction
 * @returns Variants for the active slide animation
 */
export const getCarouselVariants = (direction: "next" | "prev") => {
  return direction === "next"
    ? carouselSlideVariants.enterFromRight
    : carouselSlideVariants.enterFromLeft;
};

/**
 * Carousel transition configuration
 */
export const carouselTransition: Transition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
};

/**
 * Default transition configuration
 */
export const defaultTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.4, 0.25, 1],
};

/**
 * Spring transition configuration
 */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};

/**
 * Smooth transition configuration (for smooth movements)
 */
export const smoothTransition: Transition = {
  duration: 0.8,
  ease: [0.43, 0.13, 0.23, 0.96],
};

/**
 * Quick transition configuration (for instant feedback)
 */
export const quickTransition: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
};

/**
 * Kontrix-style Animation Variants
 * For service slider with staggered text and overlay effects
 */

/**
 * Fade up with 100% Y translation (Kontrix style)
 * For text elements that slide up from below
 */
export const fadeUp100: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

/**
 * Overlay animation (Kontrix style)
 * For image overlays that fade in with slight upward movement
 */
export const overlayIn: Variants = {
  hidden: { opacity: 0, y: "30%" },
  visible: {
    opacity: 0.6,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Stagger container for Kontrix-style text animations
 * 0.08s stagger between children
 */
export const kontrixStagger: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get variants with reduced motion support
 * Returns static variants if user prefers reduced motion
 */
export const withReducedMotion = (variants: Variants): Variants => {
  if (prefersReducedMotion()) {
    return {
      hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
      visible: { opacity: 1, y: 0, x: 0, scale: 1 },
    };
  }
  return variants;
};
