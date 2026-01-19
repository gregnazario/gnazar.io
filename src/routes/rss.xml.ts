import { createFileRoute } from "@tanstack/react-router";

import { getAllBlogPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

function escapeXml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/rss.xml")({
	server: {
		handlers: {
			GET: async () => {
				const posts = await getAllBlogPosts();
				const items = posts
					.map((post) => {
						const link = `${siteConfig.url}/blog/${post.slug}`;
						const publishedAt = post.date ? new Date(post.date) : new Date();
						return `
              <item>
                <title>${escapeXml(post.title)}</title>
                <link>${link}</link>
                <guid>${link}</guid>
                <pubDate>${publishedAt.toUTCString()}</pubDate>
                <description>${escapeXml(post.summary)}</description>
              </item>
            `;
					})
					.join("");

				const feed = `<?xml version="1.0" encoding="UTF-8"?>
          <rss version="2.0">
            <channel>
              <title>${escapeXml(siteConfig.title)}</title>
              <link>${siteConfig.url}</link>
              <description>${escapeXml(siteConfig.description)}</description>
              ${items}
            </channel>
          </rss>`;

				return new Response(feed, {
					headers: {
						"Content-Type": "application/rss+xml; charset=utf-8",
					},
				});
			},
		},
	},
});
