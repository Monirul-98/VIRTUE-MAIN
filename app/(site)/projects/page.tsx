import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { FadeY } from "@/components/core/reveal";
import ProjectCard from "@/components/cards/project-card";
import projectsData from "@/content/projects.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Our Projects | Virtue Enclosure Systems",
  description:
    "Explore our portfolio of switchboard and enclosure projects across commercial, industrial, and institutional sectors throughout Victoria.",
};

// Get unique categories
const categories = Array.from(
  new Set(projectsData.projects.map((p) => p.category))
);

export default function ProjectsPage() {
  return (
    <>
      {/* Hero Section */}
      <Section spacing="xl" background="dark">
        <Container>
          <FadeY>
            <Heading level={1} className="mb-6 text-white">
              Our Projects
            </Heading>
          </FadeY>
          <FadeY delay={0.2}>
            <Text size="body-lg" className="max-w-3xl text-neutral-300">
              A showcase of our recent switchboard and enclosure installations
              across Victoria. From data centers to manufacturing facilities,
              see how we deliver excellence.
            </Text>
          </FadeY>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section spacing="lg" background="gray">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <FadeY>
              <div>
                <Heading level={2} className="text-brand mb-2">
                  {projectsData.projects.length}+
                </Heading>
                <Text className="text-neutral-600">Projects Completed</Text>
              </div>
            </FadeY>
            <FadeY delay={0.1}>
              <div>
                <Heading level={2} className="text-brand mb-2">
                  100%
                </Heading>
                <Text className="text-neutral-600">Client Satisfaction</Text>
              </div>
            </FadeY>
            <FadeY delay={0.2}>
              <div>
                <Heading level={2} className="text-brand mb-2">
                  98%
                </Heading>
                <Text className="text-neutral-600">On-Time Delivery</Text>
              </div>
            </FadeY>
            <FadeY delay={0.3}>
              <div>
                <Heading level={2} className="text-brand mb-2">
                  10+
                </Heading>
                <Text className="text-neutral-600">Years Experience</Text>
              </div>
            </FadeY>
          </div>
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section spacing="lg">
        <Container>
          <FadeY className="text-center mb-12">
            <Heading level={2} className="mb-4">
              Featured Projects
            </Heading>
            <Text size="body-lg" className="max-w-2xl mx-auto mb-8">
              Real-world solutions for challenging electrical infrastructure
              requirements
            </Text>

            {/* Category Filter (visual only for now) */}
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="brand">All Projects</Badge>
              {categories.map((category) => (
                <Badge key={category} variant="outline-brand">
                  {category}
                </Badge>
              ))}
            </div>
          </FadeY>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {projectsData.projects.map((project, index) => (
              <FadeY key={project.slug} delay={index * 0.1}>
                <ProjectCard project={project} />
              </FadeY>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" background="dark">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <FadeY>
              <Heading level={2} className="mb-6 text-white">
                Ready to Start Your Project?
              </Heading>
            </FadeY>
            <FadeY delay={0.2}>
              <Text size="body-lg" className="mb-8 text-neutral-300">
                Whether you need a simple distribution board or a complex MSB
                installation, we're here to help bring your project to life.
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
                    Our Services
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
