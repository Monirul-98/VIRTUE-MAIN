import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Service {
  slug: string;
  title: string;
  summary: string;
  description?: string;
  icon?: string;
  heroImage?: string;
}

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export default function ServiceCard({ service, className }: ServiceCardProps) {
  const displayText = service.summary || service.description || "";

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group block h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg hover:border-neutral-300",
        className
      )}
    >
      {/* Image */}
      {service.heroImage && (
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        {/* Icon */}
        {service.icon && <div className="mb-4 text-4xl">{service.icon}</div>}

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-neutral-900 transition-colors group-hover:text-brand">
          {service.title}
        </h3>

        {/* Summary/Description */}
        <p className="mb-6 text-neutral-600 line-clamp-3">{displayText}</p>

        {/* Learn More Link */}
        <span className="inline-flex items-center text-sm font-semibold text-brand">
          Learn More
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
