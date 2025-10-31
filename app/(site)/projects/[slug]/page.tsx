import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { FadeY } from "@/components/core/reveal";
import projectsData from "@/content/projects.json";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Project {
  slug: string;
  title: string;
  summary: string;
  category: string;
  client?: string;
  location?: string;
  completedDate?: string;
  heroImage: string;
  overview: string;
  challenge?: string;
  solution?: string;
  specs: { label: string; value: string }[];
  features?: string[];
  gallery: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

// Generate static params for all project slugs
export async function generateStaticParams() {
  return projectsData.projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = projectsData.projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Virtue Enclosure Systems`,
    description: project.summary,
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projectsData.projects.find((p) => p.slug === params.slug) as
    | Project
    | undefined;

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <Section spacing="xl" background="dark">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              {/* Category & Meta Info */}
              <FadeY>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="brand">{project.category}</Badge>
                  {project.completedDate && (
                    <Text size="small" className="text-neutral-400">
                      Completed:{" "}
                      {new Date(project.completedDate).toLocaleDateString(
                        "en-AU",
                        { month: "long", year: "numeric" }
                      )}
                    </Text>
                  )}
                </div>
              </FadeY>

              {/* Title */}
              <FadeY delay={0.1}>
                <Heading level={1} className="mb-6 text-white">
                  {project.title}
                </Heading>
              </FadeY>

              {/* Client & Location */}
              {(project.client || project.location) && (
                <FadeY delay={0.2}>
                  <div className="mb-6 flex flex-col gap-2 text-neutral-300">
                    {project.client && (
                      <div className="flex items-center gap-2">
                        <span className="text-brand font-semibold">
                          Client:
                        </span>
                        <span>{project.client}</span>
                      </div>
                    )}
                    {project.location && (
                      <div className="flex items-center gap-2">
                        <span className="text-brand font-semibold">
                          Location:
                        </span>
                        <span>{project.location}</span>
                      </div>
                    )}
                  </div>
                </FadeY>
              )}

              {/* Summary */}
              <FadeY delay={0.3}>
                <Text size="body-lg" className="text-neutral-300">
                  {project.summary}
                </Text>
              </FadeY>

              {/* CTA */}
              <FadeY delay={0.4} className="mt-8">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Start Your Project
                  </Button>
                </Link>
              </FadeY>
            </div>

            {/* Hero Image */}
            <FadeY delay={0.5} className="order-1 md:order-2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-soft-lg">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </FadeY>
          </div>
        </Container>
      </Section>

      {/* Overview Section */}
      <Section spacing="lg">
        <Container>
          <FadeY className="mb-8 text-center">
            <Heading level={2} className="mb-4">
              Project Overview
            </Heading>
          </FadeY>
          <FadeY delay={0.2}>
            <Text size="body-lg" className="max-w-4xl mx-auto text-center">
              {project.overview}
            </Text>
          </FadeY>
        </Container>
      </Section>

      {/* Challenge & Solution (if available) */}
      {(project.challenge || project.solution) && (
        <Section spacing="lg" background="gray">
          <Container>
            <div className="grid md:grid-cols-2 gap-12">
              {project.challenge && (
                <FadeY>
                  <div>
                    <Heading level={3} className="mb-4 text-xl">
                      The Challenge
                    </Heading>
                    <Text className="text-neutral-700">
                      {project.challenge}
                    </Text>
                  </div>
                </FadeY>
              )}
              {project.solution && (
                <FadeY delay={0.2}>
                  <div>
                    <Heading level={3} className="mb-4 text-xl">
                      Our Solution
                    </Heading>
                    <Text className="text-neutral-700">{project.solution}</Text>
                  </div>
                </FadeY>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* Specifications */}
      <Section spacing="lg">
        <Container>
          <FadeY className="mb-12 text-center">
            <Heading level={2} className="mb-4">
              Technical Specifications
            </Heading>
          </FadeY>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {project.specs.map((spec, index) => (
              <FadeY key={index} delay={0.1 + index * 0.05} asChild>
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <Text
                    size="small"
                    className="text-neutral-500 mb-2 uppercase font-semibold"
                  >
                    {spec.label}
                  </Text>
                  <Text className="font-bold text-neutral-900">
                    {spec.value}
                  </Text>
                </div>
              </FadeY>
            ))}
          </div>
        </Container>
      </Section>

      {/* Key Features (if available) */}
      {project.features && project.features.length > 0 && (
        <Section spacing="lg" background="gray">
          <Container>
            <FadeY className="mb-12 text-center">
              <Heading level={2} className="mb-4">
                Key Features
              </Heading>
            </FadeY>

            <ul className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {project.features.map((feature, index) => (
                <FadeY key={index} delay={0.1 + index * 0.05} asChild>
                  <li className="flex items-start gap-3">
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
                    <Text className="text-neutral-700">{feature}</Text>
                  </li>
                </FadeY>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Gallery */}
      <Section spacing="lg">
        <Container>
          <FadeY className="mb-12 text-center">
            <Heading level={2} className="mb-4">
              Project Gallery
            </Heading>
          </FadeY>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <FadeY key={index} delay={0.1 + index * 0.1} asChild>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft group cursor-pointer">
                  <Image
                    src={image}
                    alt={`${project.title} gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </FadeY>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonial (if available) */}
      {project.testimonial && (
        <Section spacing="lg" background="dark">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <FadeY>
                <svg
                  className="w-12 h-12 text-brand mx-auto mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </FadeY>
              <FadeY delay={0.2}>
                <Text size="body-lg" className="mb-8 text-neutral-300 italic">
                  "{project.testimonial.quote}"
                </Text>
              </FadeY>
              <FadeY delay={0.4}>
                <div className="text-white">
                  <Text className="font-bold">
                    {project.testimonial.author}
                  </Text>
                  <Text size="small" className="text-neutral-400">
                    {project.testimonial.position}
                  </Text>
                </div>
              </FadeY>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      <Section spacing="lg">
        <Container>
          <div className="bg-brand-50 rounded-3xl p-12 text-center">
            <FadeY>
              <Heading level={2} className="mb-4">
                Have a Similar Project in Mind?
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
                    View More Projects
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
