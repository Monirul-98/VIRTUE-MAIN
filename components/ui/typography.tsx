import React from "react";
import { cn } from "@/lib/utils";

/**
 * Base polymorphic Typography component
 */
type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
  children?: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

function Typography<T extends React.ElementType = "h2">({
  as,
  children,
  className,
  ...props
}: PolymorphicProps<T>) {
  const Tag = (as ?? "h2") as React.ElementType;

  return (
    <Tag
      className={className}
      {...(props as React.ComponentPropsWithoutRef<React.ElementType>)}
    >
      {children}
    </Tag>
  );
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level: HeadingLevel;
  children?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function Heading({
  level,
  as,
  children,
  className = "",
  ...props
}: HeadingProps) {
  const headingClasses: Record<HeadingLevel, string> = {
    1: "text-h1-sm md:text-h1 text-neutral-900 font-bold tracking-tight",
    2: "text-h2-sm md:text-h2 text-gray-950 font-bold tracking-tight",
    3: "text-h3-sm md:text-h3 text-neutral-900 font-semibold",
    4: "text-xl md:text-2xl text-neutral-900 font-semibold",
    5: "text-lg md:text-xl text-neutral-900 font-semibold",
    6: "text-base md:text-lg text-neutral-900 font-semibold",
  };

  const Tag = (as || `h${level}`) as React.ElementType;

  return (
    <Tag
      className={cn(headingClasses[level], className)}
      {...(props as React.ComponentPropsWithoutRef<React.ElementType>)}
    >
      {children}
    </Tag>
  );
}

interface TextProps {
  size?: "body" | "body-lg" | "small" | "tiny";
  children?: React.ReactNode;
  className?: string;
  muted?: boolean;
  as?: "p" | "span" | "div";
}

export function Text({
  size = "body",
  muted = false,
  as = "p",
  children,
  className = "",
  ...props
}: TextProps) {
  const sizeClasses = {
    "body-lg": "text-body-lg",
    body: "text-body",
    small: "text-small",
    tiny: "text-tiny",
  };

  // Check if className already contains a text color class
  const hasTextColor = /text-(neutral|gray|slate|zinc|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)-\d+|text-(white|black|transparent|current)/.test(className);
  
  const colorClass = hasTextColor ? "" : (muted ? "text-neutral-500" : "text-neutral-600");
  const Tag = as as React.ElementType;

  return (
    <Tag
      className={cn(sizeClasses[size], colorClass, className)}
      {...(props as React.ComponentPropsWithoutRef<React.ElementType>)}
    >
      {children}
    </Tag>
  );
}

interface LeadProps {
  children?: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}

export function Lead({
  as = "p",
  children,
  className = "",
  ...props
}: LeadProps) {
  const Tag = as as React.ElementType;

  return (
    <Tag
      className={cn("text-body-lg text-neutral-600 leading-relaxed", className)}
      {...(props as React.ComponentPropsWithoutRef<React.ElementType>)}
    >
      {children}
    </Tag>
  );
}

interface LabelProps {
  children?: React.ReactNode;
  className?: string;
  required?: boolean;
  as?: "label";
}

export function Label({
  as = "label",
  children,
  className = "",
  required = false,
  ...props
}: LabelProps) {
  const Tag = as as React.ElementType;

  return (
    <Tag
      className={cn(
        "text-small font-medium text-neutral-700 block mb-2",
        className
      )}
      {...(props as React.ComponentPropsWithoutRef<React.ElementType>)}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </Tag>
  );
}

// Export the base polymorphic component
export { Typography };
export default Typography;
