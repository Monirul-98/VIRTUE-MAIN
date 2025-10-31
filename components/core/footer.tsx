"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription backend
    setSubscribeStatus("success");
    setEmail("");
    setTimeout(() => setSubscribeStatus("idle"), 3000);
  };

  return (
    <footer className="bg-neutral-900 text-white" role="contentinfo">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-3 lg:gap-16">
          {/* Company Info */}
          <section aria-labelledby="footer-company">
            <h3 id="footer-company" className="mb-4 text-2xl font-bold">
              VES
            </h3>
            <Text className="text-neutral-400 mb-6">
              Virtue Enclosure Systems delivers excellence in switchboard
              manufacturing. From custom MSB and MDB solutions to precision
              powder coating, we ensure quality at every step.
            </Text>
            <address className="space-y-2 not-italic">
              <a
                href="tel:+61397945555"
                className="block text-sm text-neutral-400 hover:text-brand transition-colors"
                aria-label="Call us at +61 3 9794 5555"
              >
                +61 3 9794 5555
              </a>
              <a
                href="mailto:info@virtueenclosures.com.au"
                className="block text-sm text-neutral-400 hover:text-brand transition-colors"
                aria-label="Email us at info@virtueenclosures.com.au"
              >
                info@virtueenclosures.com.au
              </a>
            </address>
          </section>

          {/* Quick Links */}
          <nav aria-labelledby="footer-links">
            <h4 id="footer-links" className="mb-6 text-lg font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-brand"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter Form */}
          <section aria-labelledby="footer-newsletter">
            <h4 id="footer-newsletter" className="mb-6 text-lg font-semibold">
              Stay Updated
            </h4>
            <Text className="text-neutral-400 mb-4">
              Subscribe to our newsletter for the latest updates, industry
              insights, and company news.
            </Text>
            <form
              onSubmit={handleSubscribe}
              className="space-y-3"
              aria-label="Newsletter subscription"
            >
              <div>
                <label htmlFor="email-subscribe" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-subscribe"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-required="true"
                  className="w-full px-4 py-3 rounded-full bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                disabled={subscribeStatus === "success"}
              >
                {subscribeStatus === "success" ? "Subscribed! ✓" : "Subscribe"}
              </Button>
              {subscribeStatus === "success" && (
                <p
                  className="text-sm text-brand"
                  role="status"
                  aria-live="polite"
                >
                  Thank you for subscribing!
                </p>
              )}
            </form>
          </section>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Text className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} Virtue Enclosure Systems. All
              rights reserved.
            </Text>
            <nav aria-label="Legal">
              <ul className="flex gap-6">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-neutral-500 hover:text-brand transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-neutral-500 hover:text-brand transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}
