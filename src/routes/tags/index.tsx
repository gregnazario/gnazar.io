import { createFileRoute, Link } from "@tanstack/react-router";

import SectionHeading from "@/components/SectionHeading";
import { defaultLocale } from "@/lib/i18n";
import { fetchBlogPosts } from "@/server/content";

type TagWithCount = {
	tag: string;
	count: number;
};

export const Route = createFileRoute("/tags/")({
	loader: async () => {
		const posts = await fetchBlogPosts({ data: { locale: defaultLocale } });

		// Count tags
		const tagCounts = new Map<string, number>();
		for (const post of posts) {
			for (const tag of post.tags) {
				tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
			}
		}

		// Convert to array and sort by count (descending), then alphabetically
		const tags: TagWithCount[] = Array.from(tagCounts.entries())
			.map(([tag, count]) => ({ tag, count }))
			.sort((a, b) => {
				if (b.count !== a.count) return b.count - a.count;
				return a.tag.localeCompare(b.tag);
			});

		return { tags, totalPosts: posts.length };
	},
	component: TagsPage,
	head: () => ({
		meta: [
			{ title: "Tags | Greg Nazario" },
			{ name: "description", content: "Browse blog posts by topic." },
		],
	}),
});

function TagsPage() {
	const { tags, totalPosts } = Route.useLoaderData();

	return (
		<section className="section">
			<div className="container">
				<SectionHeading
					title="Tags"
					subtitle={`${tags.length} tags across ${totalPosts} posts`}
				/>
				<div className="tags-cloud">
					{tags.map(({ tag, count }) => (
						<Link
							key={tag}
							to="/tags/$tag"
							params={{ tag }}
							className="tag-link"
						>
							<span className="tag-name">{tag}</span>
							<span className="tag-count">{count}</span>
						</Link>
					))}
				</div>
				{tags.length === 0 && (
					<div className="card">
						<p>No tags yet.</p>
					</div>
				)}
			</div>
		</section>
	);
}
