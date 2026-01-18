import Link from "next/link";
import { notFound } from "next/navigation";

import Badge from "@/components/Badge";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { renderMdx } from "@/lib/mdx";
import { siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const content = await renderMdx(post.content);

  return (
    <section className="section">
      <div className="container">
        <div className="stack">
          <Link className="button ghost" href="/blog">
            Back to blog
          </Link>
          <article className="prose">
            <h1>{post.title}</h1>
            <div className="card-meta">
              <span>{formatDate(post.date)}</span>
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            {content}
          </article>
        </div>
      </div>
    </section>
  );
}
