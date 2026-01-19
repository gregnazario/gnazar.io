import { createFileRoute } from "@tanstack/react-router";

import { getAllBlogPosts, getAllProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const Route = createFileRoute("/sitemap/xml")({
	server: {
		handlers: {
			GET: async () => {
				const [posts, projects] = await Promise.all([
					getAllBlogPosts(),
					getAllProjects(),
				]);
				const now = new Date();
				const urls = [
					{
						loc: siteConfig.url,
						lastmod: now,
					},
					{
						loc: `${siteConfig.url}/blog`,
						lastmod: now,
					},
					{
						loc: `${siteConfig.url}/projects`,
						lastmod: now,
					},
					...posts.map((post) => ({
						loc: `${siteConfig.url}/blog/${post.slug}`,
						lastmod: post.date ? new Date(post.date) : now,
					})),
					...projects.map((project) => ({
						loc: `${siteConfig.url}/projects/${project.slug}`,
						lastmod: now,
					})),
				];

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
