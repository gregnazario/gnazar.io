import { createFileRoute } from "@tanstack/react-router";

import { getAllBlogPosts, getAllProjects } from "@/lib/content-i18n";
import { defaultLocale, locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export const Route = createFileRoute("/sitemap/xml")({
	server: {
		handlers: {
			GET: async () => {
				const [posts, projects] = await Promise.all([
					getAllBlogPosts(defaultLocale),
					getAllProjects(defaultLocale),
				]);
				const now = new Date();

				// Generate URLs for all locales
				const urls: Array<{ loc: string; lastmod: Date }> = [];

				for (const locale of locales) {
					const prefix = locale === defaultLocale ? "" : `/${locale}`;

					// Static pages
					urls.push({
						loc: `${siteConfig.url}${prefix}`,
						lastmod: now,
					});
					urls.push({
						loc: `${siteConfig.url}${prefix}/blog`,
						lastmod: now,
					});
					urls.push({
						loc: `${siteConfig.url}${prefix}/projects`,
						lastmod: now,
					});

					// Blog posts
					for (const post of posts) {
						urls.push({
							loc: `${siteConfig.url}${prefix}/blog/${post.slug}`,
							lastmod: post.date ? new Date(post.date) : now,
						});
					}

					// Projects
					for (const project of projects) {
						urls.push({
							loc: `${siteConfig.url}${prefix}/projects/${project.slug}`,
							lastmod: now,
						});
					}
				}

				const xml = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urls
							.map(
								(entry) => `
              <url>
                <loc>${entry.loc}</loc>
                <lastmod>${entry.lastmod.toISOString()}</lastmod>
              </url>
            `,
							)
							.join("")}
          </urlset>`;

				return new Response(xml, {
					headers: {
						"Content-Type": "application/xml; charset=utf-8",
					},
				});
			},
		},
	},
});
