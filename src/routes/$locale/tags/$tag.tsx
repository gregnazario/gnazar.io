import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import NotFound from "@/components/NotFound";
import TagPage, { filterPostsByTag } from "@/components/TagPage";
import { defaultLocale, isValidLocale, type Locale, tf } from "@/lib/i18n";
import { fetchBlogPosts } from "@/server/content";

export const Route = createFileRoute("/$locale/tags/$tag")({
	beforeLoad: ({ params }) => {
		// The default locale's tags live at /tags
		if (params.locale === "en") {
			throw redirect({ to: "/tags/$tag", params: { tag: params.tag } });
		}
	},
	loader: async ({ params }) => {
		const locale = params.locale as Locale;

		// Show 404 for invalid locales (must be in loader, not beforeLoad, for SSR)
		if (!isValidLocale(locale)) {
			throw notFound();
		}

		const posts = await fetchBlogPosts({ data: { locale } });
		return { ...filterPostsByTag(posts, params.tag), locale };
	},
	component: TagPageRoute,
	notFoundComponent: NotFound,
	head: ({ loaderData }) => {
		const locale = loaderData?.locale ?? defaultLocale;

		return {
			meta: [
				{
					title: `${tf(locale, "postsTaggedWith", {
						tag: loaderData?.tag || "Tag",
					})} | Greg Nazario`,
				},
			],
		};
	},
});

function TagPageRoute() {
	const { posts, tag, locale } = Route.useLoaderData();

	return <TagPage posts={posts} tag={tag} locale={locale} />;
}
