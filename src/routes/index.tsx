import { createFileRoute } from "@tanstack/react-router";

import HomePage from "@/components/HomePage";
import { defaultLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { fetchBlogPosts, fetchProjects } from "@/server/content";

const discoveryLinkHeader = [
	`<${siteConfig.url}/.well-known/api-catalog>; rel="api-catalog"`,
	`<${siteConfig.url}/.well-known/openapi.json>; rel="service-desc"`,
	`<${siteConfig.url}/llms.txt>; rel="service-doc"`,
	`<${siteConfig.url}/.well-known/agent-skills/index.json>; rel="describedby"`,
].join(", ");

export const Route = createFileRoute("/")({
	headers: () => ({
		Link: discoveryLinkHeader,
	}),
	loader: async () => {
		const [posts, projects] = await Promise.all([
			fetchBlogPosts({ data: { locale: defaultLocale } }),
			fetchProjects({ data: { locale: defaultLocale } }),
		]);

		return {
			posts: posts.slice(0, 2),
			projects: projects.slice(0, 2),
		};
	},
	component: HomeRoute,
});

function HomeRoute() {
	const { posts, projects } = Route.useLoaderData();

	return <HomePage posts={posts} projects={projects} />;
}
