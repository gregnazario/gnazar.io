import { createFileRoute } from "@tanstack/react-router";

import { getAllBlogPosts, getAllProjects } from "@/lib/content-i18n";
import { defaultLocale, locales, localeToHreflang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

function toLastmod(date?: string): string | undefined {
	return date ? new Date(date).toISOString() : undefined;
}

type UrlEntry = {
	loc: string;
	lastmod?: string;
	alternates?: string;
};

function localizedPaths(path: string): string[] {
	const cleanPath = path === "/" ? "" : path;
	return locales.map((locale) =>
		locale === defaultLocale ? cleanPath : `/${locale}${cleanPath}`,
	);
}

// Only the home page has complete, maintained translations, so per the
// hreflang policy in __root only its entries carry the alternate cluster.
// Content pages without a translated equivalent intentionally omit hreflang
// instead of pointing search engines to a mismatched page.
function homeAlternatesMarkup(): string {
	const hrefs = localizedPaths("/");
	return locales
		.map(
			(locale, i) =>
				`<xhtml:link rel="alternate" hreflang="${localeToHreflang[locale]}" href="${siteConfig.url}${hrefs[i]}"/>`,
		)
		.join("\n    ");
}

function renderUrl(entry: UrlEntry): string {
	const parts = [`<loc>${entry.loc}</loc>`];
	if (entry.alternates) {
		parts.push(entry.alternates);
	}
	if (entry.lastmod) {
		parts.push(`<lastmod>${entry.lastmod}</lastmod>`);
	}
	return `  <url>
    ${parts.join("\n    ")}
  </url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: async () => {
				const [posts, projects] = await Promise.all([
					getAllBlogPosts(defaultLocale),
					getAllProjects(defaultLocale),
				]);

				const latestPostDate = toLastmod(
					posts[0]?.lastUpdated || posts[0]?.date,
				);
				const homeAlternates = homeAlternatesMarkup();

				const entries: UrlEntry[] = [];

				for (const path of localizedPaths("/")) {
					entries.push({
						loc: `${siteConfig.url}${path}`,
						lastmod: latestPostDate,
						alternates: homeAlternates,
					});
				}
				for (const path of localizedPaths("/blog")) {
					entries.push({
						loc: `${siteConfig.url}${path}`,
						lastmod: latestPostDate,
					});
				}
				for (const path of localizedPaths("/projects")) {
					entries.push({ loc: `${siteConfig.url}${path}` });
				}

				// /archive exists only at the default path (no /$locale/archive route)
				entries.push({
					loc: `${siteConfig.url}/archive`,
					lastmod: latestPostDate,
				});
				entries.push({
					loc: `${siteConfig.url}/tags`,
					lastmod: latestPostDate,
				});

				for (const post of posts) {
					const lastmod = toLastmod(post.lastUpdated || post.date);
					for (const path of localizedPaths(`/blog/${post.slug}`)) {
						entries.push({ loc: `${siteConfig.url}${path}`, lastmod });
					}
				}

				for (const project of projects) {
					for (const path of localizedPaths(`/projects/${project.slug}`)) {
						entries.push({ loc: `${siteConfig.url}${path}` });
					}
				}

				// Tag pages exist only at the default path
				const tagLastmod = new Map<string, string | undefined>();
				for (const post of posts) {
					for (const tag of post.tags) {
						if (!tagLastmod.has(tag)) {
							tagLastmod.set(tag, toLastmod(post.lastUpdated || post.date));
						}
					}
				}
				for (const [tag, lastmod] of tagLastmod) {
					entries.push({
						loc: `${siteConfig.url}/tags/${encodeURIComponent(tag)}`,
						lastmod,
					});
				}

				const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(renderUrl).join("\n")}
</urlset>`;

				return new Response(xml, {
					status: 200,
					headers: {
						"Content-Type": "application/xml; charset=utf-8",
						"Cache-Control": "public, max-age=3600",
					},
				});
			},
		},
	},
});
