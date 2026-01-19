import { Link, createFileRoute } from "@tanstack/react-router";

import Badge from "@/components/Badge";
import { getAllBlogPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/blog")({
	loader: async () => getAllBlogPosts(),
	component: BlogPage,
	head: () => ({
		meta: [
			{ title: "Blog | Greg Nazario" },
			{
				name: "description",
				content: "Notes on systems, engineering, and building products.",
			},
		],
	}),
});

function BlogPage() {
	const posts = Route.useLoaderData();

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
								<Link to="/blog/$slug" params={{ slug: post.slug }}>
									{post.title}
								</Link>
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
