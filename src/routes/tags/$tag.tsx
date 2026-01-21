import { createFileRoute, Link } from "@tanstack/react-router";

import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import SectionHeading from "@/components/SectionHeading";
import { defaultLocale } from "@/lib/i18n";
import { fetchBlogPosts } from "@/server/content";

export const Route = createFileRoute("/tags/$tag")({
	loader: async ({ params }) => {
		const posts = await fetchBlogPosts({ data: { locale: defaultLocale } });
		const filteredPosts = posts.filter((post) =>
			post.tags.some((t) => t.toLowerCase() === params.tag.toLowerCase()),
		);

		// Find the actual tag name (preserving case)
		const actualTag =
			filteredPosts[0]?.tags.find(
				(t) => t.toLowerCase() === params.tag.toLowerCase(),
			) || params.tag;

		return { posts: filteredPosts, tag: actualTag };
	},
	component: TagPage,
	head: ({ loaderData }) => ({
		meta: [
			{ title: `Posts tagged "${loaderData?.tag || "Tag"}" | Greg Nazario` },
			{
				name: "description",
				content: `Browse all posts tagged with ${loaderData?.tag || "this tag"}.`,
			},
		],
	}),
});

function TagPage() {
	const { posts, tag } = Route.useLoaderData();

	const breadcrumbItems = [
		{ label: "Home", href: "/" },
		{ label: "Tags", href: "/tags" },
		{ label: tag },
	];

	return (
		<section className="section">
			<div className="container">
				<Breadcrumbs items={breadcrumbItems} />
				<SectionHeading
					title={`#${tag}`}
					subtitle={`${posts.length} post${posts.length !== 1 ? "s" : ""}`}
				/>
				<div className="stack">
					{posts.map((post) => (
						<PostCard key={post.slug} post={post} />
					))}
					{posts.length === 0 && (
						<div className="card">
							<p>No posts found with this tag.</p>
							<Link className="button ghost" to="/tags">
								View all tags
							</Link>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
