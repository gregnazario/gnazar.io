import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "@/lib/site";

const llmsContent = `# ${siteConfig.title}

> ${siteConfig.description}

## About

Greg Nazario is a Founding Senior Software Engineer at Aptos Labs with over 12 years of experience in infrastructure, developer tooling, and engineering leadership. Previously worked at AWS and Meta.

## Site Structure

- / - Homepage with bio, experience highlights, and featured content
- /blog - Technical blog posts about infrastructure, systems, and software engineering
- /projects - Portfolio of projects and open source contributions
- /archive - Chronological blog archive
- /rss.xml - RSS feed for blog posts
- /sitemap.xml - XML sitemap for all pages
- /.well-known/api-catalog - RFC 9727 API catalog (static site; no authenticated HTTP API)
- /.well-known/agent-skills/index.json - Agent skills discovery index
- /llms-full.txt - Full-text content dump (all posts and projects)
- /reprompt.txt - AI assistant interaction instructions

## Topics Covered

- Infrastructure scaling and reliability
- Developer tooling and platforms
- Blockchain technology (Aptos)
- Engineering leadership and mentorship
- Cloud computing (AWS, distributed systems)

## Contact & Social

- Website: ${siteConfig.url}
- GitHub: ${siteConfig.social.github}
- LinkedIn: ${siteConfig.social.linkedin}
- Twitter: ${siteConfig.social.twitter}

## Technical Stack

This site is built with TanStack Start (React), deployed on Netlify, and uses TypeScript throughout.
`;

export const Route = createFileRoute("/llms.txt")({
	server: {
		handlers: {
			GET: () => {
				return new Response(llmsContent, {
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
