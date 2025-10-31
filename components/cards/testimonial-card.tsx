import { cn } from "@/lib/utils";

interface Testimonial {
  id?: string;
  quote?: string;
  content?: string;
  author: string;
  position?: string;
  role?: string;
  company: string;
  rating?: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export default function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  const quote = testimonial.quote || testimonial.content || "";
  const role = testimonial.role || testimonial.position || "";

  return (
    <div
      className={cn(
        "group h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg hover:border-neutral-300",
        className
      )}
    >
      {/* Quote Icon */}
      <div className="mb-6">
        <svg
          className="h-10 w-10 text-brand opacity-20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Quote Content */}
      <blockquote className="mb-6 text-lg leading-relaxed text-neutral-700">
        "{quote}"
      </blockquote>

      {/* Rating Stars (if provided) */}
      {testimonial.rating && (
        <div className="mb-6 flex gap-1">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`h-5 w-5 ${
                index < testimonial.rating!
                  ? "text-yellow-400"
                  : "text-neutral-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      {/* Author Info */}
      <div className="border-t border-neutral-200 pt-6">
        <div className="font-bold text-neutral-900">{testimonial.author}</div>
        {role && (
          <div className="mt-1 text-sm text-neutral-600">
            {role}
            {testimonial.company && (
              <>
                {" at "}
                <span className="text-brand font-medium">
                  {testimonial.company}
                </span>
              </>
            )}
          </div>
        )}
        {!role && testimonial.company && (
          <div className="mt-1 text-sm text-brand font-medium">
            {testimonial.company}
          </div>
        )}
      </div>
    </div>
  );
}
