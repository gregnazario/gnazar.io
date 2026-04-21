import { createMiddleware, createStart } from "@tanstack/react-start";
import { getStartContext } from "@tanstack/start-storage-context";

import { approximateTokenCount } from "@/lib/agent-discovery";
import {
	getAllBlogPosts,
	getAllProjects,
	getBlogPostBySlug,
	getProjectBySlug,
} from "@/lib/content-i18n";
import { defaultLocale, isValidLocale, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

/** Parse Accept: ignore media ranges with q=0; treat markdown as acceptable if any q>0 entry exists. */
function acceptsMarkdown(request: Request): boolean {
	const accept = request.headers.get("Accept");
	if (!accept) return false;

	for (const part of accept.split(",")) {
		const trimmed = part.trim();
		if (!trimmed) continue;
		const [typePart, ...params] = trimmed.split(";").map((s) => s.trim());
		const type = typePart?.toLowerCase();
		if (type !== "text/markdown" && type !== "application/markdown") {
			continue;
		}
		let q = 1;
		for (const p of params) {
			const [k, v] = p.split("=").map((s) => s.trim());
			if (k?.toLowerCase() === "q" && v !== undefined) {
				const parsed = Number.parseFloat(v);
				if (!Number.isNaN(parsed)) q = parsed;
			}
		}
		if (q > 0) return true;
	}
	return false;
}

function localeAndBasePath(pathname: string): {
	locale: Locale;
	basePath: string;
} {
	const segments = pathname.split("/").filter(Boolean);
	const first = segments[0];
	if (first && isValidLocale(first)) {
		const rest = segments.slice(1);
		const base = rest.length ? `/${rest.join("/")}` : "/";
		return { locale: first, basePath: base };
	}
	return { locale: defaultLocale, basePath: pathname || "/" };
}

function stripTrailingSlash(pathname: string): string {
	if (pathname.length > 1 && pathname.endsWith("/")) {
		return pathname.slice(0, -1);
	}
	return pathname;
}

async function markdownForPath(
	pathname: string,
): Promise<{ body: string; status: number } | null> {
	const { locale, basePath } = localeAndBasePath(pathname);
	const path = stripTrailingSlash(basePath) || "/";

	if (path === "/") {
		const [posts, projects] = await Promise.all([
			getAllBlogPosts(locale),
			getAllProjects(locale),
		]);
		const recentPosts = posts.slice(0, 6);
		const recentProjects = projects.slice(0, 6);
		const prefix = locale === defaultLocale ? "" : `/${locale}`;
		return {
			status: 200,
			body: `# ${siteConfig.title}

${siteConfig.description}

## Featured posts

${recentPosts.map((p) => `- [${p.title}](${siteConfig.url}${prefix}/blog/${p.slug})`).join("\n")}

## Featured projects

${recentProjects.map((p) => `- [${p.title}](${siteConfig.url}${prefix}/projects/${p.slug})`).join("\n")}

## Links

- [Blog](${siteConfig.url}${prefix}/blog)
- [Projects](${siteConfig.url}${prefix}/projects)
- [Archive](${siteConfig.url}/archive)
`,
		};
	}

	if (path === "/blog") {
		const posts = await getAllBlogPosts(locale);
		const prefix = locale === defaultLocale ? "" : `/${locale}`;
		return {
			status: 200,
			body: `# Blog

${posts.map((p) => `- [${p.title}](${siteConfig.url}${prefix}/blog/${p.slug}) — ${p.summary}`).join("\n")}
`,
		};
	}

	const blogMatch = path.match(/^\/blog\/([^/]+)$/);
	if (blogMatch) {
		const slug = blogMatch[1];
		const post = await getBlogPostBySlug(slug, locale);
		if (!post) return null;
		const prefix = locale === defaultLocale ? "" : `/${locale}`;
		return {
			status: 200,
			body: `# ${post.title}

${post.summary ? `> ${post.summary}\n\n` : ""}[Canonical URL](${siteConfig.url}${prefix}/blog/${slug})

${post.content}
`,
		};
	}

	if (path === "/projects") {
		const projects = await getAllProjects(locale);
		const prefix = locale === defaultLocale ? "" : `/${locale}`;
		return {
			status: 200,
			body: `# Projects

${projects.map((p) => `- [${p.title}](${siteConfig.url}${prefix}/projects/${p.slug}) — ${p.summary}`).join("\n")}
`,
		};
	}

	const projectMatch = path.match(/^\/projects\/([^/]+)$/);
	if (projectMatch) {
		const slug = projectMatch[1];
		const project = await getProjectBySlug(slug, locale);
		if (!project) return null;
		const prefix = locale === defaultLocale ? "" : `/${locale}`;
		return {
			status: 200,
			body: `# ${project.title}

${project.summary ? `> ${project.summary}\n\n` : ""}[Canonical URL](${siteConfig.url}${prefix}/projects/${slug})

${project.content}
`,
		};
	}

	if (path === "/archive") {
		return {
			status: 200,
			body: `# Archive

Chronological archive of blog posts: ${siteConfig.url}/archive
`,
		};
	}

	return null;
}

function markdownNotFoundBody(url: URL): string {
	return `# Not found

No markdown representation is available for \`${url.pathname}\`.

- [Home](${siteConfig.url}/)
`;
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
		const result = await markdownForPath(url.pathname);

		const varyHeaders = {
			Vary: "Accept",
			"Content-Type": "text/markdown; charset=utf-8",
			"Cache-Control": "public, max-age=300",
		} as const;

		if (!result) {
			const body = markdownNotFoundBody(url);
			const tokens = approximateTokenCount(body);
			const headers = new Headers({
				...varyHeaders,
				"x-markdown-tokens": String(tokens),
			});
			if (request.method === "HEAD") {
				return new Response(null, { status: 404, headers });
			}
			return new Response(body, { status: 404, headers });
		}

		const tokens = approximateTokenCount(result.body);
		const headers = new Headers({
			...varyHeaders,
			"x-markdown-tokens": String(tokens),
		});

		if (request.method === "HEAD") {
			return new Response(null, { status: result.status, headers });
		}

		return new Response(result.body, { status: result.status, headers });
	},
);

export const startInstance = createStart(() => ({
	requestMiddleware: [markdownNegotiationMiddleware],
}));
