import BlogCard from "@/components/cards/blog-card";
import { FadeY } from "./reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogCards() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div>
      <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <FadeY key={post.slug} delay={index * 0.15}>
            <BlogCard post={post} />
          </FadeY>
        ))}
      </div>
      <FadeY delay={0.5} className="text-center">
        <Link href="/blog">
          <Button variant="outline" size="lg">
            View All Articles
          </Button>
        </Link>
      </FadeY>
    </div>
  );
}
