"use client";

import ServiceCard from "@/components/cards/service-card";
import EmblaCarousel from "./embla-carousel";
import servicesData from "@/content/services.json";

export default function ServicesSlider() {
  return (
    <EmblaCarousel loop align="start" autoplay={{ delay: 4000 }}>
      {servicesData.services.map((service) => (
        <div key={service.slug} className="px-4">
          <ServiceCard service={service} />
        </div>
      ))}
    </EmblaCarousel>
  );
}
