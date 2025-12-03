import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { FadeY } from "@/components/core/reveal";
import ServiceCard from "@/components/cards/service-card";
import servicesData from "@/content/services.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Our Services | Virtue Enclosure Systems",
  description:
    "Comprehensive switchboard manufacturing services including design & drafting, fabrication, powder coating, assembly, testing, and delivery across Victoria.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Section spacing="xl" background="dark">
        <Container>
          <FadeY>
            <Heading level={1} className="mb-6 text-white">
              Our Services
            </Heading>
          </FadeY>
          <FadeY delay={0.2}>
            <Text size="body-lg" className="max-w-3xl text-white">
              End-to-end switchboard manufacturing and enclosure solutions. From
              CAD design to on-site delivery, everything under one roof.
            </Text>
          </FadeY>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section spacing="lg">
        <Container>
          <FadeY className="text-center mb-16">
            <Heading level={2} className="mb-4">
              Complete Manufacturing Solutions
            </Heading>
            <Text size="body-lg" className="max-w-2xl mx-auto">
              Six core services working together to deliver exceptional results
            </Text>
          </FadeY>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.services.map((service, index) => (
              <FadeY key={service.slug} delay={index * 0.1}>
                <ServiceCard service={service} />
              </FadeY>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process Overview */}
      <Section spacing="lg" background="gray">
        <Container>
          <FadeY className="text-center mb-16">
            <Heading level={2} className="mb-4">
              Our Process
            </Heading>
            <Text size="body-lg" className="max-w-2xl mx-auto">
              From initial consultation to final delivery, we handle every step
            </Text>
          </FadeY>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <FadeY key={step.title} delay={index * 0.15}>
                <div className="text-center">
                  <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand text-2xl font-bold text-white shadow-soft">
                    {index + 1}
                  </div>
                  <Heading level={3} className="mb-3 text-xl">
                    {step.title}
                  </Heading>
                  <Text className="text-neutral-600">{step.description}</Text>
                </div>
              </FadeY>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="lg">
        <Container>
          <div className="bg-brand-50 rounded-3xl p-12 text-center">
            <FadeY>
              <Heading level={2} className="mb-4">
                Ready to Start Your Project?
              </Heading>
            </FadeY>
            <FadeY delay={0.2}>
              <Text size="body-lg" className="mb-8 max-w-2xl mx-auto">
                Get in touch with our team to discuss your switchboard and
                enclosure requirements. We're here to help.
              </Text>
            </FadeY>
            <FadeY delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Request a Quote
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline" size="lg">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </FadeY>
          </div>
        </Container>
      </Section>
    </>
  );
}

const processSteps = [
  {
    title: "Consultation",
    description:
      "Understanding your requirements, reviewing drawings, and providing expert advice",
  },
  {
    title: "Engineering",
    description: "CAD design, technical drawings, and compliance verification",
  },
  {
    title: "Manufacturing",
    description:
      "In-house fabrication, powder coating, and assembly by qualified electricians",
  },
  {
    title: "Delivery",
    description:
      "Comprehensive testing, documentation, and on-time site delivery",
  },
];
