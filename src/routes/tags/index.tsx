import { createFileRoute } from "@tanstack/react-router";

import TagsPage, { countTags } from "@/components/TagsPage";
import { defaultLocale } from "@/lib/i18n";
import { fetchBlogPosts } from "@/server/content";

export const Route = createFileRoute("/tags/")({
	loader: async () => {
		const posts = await fetchBlogPosts({ data: { locale: defaultLocale } });
		return { tags: countTags(posts), totalPosts: posts.length };
	},
	component: TagsRoute,
	head: () => ({
		meta: [
			{ title: "Tags | Greg Nazario" },
			{ name: "description", content: "Browse blog posts by topic." },
		],
	}),
});

function TagsRoute() {
	const { tags, totalPosts } = Route.useLoaderData();

	return <TagsPage tags={tags} totalPosts={totalPosts} />;
}
