import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  spacing?: "default" | "sm" | "lg" | "xl" | "none";
  background?: "default" | "gray" | "brand" | "dark";
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  spacing = "default",
  background = "default",
  ...props
}) => {
  const spacingClasses = {
    none: "",
    sm: "py-12 md:py-16",
    default: "py-16 md:py-24 lg:py-32",
    lg: "py-20 md:py-28 lg:py-40",
    xl: "py-24 md:py-32 lg:py-48",
  };

  const backgroundClasses = {
    default: "bg-white",
    gray: "bg-gray-50",
    brand: "bg-brand-50",
    dark: "bg-gray-900 text-white",
  };

  return (
    <section
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
