import { createMiddleware, createStart } from "@tanstack/react-start";
import { getStartContext } from "@tanstack/start-storage-context";

import { approximateTokenCount } from "@/lib/agent-discovery";
import {
	getAllBlogPosts,
	getAllProjects,
	getBlogPostBySlug,
	getProjectBySlug,
} from "@/lib/content-i18n";
import { defaultLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

function acceptsMarkdown(request: Request): boolean {
	const accept = request.headers.get("Accept");
	if (!accept) return false;
	return accept.split(",").some((part) => {
		const type = part.split(";")[0]?.trim().toLowerCase();
		return type === "text/markdown" || type === "application/markdown";
	});
}

function stripTrailingSlash(pathname: string): string {
	if (pathname.length > 1 && pathname.endsWith("/")) {
		return pathname.slice(0, -1);
	}
	return pathname;
}

async function markdownForPath(pathname: string): Promise<string | null> {
	const path = stripTrailingSlash(pathname) || "/";

	if (path === "/") {
		const [posts, projects] = await Promise.all([
			getAllBlogPosts(defaultLocale),
			getAllProjects(defaultLocale),
		]);
		const recentPosts = posts.slice(0, 6);
		const recentProjects = projects.slice(0, 6);
		return `# ${siteConfig.title}

${siteConfig.description}

## Featured posts

${recentPosts.map((p) => `- [${p.title}](${siteConfig.url}/blog/${p.slug})`).join("\n")}

## Featured projects

${recentProjects.map((p) => `- [${p.title}](${siteConfig.url}/projects/${p.slug})`).join("\n")}

## Links

- [Blog](${siteConfig.url}/blog)
- [Projects](${siteConfig.url}/projects)
- [Archive](${siteConfig.url}/archive)
`;
	}

	if (path === "/blog") {
		const posts = await getAllBlogPosts(defaultLocale);
		return `# Blog

${posts.map((p) => `- [${p.title}](${siteConfig.url}/blog/${p.slug}) — ${p.summary}`).join("\n")}
`;
	}

	const blogMatch = path.match(/^\/blog\/([^/]+)$/);
	if (blogMatch) {
		const slug = blogMatch[1];
		const post = await getBlogPostBySlug(slug, defaultLocale);
		if (!post) return null;
		return `# ${post.title}

${post.summary ? `> ${post.summary}\n\n` : ""}[Canonical URL](${siteConfig.url}/blog/${slug})

${post.content}
`;
	}

	if (path === "/projects") {
		const projects = await getAllProjects(defaultLocale);
		return `# Projects

${projects.map((p) => `- [${p.title}](${siteConfig.url}/projects/${p.slug}) — ${p.summary}`).join("\n")}
`;
	}

	const projectMatch = path.match(/^\/projects\/([^/]+)$/);
	if (projectMatch) {
		const slug = projectMatch[1];
		const project = await getProjectBySlug(slug, defaultLocale);
		if (!project) return null;
		return `# ${project.title}

${project.summary ? `> ${project.summary}\n\n` : ""}[Canonical URL](${siteConfig.url}/projects/${slug})

${project.content}
`;
	}

	if (path === "/archive") {
		return `# Archive

Chronological archive of blog posts: ${siteConfig.url}/archive
`;
	}

	return null;
}

const markdownNegotiationMiddleware = createMiddleware().server(
	async ({ next, request }) => {
		const ctx = getStartContext({ throwIfNotFound: false });
		if (!ctx) {
			return next();
		}
		// Newer TanStack Start adds handlerType; omitting a direct property access keeps
		// tsc happy when the lockfile resolves an older @tanstack/start-storage-context.
		if (
			"handlerType" in ctx &&
			(ctx as { handlerType?: string }).handlerType !== "router"
		) {
			return next();
		}
		if (request.method !== "GET" && request.method !== "HEAD") {
			return next();
		}
		if (!acceptsMarkdown(request)) {
			return next();
		}

		const url = new URL(request.url);
		const markdown = await markdownForPath(url.pathname);
		if (!markdown) {
			return next();
		}

		const tokens = approximateTokenCount(markdown);
		const headers = new Headers({
			"Content-Type": "text/markdown; charset=utf-8",
			"x-markdown-tokens": String(tokens),
			"Cache-Control": "public, max-age=300",
		});

		if (request.method === "HEAD") {
			return new Response(null, { status: 200, headers });
		}

		return new Response(markdown, { status: 200, headers });
	},
);

export const startInstance = createStart(() => ({
	requestMiddleware: [markdownNegotiationMiddleware],
}));
