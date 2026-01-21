import { createServerFn } from "@tanstack/react-start";
import { getAllBlogPosts, getAllProjects } from "@/lib/content-i18n";
import { defaultLocale } from "@/lib/i18n";

export type SearchItem = {
	type: "blog" | "project";
	slug: string;
	title: string;
	summary: string;
	tags?: string[];
};

export const fetchSearchIndex = createServerFn({ method: "GET" }).handler(
	async (): Promise<SearchItem[]> => {
		const [posts, projects] = await Promise.all([
			getAllBlogPosts(defaultLocale),
			getAllProjects(defaultLocale),
		]);

		const items: SearchItem[] = [
			...posts.map((post) => ({
				type: "blog" as const,
				slug: post.slug,
				title: post.title,
				summary: post.summary,
				tags: post.tags,
			})),
			...projects.map((project) => ({
				type: "project" as const,
				slug: project.slug,
				title: project.title,
				summary: project.summary,
			})),
		];

		return items;
	},
);
