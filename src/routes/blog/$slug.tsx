import { createFileRoute, Link } from "@tanstack/react-router";

import Badge from "@/components/Badge";
import CopyCodeButton from "@/components/CopyCodeButton";
import FontSizeControls from "@/components/FontSizeControls";
import GiscusComments from "@/components/GiscusComments";
import ImageLightbox from "@/components/ImageLightbox";
import PostBacklinks from "@/components/PostBacklinks";
import PostReactions from "@/components/PostReactions";
import PostSeries from "@/components/PostSeries";
import ReadingProgress from "@/components/ReadingProgress";
import RelatedPosts from "@/components/RelatedPosts";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import Webmentions from "@/components/Webmentions";
import { useMarkAsRead } from "@/hooks/useReadingHistory";
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
				links: [],
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
			links: [
				// KaTeX CSS for math rendering
				{
					rel: "stylesheet",
					href: "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",
				},
			],
		};
	},
});

function BlogPostPage() {
	const data = Route.useLoaderData();

	// Mark post as read
	useMarkAsRead(data?.post.slug ?? "");

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

	const { post, html, allPosts, seriesPosts } = data;
	const readingTime = calculateReadingTime(html);

	return (
		<>
			<ReadingProgress />
			<section className="section">
				<div className="container">
					<div className="stack">
						<Link className="button ghost" to="/blog">
							Back to blog
						</Link>

						{post.series && seriesPosts.length > 1 && (
							<PostSeries
								seriesName={post.series}
								posts={seriesPosts.map((p) => ({
									slug: p.slug,
									title: p.title,
								}))}
								currentSlug={post.slug}
							/>
						)}

						<article className="prose">
							<h1>
								{post.title}
								{post.draft && <span className="draft-indicator">Draft</span>}
							</h1>
							<div className="card-meta">
								<span>{formatDate(post.date)}</span>
								{post.lastUpdated && (
									<span className="last-updated">
										Updated {formatDate(post.lastUpdated)}
									</span>
								)}
								<span className="reading-time">
									{formatReadingTime(readingTime)}
								</span>
								{post.tags.map((tag) => (
									<Badge key={tag}>{tag}</Badge>
								))}
							</div>

							<FontSizeControls />
							<TableOfContents html={html} />

							{/* biome-ignore lint/security/noDangerouslySetInnerHtml: content is local */}
							<div dangerouslySetInnerHTML={{ __html: html }} />

							<CopyCodeButton />
							<ImageLightbox />
						</article>

						<PostReactions slug={post.slug} />

						<ShareButtons title={post.title} slug={post.slug} type="blog" />

						<RelatedPosts
							currentSlug={post.slug}
							currentTags={post.tags}
							allPosts={allPosts}
						/>

						<PostBacklinks currentSlug={post.slug} allPosts={allPosts} />

						<Webmentions slug={post.slug} type="blog" />

						<GiscusComments
							repo="gregnazario/gnazar.io"
							repoId="MDEwOlJlcG9zaXRvcnkxNzI0MDcxNjQ="
							category="General"
							categoryId="DIC_kwDOCka5fM4C1PUp"
						/>
					</div>
				</div>
			</section>
		</>
	);
}
