"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./section-header";
import Reveal from "./reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What types of switchboards do you manufacture?",
    answer:
      "We manufacture a wide range of switchboards including Main Switchboards (MSB), Main Distribution Boards (MDB), and custom electrical enclosures tailored to your specific requirements.",
  },
  {
    question: "What is your typical lead time?",
    answer:
      "Lead times vary depending on project complexity and current workload. Standard projects typically take 4-6 weeks from design approval to delivery. We can accommodate rush orders when needed.",
  },
  {
    question: "Do you provide installation services?",
    answer:
      "While we focus on manufacturing, we work closely with certified electricians and can recommend trusted installation partners. We also provide technical support during installation.",
  },
  {
    question: "What quality standards do you follow?",
    answer:
      "All our products are manufactured to meet Australian Standards (AS/NZS) and undergo rigorous quality testing. We maintain comprehensive quality assurance processes throughout production.",
  },
  {
    question: "Can you handle custom designs?",
    answer:
      "Absolutely! Custom design is our specialty. Our engineering team works with you to create solutions that meet your exact specifications and requirements.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Got Questions?"
        align="center"
      />
      <div className="mx-auto max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <Reveal key={index} delay={index * 0.05}>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
              >
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>
                <svg
                  className={cn(
                    "h-5 w-5 flex-shrink-0 text-gray-500 transition-transform",
                    openIndex === index && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-200 px-6 py-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
