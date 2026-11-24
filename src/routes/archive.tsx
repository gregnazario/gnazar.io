import { createFileRoute } from "@tanstack/react-router";

import ArchivePage, {
	groupPostsByYearAndMonth,
} from "@/components/ArchivePage";
import { defaultLocale } from "@/lib/i18n";
import { fetchBlogPosts } from "@/server/content";

export const Route = createFileRoute("/archive")({
	loader: async () => {
		const posts = await fetchBlogPosts({ data: { locale: defaultLocale } });
		const groups = groupPostsByYearAndMonth(posts);
		return { groups, totalPosts: posts.length };
	},
	component: ArchiveRoute,
	head: () => ({
		meta: [
			{ title: "Archive | Greg Nazario" },
			{ name: "description", content: "Browse all blog posts by date." },
		],
	}),
});

function ArchiveRoute() {
	const { groups, totalPosts } = Route.useLoaderData();

	return <ArchivePage groups={groups} totalPosts={totalPosts} />;
}
