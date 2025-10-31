import React from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = "",
  as,
  ...props
}) => {
  const Tag = (as || `h${level}`) as keyof JSX.IntrinsicElements;

  const headingClasses: Record<HeadingLevel, string> = {
    1: "text-h1-sm md:text-h1 text-neutral-900 font-bold tracking-tight",
    2: "text-h2-sm md:text-h2 text-neutral-900 font-bold tracking-tight",
    3: "text-h3-sm md:text-h3 text-neutral-900 font-semibold",
    4: "text-xl md:text-2xl text-neutral-900 font-semibold",
    5: "text-lg md:text-xl text-neutral-900 font-semibold",
    6: "text-base md:text-lg text-neutral-900 font-semibold",
  };

  return (
    <Tag className={cn(headingClasses[level], className)} {...props}>
      {children}
    </Tag>
  );
};

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "body" | "body-lg" | "small" | "tiny";
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  as?: "p" | "span" | "div";
}

export const Text: React.FC<TextProps> = ({
  size = "body",
  children,
  className = "",
  muted = false,
  as = "p",
  ...props
}) => {
  const Tag = as as keyof JSX.IntrinsicElements;

  const sizeClasses = {
    "body-lg": "text-body-lg",
    body: "text-body",
    small: "text-small",
    tiny: "text-tiny",
  };

  const colorClass = muted ? "text-neutral-500" : "text-neutral-600";

  return (
    <Tag className={cn(sizeClasses[size], colorClass, className)} {...props}>
      {children}
    </Tag>
  );
};

interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export const Lead: React.FC<LeadProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <p
      className={cn("text-body-lg text-neutral-600 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
};

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  children,
  className = "",
  required = false,
  ...props
}) => {
  return (
    <label
      className={cn(
        "text-small font-medium text-neutral-700 block mb-2",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};
