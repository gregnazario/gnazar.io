import { createMiddleware, createStart } from "@tanstack/react-start";

import { approximateTokenCount } from "@/lib/agent-discovery";
import {
	getAllBlogPosts,
	getAllProjects,
	getBlogPostBySlug,
	getProjectBySlug,
} from "@/lib/content-i18n";
import { defaultLocale, isValidLocale, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

type AcceptRange = { type: string; q: number; index: number };

function parseAcceptRanges(accept: string): AcceptRange[] {
	const out: AcceptRange[] = [];
	let index = 0;
	for (const part of accept.split(",")) {
		const trimmed = part.trim();
		if (!trimmed) continue;
		const [typePart, ...params] = trimmed.split(";").map((s) => s.trim());
		const type = typePart?.toLowerCase() ?? "";
		let q = 1;
		for (const p of params) {
			const [k, v] = p.split("=").map((s) => s.trim());
			if (k?.toLowerCase() === "q" && v !== undefined) {
				const parsed = Number.parseFloat(v);
				if (!Number.isNaN(parsed)) q = parsed;
			}
		}
		out.push({ type, q, index: index++ });
	}
	return out;
}

function isMarkdownType(type: string): boolean {
	return type === "text/markdown" || type === "application/markdown";
}

/**
 * Serve markdown only when it wins over other positive-q alternatives in the
 * Accept list (higher q first; at equal q, earlier listed type wins per RFC 7231).
 */
function prefersMarkdownResponse(request: Request): boolean {
	const accept = request.headers.get("Accept");
	if (!accept) return false;

	const ranges = parseAcceptRanges(accept).filter((r) => r.q > 0);
	if (ranges.length === 0) return false;
	if (!ranges.some((r) => isMarkdownType(r.type))) return false;

	const sorted = [...ranges].sort((a, b) => {
		if (b.q !== a.q) return b.q - a.q;
		return a.index - b.index;
	});
	const winner = sorted[0];
	return isMarkdownType(winner.type);
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

function isPageLikePath(pathname: string): boolean {
	const segments = pathname.split("/").filter(Boolean);
	const baseSegments =
		segments[0] && isValidLocale(segments[0]) ? segments.slice(1) : segments;

	if (
		baseSegments.some(
			(segment) => segment.startsWith(".") || segment.startsWith("_"),
		)
	) {
		return false;
	}
	if (baseSegments[0] === "api") {
		return false;
	}

	const lastSegment = baseSegments.at(-1) ?? "";
	return !lastSegment.includes(".");
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

	if (path === "/tags") {
		const posts = await getAllBlogPosts(locale);
		const tagCounts = new Map<string, number>();
		for (const post of posts) {
			for (const tag of post.tags) {
				tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
			}
		}
		const tags = Array.from(tagCounts.entries())
			.map(([tag, count]) => ({ tag, count }))
			.sort((a, b) => {
				if (b.count !== a.count) return b.count - a.count;
				return a.tag.localeCompare(b.tag);
			});
		const prefix = locale === defaultLocale ? "" : `/${locale}`;
		return {
			status: 200,
			body: `# Tags

${tags.map((t) => `- [${t.tag}](${siteConfig.url}${prefix}/tags/${encodeURIComponent(t.tag)}) (${t.count})`).join("\n")}
`,
		};
	}

	const tagMatch = path.match(/^\/tags\/([^/]+)$/);
	if (tagMatch) {
		const param = decodeURIComponent(tagMatch[1]);
		const posts = await getAllBlogPosts(locale);
		const filtered = posts.filter((post) =>
			post.tags.some((t) => t.toLowerCase() === param.toLowerCase()),
		);
		const actualTag =
			filtered[0]?.tags.find((t) => t.toLowerCase() === param.toLowerCase()) ??
			param;
		const prefix = locale === defaultLocale ? "" : `/${locale}`;
		return {
			status: 200,
			body: `# #${actualTag}

${filtered.map((p) => `- [${p.title}](${siteConfig.url}${prefix}/blog/${p.slug})`).join("\n")}
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
		if (request.method !== "GET" && request.method !== "HEAD") {
			return next();
		}
		if (!prefersMarkdownResponse(request)) {
			return next();
		}

		const url = new URL(request.url);
		if (!isPageLikePath(url.pathname)) {
			return next();
		}

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
