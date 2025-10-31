import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        {
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
        },
        className
      )}
    >
      {subtitle && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-600">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
    </div>
  );
}
