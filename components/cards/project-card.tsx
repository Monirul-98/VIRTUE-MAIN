import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Project {
  slug: string;
  title: string;
  summary: string;
  description?: string;
  category: string;
  client?: string;
  location?: string;
  heroImage: string;
  completedDate?: string;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const displayText = project.summary || project.description || "";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group block h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg hover:border-neutral-300",
        className
      )}
    >
      {/* Hero Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Badge Overlay */}
        <div className="absolute top-4 left-4">
          <Badge variant="brand" size="sm">
            {project.category}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        {/* Client & Location */}
        {(project.client || project.location) && (
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
            {project.client && <span>{project.client}</span>}
            {project.client && project.location && <span>•</span>}
            {project.location && <span>{project.location}</span>}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-neutral-900 transition-colors group-hover:text-brand line-clamp-2">
          {project.title}
        </h3>

        {/* Summary */}
        <p className="mb-4 text-neutral-600 line-clamp-3">{displayText}</p>

        {/* View Project Link */}
        <span className="inline-flex items-center text-sm font-semibold text-brand">
          View Project
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
