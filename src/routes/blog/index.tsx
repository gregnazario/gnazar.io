import { createFileRoute } from "@tanstack/react-router";

import PostCard from "@/components/PostCard";
import SectionHeading from "@/components/SectionHeading";
import { fetchBlogPosts } from "@/server/content";

export const Route = createFileRoute("/blog/")({
	loader: async () => fetchBlogPosts(),
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
				<SectionHeading
					title="Blog"
					subtitle="Notes on systems, engineering, and building products."
				/>
				<div className="stack">
					{posts.map((post) => (
						<PostCard key={post.slug} post={post} />
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
