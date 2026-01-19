import { Link, createFileRoute } from "@tanstack/react-router";

import Badge from "@/components/Badge";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { fetchBlogPost } from "@/server/content";

type BlogLoaderData = Awaited<ReturnType<typeof fetchBlogPost>>;

export const Route = createFileRoute("/blog/$slug")({
	loader: async ({ params }): Promise<BlogLoaderData> =>
		fetchBlogPost({ data: params.slug }),
	component: BlogPostPage,
	head: ({ loaderData }) => {
		if (!loaderData) {
			return {
				meta: [{ title: "Post not found | Greg Nazario" }],
			};
		}

		return {
			meta: [
				{ title: `${loaderData.post.title} | Greg Nazario` },
				{ name: "description", content: loaderData.post.summary },
				{ property: "og:title", content: loaderData.post.title },
				{ property: "og:description", content: loaderData.post.summary },
				{
					property: "og:url",
					content: `${siteConfig.url}/blog/${loaderData.post.slug}`,
				},
				{ name: "twitter:card", content: "summary_large_image" },
			],
		};
	},
});

function BlogPostPage() {
	const data = Route.useLoaderData();

	if (!data) {
		return (
			<section className="section">
				<div className="container">
					<div className="card">
						<h2>Post not found</h2>
						<p>This post does not exist.</p>
						<Link className="button ghost" to="/blog">
							Back to blog
						</Link>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="section">
			<div className="container">
				<div className="stack">
					<Link className="button ghost" to="/blog">
						Back to blog
					</Link>
					<article className="prose">
						<h1>{data.post.title}</h1>
						<div className="card-meta">
							<span>{formatDate(data.post.date)}</span>
							{data.post.tags.map((tag) => (
								<Badge key={tag}>{tag}</Badge>
							))}
						</div>
						{/* biome-ignore lint/security/noDangerouslySetInnerHtml: content is local */}
						<div dangerouslySetInnerHTML={{ __html: data.html }} />
					</article>
				</div>
			</div>
		</section>
	);
}
