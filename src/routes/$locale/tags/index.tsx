import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import NotFound from "@/components/NotFound";
import TagsPage, { countTags } from "@/components/TagsPage";
import { defaultLocale, isValidLocale, type Locale, t } from "@/lib/i18n";
import { fetchBlogPosts } from "@/server/content";

export const Route = createFileRoute("/$locale/tags/")({
	beforeLoad: ({ params }) => {
		// The default locale's tags live at /tags
		if (params.locale === "en") {
			throw redirect({ to: "/tags" });
		}
	},
	loader: async ({ params }) => {
		const locale = params.locale as Locale;

		// Show 404 for invalid locales (must be in loader, not beforeLoad, for SSR)
		if (!isValidLocale(locale)) {
			throw notFound();
		}

		const posts = await fetchBlogPosts({ data: { locale } });
		return { tags: countTags(posts), totalPosts: posts.length, locale };
	},
	component: TagsRoute,
	notFoundComponent: NotFound,
	head: ({ loaderData }) => ({
		meta: [
			{
				title: `${t(loaderData?.locale ?? defaultLocale, "tags")} | Greg Nazario`,
			},
			{
				name: "description",
				content: t(loaderData?.locale ?? defaultLocale, "browsePostsByTopic"),
			},
		],
	}),
});

function TagsRoute() {
	const { tags, totalPosts, locale } = Route.useLoaderData();

	return <TagsPage tags={tags} totalPosts={totalPosts} locale={locale} />;
}
