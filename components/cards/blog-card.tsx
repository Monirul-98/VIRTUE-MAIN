import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { calculateReadTime } from "@/lib/blog";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  cover: string;
  category?: string;
  author?: string;
  readTime?: string;
  content?: string;
}

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export default function BlogCard({ post, className }: BlogCardProps) {
  // Calculate read time if not provided
  const readTime =
    post.readTime ||
    (post.content ? calculateReadTime(post.content) : "5 min read");

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg hover:border-neutral-300",
        className
      )}
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Badge Overlay */}
        {post.category && (
          <div className="absolute top-4 left-4">
            <Badge variant="brand" size="sm">
              {post.category}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Meta Info */}
        <div className="mb-3 flex items-center gap-2 text-sm text-neutral-500">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>•</span>
          <span>{readTime}</span>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-neutral-900 transition-colors group-hover:text-brand line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-4 text-neutral-600 line-clamp-3">{post.excerpt}</p>

        {/* Author */}
        {post.author && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">By {post.author}</span>
            <span className="inline-flex items-center text-brand font-semibold">
              Read More
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
        )}
      </div>
    </Link>
  );
}
