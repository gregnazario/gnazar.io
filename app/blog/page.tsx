import Link from "next/link";

import Badge from "@/components/Badge";
import { getAllBlogPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata = {
  title: "Blog",
  description: "Notes on systems, engineering, and building products.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <h2>Blog</h2>
          <p>Notes on systems, engineering, and building products.</p>
        </div>
        <div className="stack">
          {posts.map((post) => (
            <article key={post.slug} className="card">
              <div className="card-meta">
                <span>{formatDate(post.date)}</span>
                {post.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.summary}</p>
            </article>
          ))}
          {posts.length === 0 ? (
            <div className="card">
              <h3>No posts yet</h3>
              <p>New writing is on the way.</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
