import HeroCarousel from "@/components/core/hero-carousel";
import StatCounter from "@/components/core/stat-counter";
import ServicesCarousel from "@/components/core/services-carousel";
import ProcessSteps from "@/components/core/process-steps";
import LogoMarquee from "@/components/core/logo-marquee";
import Testimonials from "@/components/core/testimonials";
import BlogCards from "@/components/core/blog-cards";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { FadeY } from "@/components/core/reveal";

export default function HomePage() {
  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats Section */}
      <Section spacing="lg" background="gray">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatCounter end={450} suffix="+" label="Projects Delivered" />
            <StatCounter end={14} label="Avg Lead Time (days)" />
            <StatCounter end={98} suffix="%" label="On-time Delivery" />
            <StatCounter end={25} suffix="+" label="Years in Business" />
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section spacing="lg">
        <Container>
          <FadeY className="text-center mb-16">
            <Heading level={2} className="mb-4">
              Our Services
            </Heading>
            <Text size="body-lg" className="max-w-2xl mx-auto">
              Comprehensive switchboard and enclosure solutions from design to
              delivery
            </Text>
          </FadeY>
        </Container>
        <ServicesCarousel />
      </Section>

      {/* Process Steps */}
      <Section spacing="lg" background="gray">
        <Container>
          <ProcessSteps />
        </Container>
      </Section>

      {/* Logo Marquee */}
      <Section spacing="lg">
        <Container>
          <FadeY className="text-center mb-12">
            <Heading level={2} className="mb-4">
              Trusted By Industry Leaders
            </Heading>
            <Text size="body-lg" className="max-w-2xl mx-auto">
              We partner with the world's leading electrical component
              manufacturers
            </Text>
          </FadeY>
          <LogoMarquee />
        </Container>
      </Section>

      {/* Testimonials */}
      <Section spacing="lg" background="gray">
        <Container>
          <FadeY className="text-center mb-16">
            <Heading level={2} className="mb-4">
              What Our Clients Say
            </Heading>
            <Text size="body-lg" className="max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </Text>
          </FadeY>
          <Testimonials />
        </Container>
      </Section>

      {/* Blog Section */}
      <Section spacing="lg">
        <Container>
          <FadeY className="text-center mb-16">
            <Heading level={2} className="mb-4">
              Latest Insights
            </Heading>
            <Text size="body-lg" className="max-w-2xl mx-auto">
              Industry news, technical guides, and company updates
            </Text>
          </FadeY>
          <BlogCards />
        </Container>
      </Section>

      {/* Big CTA Section */}
      <Section spacing="xl" background="dark">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <FadeY>
              <Heading level={2} className="mb-6 text-white">
                Request a Quote
              </Heading>
            </FadeY>

            <FadeY delay={0.2}>
              <Text size="body-lg" className="mb-12 text-neutral-300">
                Upload your technical drawings (DWG/DXF) and we'll provide a
                detailed quote within 24 hours. Or contact us to discuss your
                project requirements.
              </Text>
            </FadeY>

            <FadeY delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a href="/contact">
                  <Button variant="primary" size="xl">
                    Request a Quote
                  </Button>
                </a>
                <a href="/contact">
                  <Button variant="white" size="xl">
                    Upload Drawings (DWG/DXF)
                  </Button>
                </a>
              </div>
            </FadeY>

            <FadeY delay={0.6}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-neutral-800">
                <div>
                  <div className="text-4xl mb-3">📞</div>
                  <Text className="text-neutral-400 text-sm mb-1">Call Us</Text>
                  <a
                    href="tel:+61397945555"
                    className="text-white hover:text-brand transition-colors font-semibold"
                  >
                    +61 3 9794 5555
                  </a>
                </div>
                <div>
                  <div className="text-4xl mb-3">✉️</div>
                  <Text className="text-neutral-400 text-sm mb-1">
                    Email Us
                  </Text>
                  <a
                    href="mailto:info@virtueenclosures.com.au"
                    className="text-white hover:text-brand transition-colors font-semibold"
                  >
                    info@virtueenclosures.com.au
                  </a>
                </div>
                <div>
                  <div className="text-4xl mb-3">⏱️</div>
                  <Text className="text-neutral-400 text-sm mb-1">
                    Response Time
                  </Text>
                  <p className="text-white font-semibold">Within 24 Hours</p>
                </div>
              </div>
            </FadeY>
          </div>
        </Container>
      </Section>
    </>
  );
}
