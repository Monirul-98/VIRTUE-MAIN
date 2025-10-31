import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/core/section-header";
import Reveal from "@/components/core/reveal";
import StatCounter from "@/components/core/stat-counter";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | Virtue Enclosure Systems",
  description:
    "Learn about Virtue Enclosure Systems - over 25 years of excellence in switchboard manufacturing and electrical enclosure solutions.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="dark" spacing="lg">
        <Container>
          <Reveal>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl text-white">About Us</h1>
            <p className="max-w-3xl text-xl text-gray-300">
              Leading the industry in custom switchboard manufacturing and
              electrical enclosure solutions since 1999.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Story Section */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeader
                title="Our Story"
                subtitle="Built on Excellence"
                align="left"
              />
              <div className="space-y-4 text-gray-600">
                <p>
                  Virtue Enclosure Systems has been at the forefront of
                  electrical enclosure manufacturing for over a decade. Our
                  journey began with a simple mission: to deliver uncompromising
                  quality in every switchboard we produce.
                </p>
                <p>
                  Today, we serve clients across multiple industries, providing
                  custom MSB, MDB, and specialized enclosure solutions that meet
                  the most demanding specifications.
                </p>
                <p>
                  Our state-of-the-art facility combines traditional
                  craftsmanship with modern manufacturing technologies to ensure
                  precision, reliability, and excellence in every project.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="aspect-video rounded-lg bg-gray-200"></div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section background="gray">
        <Container>
          <SectionHeader
            title="Our Values"
            subtitle="What Drives Us"
            align="center"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.1}>
                <div className="rounded-lg bg-white p-8 shadow-sm">
                  <h3 className="mb-3 text-2xl font-bold">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatCounter end={25} suffix="+" label="Years in Business" />
            <StatCounter end={500} suffix="+" label="Projects Delivered" />
            <StatCounter end={50} suffix="+" label="Team Members" />
            <StatCounter end={100} suffix="%" label="Client Satisfaction" />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="dark">
        <Container>
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">Work With Us</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
              Experience the Virtue difference. Let's discuss your next project.
            </p>
            <a href="/contact">
              <Button size="lg" variant="secondary">
                Get in Touch
              </Button>
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}

const values = [
  {
    title: "Quality First",
    description:
      "We never compromise on quality. Every product undergoes rigorous testing to ensure it meets our exacting standards.",
  },
  {
    title: "Innovation",
    description:
      "Continuously investing in new technologies and processes to deliver cutting-edge solutions to our clients.",
  },
  {
    title: "Reliability",
    description:
      "On-time delivery and consistent performance. We build lasting relationships through dependable service.",
  },
];
