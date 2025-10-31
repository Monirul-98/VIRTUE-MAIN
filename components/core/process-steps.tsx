"use client";

import { motion } from "framer-motion";
import { FadeY } from "./reveal";
import { Heading, Text } from "@/components/ui/typography";
import { staggerContainer, staggerItem } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "Scope & Drawings",
    description:
      "Review your project requirements and technical drawings. We verify specifications and provide engineering feedback.",
  },
  {
    number: "02",
    title: "Fabrication",
    description:
      "Precision manufacturing using state-of-the-art equipment. CNC cutting, welding, and powder coating all in-house.",
  },
  {
    number: "03",
    title: "QA & Delivery",
    description:
      "Rigorous testing and quality checks before on-time delivery to your site. Full documentation included.",
  },
];

export default function ProcessSteps() {
  return (
    <div>
      <FadeY className="text-center mb-16">
        <Heading level={2} className="mb-4">
          Our Process
        </Heading>
        <Text size="body-lg" className="max-w-2xl mx-auto">
          From concept to delivery, we ensure quality at every step
        </Text>
      </FadeY>

      {/* Process Steps with Connecting Line */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative"
      >
        {/* Connecting Line */}
        <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-brand via-brand to-brand hidden md:block -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/50 to-transparent"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={staggerItem}
              className="relative"
            >
              {/* Step Number Circle */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center text-white font-bold text-xl shadow-soft relative z-10">
                  {step.number}
                </div>
              </div>

              {/* Step Content */}
              <div className="text-center">
                <Heading level={3} className="mb-3 text-xl">
                  {step.title}
                </Heading>
                <Text className="text-neutral-600">{step.description}</Text>
              </div>

              {/* Arrow for mobile */}
              {index < steps.length - 1 && (
                <div className="flex justify-center mt-6 md:hidden">
                  <svg
                    className="w-6 h-6 text-brand"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
