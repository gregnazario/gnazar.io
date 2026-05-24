import { createFileRoute } from "@tanstack/react-router";

import { approximateTokenCount } from "@/lib/agent-discovery";
import { getAllBlogPosts, getAllProjects } from "@/lib/content-i18n";
import { defaultLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export const Route = createFileRoute("/llms-full.txt")({
	server: {
		handlers: {
			GET: async () => {
				const [posts, projects] = await Promise.all([
					getAllBlogPosts(defaultLocale),
					getAllProjects(defaultLocale),
				]);

				const sections = [
					`# ${siteConfig.title}`,
					``,
					`> ${siteConfig.description}`,
					``,
					`## Blog Posts (${posts.length})`,
					``,
				];

				for (const post of posts) {
					const url = `${siteConfig.url}/blog/${post.slug}`;
					sections.push(`---`);
					sections.push(``);
					sections.push(`# ${post.title}`);
					sections.push(``);
					sections.push(`> URL: ${url}`);
					sections.push(`> Date: ${post.date}`);
					if (post.lastUpdated) {
						sections.push(`> Updated: ${post.lastUpdated}`);
					}
					if (post.tags.length > 0) {
						sections.push(`> Tags: ${post.tags.join(", ")}`);
					}
					if (post.series) {
						sections.push(`> Series: ${post.series}`);
					}
					if (post.summary) {
						sections.push(`> Summary: ${post.summary}`);
					}
					sections.push(``);
					sections.push(post.content);
				}

				if (projects.length > 0) {
					sections.push(``);
					sections.push(`## Projects (${projects.length})`);
					sections.push(``);

					for (const project of projects) {
						const url = `${siteConfig.url}/projects/${project.slug}`;
						sections.push(`---`);
						sections.push(``);
						sections.push(`# ${project.title}`);
						sections.push(``);
						sections.push(`> URL: ${url}`);
						if (project.year) {
							sections.push(`> Year: ${project.year}`);
						}
						if (project.role) {
							sections.push(`> Role: ${project.role}`);
						}
						if (project.links.length > 0) {
							const linkStr = project.links
								.map((l) => `[${l.label}](${l.href})`)
								.join(", ");
							sections.push(`> Links: ${linkStr}`);
						}
						if (project.summary) {
							sections.push(`> Summary: ${project.summary}`);
						}
						sections.push(``);
						sections.push(project.content);
					}
				}

				sections.push(``);
				sections.push(`## Contact & Social`);
				sections.push(``);
				sections.push(`- Website: ${siteConfig.url}`);
				sections.push(`- GitHub: ${siteConfig.social.github}`);
				sections.push(`- LinkedIn: ${siteConfig.social.linkedin}`);
				sections.push(`- Twitter: ${siteConfig.social.twitter}`);

				const body = sections.join("\n");
				const tokens = approximateTokenCount(body);

				return new Response(body, {
					status: 200,
					headers: {
						"Content-Type": "text/plain; charset=utf-8",
						"Cache-Control": "public, max-age=3600",
						"x-markdown-tokens": String(tokens),
					},
				});
			},
		},
	},
});
