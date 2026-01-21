import { createFileRoute, Link } from "@tanstack/react-router";

import Badge from "@/components/Badge";
import CopyCodeButton from "@/components/CopyCodeButton";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import Webmentions from "@/components/Webmentions";
import { formatDate } from "@/lib/format";
import { defaultLocale } from "@/lib/i18n";
import { calculateReadingTime, formatReadingTime } from "@/lib/reading-time";
import { siteConfig } from "@/lib/site";
import { fetchBlogPost } from "@/server/content";

type BlogLoaderData = Awaited<ReturnType<typeof fetchBlogPost>>;

export const Route = createFileRoute("/blog/$slug")({
	loader: async ({ params }): Promise<BlogLoaderData> =>
		fetchBlogPost({ data: { slug: params.slug, locale: defaultLocale } }),
	component: BlogPostPage,
	head: ({ loaderData }) => {
		if (!loaderData) {
			return {
				meta: [{ title: "Post not found | Greg Nazario" }],
			};
		}

		const ogImage = `${siteConfig.url}/og/${loaderData.post.slug}.png`;

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
				{ property: "og:image", content: ogImage },
				{ property: "og:image:width", content: "1200" },
				{ property: "og:image:height", content: "630" },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:image", content: ogImage },
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

	const readingTime = calculateReadingTime(data.html);

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
							<span className="reading-time">
								{formatReadingTime(readingTime)}
							</span>
							{data.post.tags.map((tag) => (
								<Badge key={tag}>{tag}</Badge>
							))}
						</div>
						<TableOfContents html={data.html} />
						{/* biome-ignore lint/security/noDangerouslySetInnerHtml: content is local */}
						<div dangerouslySetInnerHTML={{ __html: data.html }} />
						<CopyCodeButton />
					</article>
					<ShareButtons
						title={data.post.title}
						slug={data.post.slug}
						type="blog"
					/>
					<Webmentions slug={data.post.slug} type="blog" />
				</div>
			</div>
		</section>
	);
}
