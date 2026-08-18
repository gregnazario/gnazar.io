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
				const buildDate = new Date();
				const items = posts
					.map((post) => {
						const link = `${siteConfig.url}/blog/${post.slug}`;
						const publishedAt = post.date ? new Date(post.date) : buildDate;
						const categories = post.tags
							.map(
								(tag) =>
									`\n                <category>${escapeXml(tag)}</category>`,
							)
							.join("");
						return `
              <item>
                <title>${escapeXml(post.title)}</title>
                <link>${link}</link>
                <guid isPermaLink="true">${link}</guid>
                <pubDate>${publishedAt.toUTCString()}</pubDate>
                <description>${escapeXml(post.summary)}</description>${categories}
              </item>
            `;
					})
					.join("");

				const feed = `<?xml version="1.0" encoding="UTF-8"?>
          <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
              <title>${escapeXml(siteConfig.title)}</title>
              <link>${siteConfig.url}</link>
              <description>${escapeXml(siteConfig.description)}</description>
              <language>en-us</language>
              <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>
              <docs>https://www.rssboard.org/rss-2-0</docs>
              <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
              ${items}
            </channel>
          </rss>`;

				return new Response(feed, {
					status: 200,
					headers: {
						"Content-Type": "application/rss+xml; charset=utf-8",
						"Cache-Control": "public, max-age=3600",
					},
				});
			},
		},
	},
});
