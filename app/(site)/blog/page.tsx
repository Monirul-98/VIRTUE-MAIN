import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { FadeY } from "@/components/core/reveal";
import BlogCard from "@/components/cards/blog-card";
import { getAllPosts, getAllCategories } from "@/lib/blog";

export const metadata = {
  title: "Blog | Virtue Enclosure Systems",
  description:
    "Industry insights, technical articles, and news from Virtue Enclosure Systems. Learn about electrical enclosures, switchboards, and best practices.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      {/* Hero Section */}
      <Section spacing="xl" background="dark">
        <Container>
          <FadeY>
            <Heading level={1} className="mb-6 text-white">
              Blog & Insights
            </Heading>
          </FadeY>
          <FadeY delay={0.2}>
            <Text size="body-lg" className="max-w-3xl text-neutral-300">
              Industry insights, technical expertise, and the latest news from
              Virtue Enclosure Systems. Stay informed about electrical
              infrastructure best practices.
            </Text>
          </FadeY>
        </Container>
      </Section>

      {/* Blog Grid */}
      <Section spacing="lg">
        <Container>
          <FadeY className="text-center mb-12">
            <Heading level={2} className="mb-4">
              Latest Articles
            </Heading>
            <Text size="body-lg" className="max-w-2xl mx-auto mb-8">
              Expert knowledge and practical guidance for electrical
              infrastructure projects
            </Text>

            {/* Category Filter (visual only for now) */}
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="brand">All Posts</Badge>
                {categories.map((category) => (
                  <Badge key={category} variant="outline-brand">
                    {category}
                  </Badge>
                ))}
              </div>
            )}
          </FadeY>

          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {posts.map((post, index) => (
                <FadeY key={post.slug} delay={index * 0.1}>
                  <BlogCard post={post} />
                </FadeY>
              ))}
            </div>
          ) : (
            <FadeY className="text-center py-12">
              <Text className="text-neutral-600">
                No blog posts available yet. Check back soon for industry
                insights and technical articles.
              </Text>
            </FadeY>
          )}
        </Container>
      </Section>
    </>
  );
}
