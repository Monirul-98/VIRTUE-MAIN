"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
      <Container>
        <nav
          className="flex items-center justify-between py-4"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-neutral-900 hover:text-brand transition-colors"
            aria-label="Virtue Enclosure Systems homepage"
          >
            VES
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 md:flex" role="menubar">
            {navigation.map((item) => (
              <li key={item.name} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  className={cn(
                    "nav-link text-sm font-medium hover:text-brand",
                    pathname === item.href
                      ? "active text-neutral-900"
                      : "text-neutral-600"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Request a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">
              {mobileMenuOpen ? "Close menu" : "Open menu"}
            </span>
            <div className="space-y-1.5" aria-hidden="true">
              <span
                className={cn(
                  "block h-0.5 w-6 bg-neutral-900 transition-all duration-300",
                  mobileMenuOpen && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-neutral-900 transition-all duration-300",
                  mobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-neutral-900 transition-all duration-300",
                  mobileMenuOpen && "-translate-y-2 -rotate-45"
                )}
              />
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={cn(
            "overflow-hidden transition-all duration-300 md:hidden",
            mobileMenuOpen ? "max-h-96 border-t border-neutral-200" : "max-h-0"
          )}
          aria-hidden={!mobileMenuOpen}
        >
          <nav
            className="flex flex-col gap-4 py-4"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "nav-link-mobile text-base font-medium hover:text-brand",
                  pathname === item.href
                    ? "active text-neutral-900"
                    : "text-neutral-600"
                )}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="sm" className="mt-2" fullWidth>
                Request a Quote
              </Button>
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
