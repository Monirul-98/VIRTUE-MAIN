import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeY } from "@/components/core/reveal";
import { getAllPosts, getPostBySlug, calculateReadTime } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

// MDX Components with custom styling
// Note: h1 mapped to h2 since page title is the main H1
const mdxComponents = {
  h1: (props: any) => <Heading level={2} className="mb-6 mt-8" {...props} />,
  h2: (props: any) => <Heading level={3} className="mb-4 mt-8" {...props} />,
  h3: (props: any) => <Heading level={4} className="mb-3 mt-6" {...props} />,
  p: (props: any) => <Text className="mb-4" {...props} />,
  ul: (props: any) => (
    <ul className="mb-6 ml-6 list-disc space-y-2 text-neutral-700" {...props} />
  ),
  ol: (props: any) => (
    <ol
      className="mb-6 ml-6 list-decimal space-y-2 text-neutral-700"
      {...props}
    />
  ),
  li: (props: any) => <li className="text-neutral-700" {...props} />,
  a: (props: any) => (
    <a
      className="text-brand hover:text-brand-600 underline font-medium transition-colors"
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong className="font-bold text-neutral-900" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="mb-6 border-l-4 border-brand pl-6 italic text-neutral-700"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-brand-700"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="mb-6 overflow-x-auto rounded-2xl bg-neutral-900 p-6 text-sm"
      {...props}
    />
  ),
  table: (props: any) => (
    <div className="mb-6 overflow-x-auto">
      <table
        className="min-w-full divide-y divide-neutral-200 border border-neutral-200 rounded-lg"
        {...props}
      />
    </div>
  ),
  thead: (props: any) => <thead className="bg-neutral-50" {...props} />,
  th: (props: any) => (
    <th
      className="px-6 py-3 text-left text-sm font-semibold text-neutral-900"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 text-sm text-neutral-700" {...props} />
  ),
  tr: (props: any) => <tr className="border-t border-neutral-200" {...props} />,
  hr: (props: any) => <hr className="my-8 border-neutral-200" {...props} />,
};

// MDX options
// Cast to any to bypass TypeScript type incompatibility with rehype plugins
const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: false,
        },
      ],
    ],
  },
} as any;

// Generate static params for all post slugs
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Blog | Virtue Enclosure Systems`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const readTime = post.readTime || calculateReadTime(post.content);
  const formattedDate = new Date(post.date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Hero Section */}
      <Section spacing="xl" background="gray">
        <Container className="max-w-4xl">
          {/* Breadcrumb */}
          <FadeY>
            <nav className="mb-8 flex items-center gap-2 text-sm text-neutral-600">
              <Link href="/" className="hover:text-brand transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-brand transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-neutral-900">{post.title}</span>
            </nav>
          </FadeY>

          {/* Category & Meta */}
          <FadeY delay={0.1}>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {post.category && <Badge variant="brand">{post.category}</Badge>}
              <span className="text-neutral-600">•</span>
              <time dateTime={post.date} className="text-neutral-600">
                {formattedDate}
              </time>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-600">{readTime}</span>
            </div>
          </FadeY>

          {/* Title */}
          <FadeY delay={0.2}>
            <Heading level={1} className="mb-6">
              {post.title}
            </Heading>
          </FadeY>

          {/* Excerpt */}
          <FadeY delay={0.3}>
            <Text size="body-lg" className="text-neutral-700 mb-6">
              {post.excerpt}
            </Text>
          </FadeY>

          {/* Author */}
          {post.author && (
            <FadeY delay={0.4}>
              <div className="flex items-center gap-3 pb-6 border-b border-neutral-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white font-bold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">
                    {post.author}
                  </div>
                  <div className="text-sm text-neutral-600">Author</div>
                </div>
              </div>
            </FadeY>
          )}
        </Container>
      </Section>

      {/* Cover Image */}
      <Section spacing="none">
        <Container className="max-w-5xl">
          <FadeY>
            <div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-soft-lg">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </FadeY>
        </Container>
      </Section>

      {/* Article Content */}
      <Section spacing="lg">
        <Container className="max-w-4xl">
          <FadeY delay={0.2}>
            <article className="prose prose-neutral prose-lg max-w-none">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={mdxOptions}
              />
            </article>
          </FadeY>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="lg" background="gray">
        <Container>
          <div className="bg-brand-50 rounded-3xl p-12 text-center max-w-3xl mx-auto">
            <FadeY>
              <Heading level={2} className="mb-4">
                Need Expert Advice?
              </Heading>
            </FadeY>
            <FadeY delay={0.2}>
              <Text size="body-lg" className="mb-8">
                Our team is here to help with your switchboard and enclosure
                requirements. Get in touch for a consultation.
              </Text>
            </FadeY>
            <FadeY delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" size="lg">
                    More Articles
                  </Button>
                </Link>
              </div>
            </FadeY>
          </div>
        </Container>
      </Section>
    </>
  );
}
