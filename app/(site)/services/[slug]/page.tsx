import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeY } from "@/components/core/reveal";
import servicesData from "@/content/services.json";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all services
export async function generateStaticParams() {
  return servicesData.services.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for each service
export async function generateMetadata({ params }: ServicePageProps) {
  const service = servicesData.services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: "Service Not Found | Virtue Enclosure Systems",
    };
  }

  return {
    title: `${service.title} | Virtue Enclosure Systems`,
    description: service.summary,
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = servicesData.services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <Section spacing="none" className="relative overflow-hidden">
        <div className="relative aspect-[21/9] md:aspect-[21/7] bg-neutral-900">
          {service.heroImage && (
            <>
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover opacity-40"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 to-neutral-900/40" />
            </>
          )}

          <div className="absolute inset-0 flex items-center">
            <Container>
              <FadeY>
                <div className="max-w-3xl">
                  {service.icon && (
                    <div className="text-6xl mb-6">{service.icon}</div>
                  )}
                  <Heading level={1} className="mb-6 text-white">
                    {service.title}
                  </Heading>
                  <Text size="body-lg" className="text-neutral-200">
                    {service.summary}
                  </Text>
                </div>
              </FadeY>
            </Container>
          </div>
        </div>
      </Section>

      {/* Overview Section */}
      <Section spacing="lg">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <FadeY>
                <Heading level={2} className="mb-6">
                  Overview
                </Heading>
                <Text size="body-lg" className="mb-8">
                  {service.overview}
                </Text>
              </FadeY>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <FadeY delay={0.2}>
                  <Heading level={3} className="mb-6 text-2xl">
                    Key Features
                  </Heading>
                  <div className="grid md:grid-cols-2 gap-4 mb-12">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-brand flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <Text>{feature}</Text>
                      </div>
                    ))}
                  </div>
                </FadeY>
              )}

              {/* Process */}
              {service.process && service.process.length > 0 && (
                <FadeY delay={0.3}>
                  <Heading level={3} className="mb-6 text-2xl">
                    Our Process
                  </Heading>
                  <div className="space-y-4 mb-12">
                    {service.process.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <Text className="flex-1">{step}</Text>
                      </div>
                    ))}
                  </div>
                </FadeY>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <FadeY delay={0.4}>
                  <Heading level={3} className="mb-6 text-2xl">
                    Benefits
                  </Heading>
                  <div className="grid gap-4 mb-12">
                    {service.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 border-l-4 border-brand bg-brand-50"
                      >
                        <Text className="font-medium">{benefit}</Text>
                      </div>
                    ))}
                  </div>
                </FadeY>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* CTA Card */}
                <FadeY delay={0.2}>
                  <div className="bg-neutral-900 text-white rounded-2xl p-8">
                    <Heading level={3} className="mb-4 text-white text-xl">
                      Get Started
                    </Heading>
                    <Text className="text-neutral-300 mb-6">
                      Ready to discuss your {service.title.toLowerCase()} needs?
                      Contact us today.
                    </Text>
                    <Link href="/contact">
                      <Button variant="primary" size="md" fullWidth>
                        Request a Quote
                      </Button>
                    </Link>
                  </div>
                </FadeY>

                {/* Quick Info */}
                {(service.certifications ||
                  service.standards ||
                  service.deliverables) && (
                  <FadeY delay={0.3}>
                    <div className="bg-neutral-50 rounded-2xl p-6 space-y-6">
                      {service.certifications && (
                        <div>
                          <Heading
                            level={4}
                            className="mb-3 text-sm font-semibold uppercase text-neutral-500"
                          >
                            Certifications
                          </Heading>
                          <div className="flex flex-wrap gap-2">
                            {service.certifications.map((cert, index) => (
                              <Badge
                                key={index}
                                variant="brand-light"
                                size="sm"
                              >
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {service.standards && (
                        <div>
                          <Heading
                            level={4}
                            className="mb-3 text-sm font-semibold uppercase text-neutral-500"
                          >
                            Standards
                          </Heading>
                          <div className="space-y-2">
                            {service.standards.map((standard, index) => (
                              <Text key={index} className="text-sm">
                                • {standard}
                              </Text>
                            ))}
                          </div>
                        </div>
                      )}

                      {service.deliverables && (
                        <div>
                          <Heading
                            level={4}
                            className="mb-3 text-sm font-semibold uppercase text-neutral-500"
                          >
                            Deliverables
                          </Heading>
                          <div className="space-y-2">
                            {service.deliverables.map((item, index) => (
                              <Text key={index} className="text-sm">
                                • {item}
                              </Text>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </FadeY>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Gallery Strip */}
      {service.gallery && service.gallery.length > 0 && (
        <Section spacing="lg" background="gray">
          <Container>
            <FadeY>
              <Heading level={2} className="mb-12 text-center">
                Gallery
              </Heading>
            </FadeY>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {service.gallery.map((image, index) => (
                <FadeY key={index} delay={index * 0.1}>
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100 group">
                    <Image
                      src={image}
                      alt={`${service.title} ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </FadeY>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Additional Info Sections */}
      {(service.equipment ||
        service.materials ||
        service.capabilities ||
        service.testTypes ||
        service.ipRatings ||
        service.serviceArea ||
        service.deliveryOptions ||
        service.commissioningServices) && (
        <Section spacing="lg">
          <Container>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Equipment */}
              {service.equipment && (
                <FadeY>
                  <div className="bg-white rounded-2xl p-8 shadow-soft">
                    <Heading level={3} className="mb-6 text-xl">
                      Equipment & Capabilities
                    </Heading>
                    <ul className="space-y-3">
                      {service.equipment.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-brand">•</span>
                          <Text className="text-sm">{item}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeY>
              )}

              {/* Materials */}
              {service.materials && (
                <FadeY delay={0.1}>
                  <div className="bg-white rounded-2xl p-8 shadow-soft">
                    <Heading level={3} className="mb-6 text-xl">
                      Materials We Work With
                    </Heading>
                    <div className="flex flex-wrap gap-3">
                      {service.materials.map((material, index) => (
                        <Badge key={index} variant="brand-light">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FadeY>
              )}

              {/* Capabilities */}
              {service.capabilities && (
                <FadeY>
                  <div className="bg-white rounded-2xl p-8 shadow-soft">
                    <Heading level={3} className="mb-6 text-xl">
                      Our Capabilities
                    </Heading>
                    <ul className="space-y-3">
                      {service.capabilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-brand">•</span>
                          <Text className="text-sm">{item}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeY>
              )}

              {/* Test Types */}
              {service.testTypes && (
                <FadeY delay={0.1}>
                  <div className="bg-white rounded-2xl p-8 shadow-soft">
                    <Heading level={3} className="mb-6 text-xl">
                      Test Types
                    </Heading>
                    <ul className="space-y-3">
                      {service.testTypes.map((item, index) => (
                        <li key={index}>
                          <Text className="text-sm">{item}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeY>
              )}

              {/* IP Ratings */}
              {service.ipRatings && (
                <FadeY>
                  <div className="bg-white rounded-2xl p-8 shadow-soft">
                    <Heading level={3} className="mb-6 text-xl">
                      IP Ratings Available
                    </Heading>
                    <ul className="space-y-3">
                      {service.ipRatings.map((item, index) => (
                        <li key={index}>
                          <Text className="text-sm font-medium">{item}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeY>
              )}

              {/* Service Area */}
              {service.serviceArea && (
                <FadeY delay={0.1}>
                  <div className="bg-white rounded-2xl p-8 shadow-soft">
                    <Heading level={3} className="mb-6 text-xl">
                      Service Area
                    </Heading>
                    <ul className="space-y-2">
                      {service.serviceArea.map((area, index) => (
                        <li key={index}>
                          <Text className="text-sm">• {area}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeY>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      <Section spacing="xl" background="dark">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <FadeY>
              <Heading level={2} className="mb-6 text-white">
                Ready to Get Started?
              </Heading>
            </FadeY>
            <FadeY delay={0.2}>
              <Text size="body-lg" className="mb-8 text-neutral-300">
                Contact us today to discuss your {service.title.toLowerCase()}{" "}
                requirements and receive a detailed quote.
              </Text>
            </FadeY>
            <FadeY delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Request a Quote
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="white" size="lg">
                    View All Services
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
