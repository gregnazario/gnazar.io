import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import HomePage from "@/components/HomePage";
import NotFound from "@/components/NotFound";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { fetchBlogPosts, fetchProjects } from "@/server/content";

export const Route = createFileRoute("/$locale/")({
	beforeLoad: ({ params }) => {
		const locale = params.locale as Locale;

		// Redirect /en to / (default locale doesn't need prefix)
		if (locale === "en") {
			throw redirect({ to: "/" });
		}
	},
	loader: async ({ params }) => {
		const locale = params.locale as Locale;

		// Show 404 for invalid locales (must be in loader, not beforeLoad, for SSR)
		if (!isValidLocale(locale)) {
			throw notFound();
		}

		const [posts, projects] = await Promise.all([
			fetchBlogPosts({ data: { locale } }),
			fetchProjects({ data: { locale } }),
		]);

		return {
			posts: posts.slice(0, 2),
			projects: projects.slice(0, 2),
			locale,
		};
	},
	component: HomeRoute,
	notFoundComponent: NotFound,
});

function HomeRoute() {
	const { posts, projects, locale } = Route.useLoaderData();

	return <HomePage posts={posts} projects={projects} locale={locale} />;
}
