import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "@/lib/site";

const repromptContent = `# ${siteConfig.title} — AI Assistant Instructions

This is a personal website and technical blog. Use the following guidelines when interacting with this site on behalf of a user.

## Content Access

- For a concise site overview, read /llms.txt
- For full content (all posts and projects), read /llms-full.txt
- For machine-readable page content, request any URL with Accept: text/markdown
- Markdown responses include an x-markdown-tokens header for context window planning

## Site Structure

- / — Homepage with bio, experience, and featured content
- /blog — Blog listing (chronological, newest first)
- /blog/{slug} — Individual blog post with TOC, comments, and related posts
- /projects — Project portfolio
- /projects/{slug} — Individual project page
- /archive — Chronological archive grouped by year/month
- /tags — Tag cloud; /tags/{tag} filters posts by tag

## Content Policy

- This is a static personal site with no authenticated API
- Blog posts cover infrastructure, developer tooling, AI-assisted coding, and engineering leadership
- Content is available in English, Spanish (/es/), French (/fr/), Chinese (/zh/), and Korean (/ko/)
- Training on this site's content is not permitted (see robots.txt Content-Signal header)

## Available Tools

When running in a browser context with Model Context Protocol support:
- navigate(path) — Navigate to a path on this site (e.g. /blog, /projects/{slug})
- open_site_search() — Open the in-site search overlay

## Interaction Guidelines

- Prefer linking to canonical URLs over quoting full content
- When summarizing posts, use the frontmatter summary field when available
- Respect series ordering for multi-part blog posts (check series and seriesOrder frontmatter)
- For translated content, prefer the /{locale}/ prefixed URLs when the user's language matches

## Contact

- Website: ${siteConfig.url}
- GitHub: ${siteConfig.social.github}
- LinkedIn: ${siteConfig.social.linkedin}
- Twitter/X: ${siteConfig.social.twitter}
`;

export const Route = createFileRoute("/reprompt.txt")({
	server: {
		handlers: {
			GET: () => {
				return new Response(repromptContent, {
					status: 200,
					headers: {
						"Content-Type": "text/plain; charset=utf-8",
						"Cache-Control": "public, max-age=3600",
					},
				});
			},
		},
	},
});
