import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import NotFound from "@/components/NotFound";
import PostCard from "@/components/PostCard";
import SectionHeading from "@/components/SectionHeading";
import { isValidLocale, type Locale, t } from "@/lib/i18n";
import { fetchBlogPosts } from "@/server/content";

export const Route = createFileRoute("/$locale/blog/")({
	beforeLoad: ({ params }) => {
		const locale = params.locale as Locale;

		// Redirect /en/blog to /blog (default locale doesn't need prefix)
		if (locale === "en") {
			throw redirect({ to: "/blog" });
		}
	},
	loader: async ({ params }) => {
		const locale = params.locale as Locale;

		// Show 404 for invalid locales (must be in loader, not beforeLoad, for SSR)
		if (!isValidLocale(locale)) {
			throw notFound();
		}

		const posts = await fetchBlogPosts({ data: { locale } });
		return { posts, locale };
	},
	component: BlogPage,
	notFoundComponent: NotFound,
	head: ({ loaderData }) => ({
		meta: [
			{ title: `${t(loaderData?.locale ?? "en", "blog")} | Greg Nazario` },
			{
				name: "description",
				content: "Notes on systems, engineering, and building products.",
			},
		],
	}),
});

function BlogPage() {
	const { posts, locale } = Route.useLoaderData();

	return (
		<section className="section">
			<div className="container">
				<SectionHeading
					title={t(locale, "blog")}
					subtitle="Notes on systems, engineering, and building products."
				/>
				<div className="stack">
					{posts.map((post) => (
						<PostCard key={post.slug} post={post} locale={locale} />
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
