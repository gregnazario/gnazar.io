import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import ArchivePage, {
	groupPostsByYearAndMonth,
} from "@/components/ArchivePage";
import NotFound from "@/components/NotFound";
import { defaultLocale, isValidLocale, type Locale, t } from "@/lib/i18n";
import { fetchBlogPosts } from "@/server/content";

export const Route = createFileRoute("/$locale/archive")({
	beforeLoad: ({ params }) => {
		// The default locale's archive lives at /archive
		if (params.locale === "en") {
			throw redirect({ to: "/archive" });
		}
	},
	loader: async ({ params }) => {
		const locale = params.locale as Locale;

		// Show 404 for invalid locales (must be in loader, not beforeLoad, for SSR)
		if (!isValidLocale(locale)) {
			throw notFound();
		}

		const posts = await fetchBlogPosts({ data: { locale } });
		const groups = groupPostsByYearAndMonth(posts, locale);
		return { groups, totalPosts: posts.length, locale };
	},
	component: ArchiveRoute,
	notFoundComponent: NotFound,
	head: ({ loaderData }) => ({
		meta: [
			{
				title: `${t(
					loaderData?.locale ?? defaultLocale,
					"archive",
				)} | Greg Nazario`,
			},
			{
				name: "description",
				content: t(loaderData?.locale ?? defaultLocale, "browsePostsByDate"),
			},
		],
	}),
});

function ArchiveRoute() {
	const { groups, totalPosts, locale } = Route.useLoaderData();

	return (
		<ArchivePage groups={groups} totalPosts={totalPosts} locale={locale} />
	);
}
