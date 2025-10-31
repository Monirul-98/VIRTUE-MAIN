"use client";

import TestimonialCard from "@/components/cards/testimonial-card";
import EmblaCarousel from "./embla-carousel";
import testimonialsData from "@/content/testimonials.json";

export default function Testimonials() {
  return (
    <EmblaCarousel loop autoplay={{ delay: 6000 }}>
      {testimonialsData.testimonials.map((testimonial) => (
        <div key={testimonial.id} className="px-4 md:px-8">
          <TestimonialCard testimonial={testimonial} />
        </div>
      ))}
    </EmblaCarousel>
  );
}
