import { createServerFn } from "@tanstack/react-start";

import {
	getAllBlogPosts,
	getAllProjects,
	getBlogPostBySlug,
	getProjectBySlug,
} from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

export const fetchBlogPosts = createServerFn({ method: "GET" }).handler(
	async () => {
		return getAllBlogPosts();
	},
);

export const fetchProjects = createServerFn({ method: "GET" }).handler(
	async () => {
		return getAllProjects();
	},
);

export const fetchBlogPost = createServerFn({ method: "GET" })
	.inputValidator((slug: string) => slug)
	.handler(async ({ data }) => {
		const post = await getBlogPostBySlug(data);
		if (!post) {
			return null;
		}
		const html = await renderMarkdown(post.content);
		return { post, html };
	});

export const fetchProject = createServerFn({ method: "GET" })
	.inputValidator((slug: string) => slug)
	.handler(async ({ data }) => {
		const project = await getProjectBySlug(data);
		if (!project) {
			return null;
		}
		const html = await renderMarkdown(project.content);
		return { project, html };
	});
