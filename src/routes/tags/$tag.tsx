import { createFileRoute } from "@tanstack/react-router";

import TagPage, { filterPostsByTag } from "@/components/TagPage";
import { defaultLocale } from "@/lib/i18n";
import { fetchBlogPosts } from "@/server/content";

export const Route = createFileRoute("/tags/$tag")({
	loader: async ({ params }) => {
		const posts = await fetchBlogPosts({ data: { locale: defaultLocale } });
		return filterPostsByTag(posts, params.tag);
	},
	component: TagPageRoute,
	head: ({ loaderData }) => ({
		meta: [
			{
				title: `Posts tagged "${loaderData?.tag || "Tag"}" | Greg Nazario`,
			},
			{
				name: "description",
				content: `Browse all posts tagged with ${loaderData?.tag || "this tag"}.`,
			},
		],
	}),
});

function TagPageRoute() {
	const { posts, tag } = Route.useLoaderData();

	return <TagPage posts={posts} tag={tag} />;
}
