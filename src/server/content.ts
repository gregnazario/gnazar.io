import { createServerFn } from "@tanstack/react-start";

import {
	getAllBlogPosts,
	getAllProjects,
	getBlogPostBySlug,
	getProjectBySlug,
} from "@/lib/content-i18n";
import { defaultLocale, isValidLocale, type Locale } from "@/lib/i18n";
import { renderMarkdown } from "@/lib/markdown";

type LocaleInput = {
	locale?: string;
};

type SlugInput = {
	slug: string;
	locale?: string;
};

function parseLocale(input: string | undefined): Locale {
	if (input && isValidLocale(input)) {
		return input;
	}
	return defaultLocale;
}

export const fetchBlogPosts = createServerFn({ method: "GET" })
	.inputValidator((input: LocaleInput) => input)
	.handler(async ({ data }) => {
		const locale = parseLocale(data?.locale);
		return getAllBlogPosts(locale);
	});

export const fetchProjects = createServerFn({ method: "GET" })
	.inputValidator((input: LocaleInput) => input)
	.handler(async ({ data }) => {
		const locale = parseLocale(data?.locale);
		return getAllProjects(locale);
	});

export const fetchBlogPost = createServerFn({ method: "GET" })
	.inputValidator((input: SlugInput) => input)
	.handler(async ({ data }) => {
		const locale = parseLocale(data.locale);
		const post = await getBlogPostBySlug(data.slug, locale);
		if (!post) {
			return null;
		}
		const html = await renderMarkdown(post.content);
		// Get all posts for related posts, backlinks, and navigation
		const allPosts = await getAllBlogPosts(locale);
		// Get series posts if this post belongs to a series
		const seriesPosts = post.series
			? allPosts
					.filter((p) => p.series === post.series)
					.sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))
			: [];
		// Find previous and next posts (sorted by date)
		const sortedPosts = [...allPosts].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);
		const currentIndex = sortedPosts.findIndex((p) => p.slug === data.slug);
		const previousPost =
			currentIndex < sortedPosts.length - 1
				? sortedPosts[currentIndex + 1]
				: null;
		const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
		return { post, html, allPosts, seriesPosts, previousPost, nextPost };
	});

export const fetchProject = createServerFn({ method: "GET" })
	.inputValidator((input: SlugInput) => input)
	.handler(async ({ data }) => {
		const locale = parseLocale(data.locale);
		const project = await getProjectBySlug(data.slug, locale);
		if (!project) {
			return null;
		}
		const html = await renderMarkdown(project.content);
		return { project, html };
	});
