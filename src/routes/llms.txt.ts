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
- /rss.xml - RSS feed for blog posts
- /sitemap.xml - XML sitemap for all pages

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

export const Route = createFileRoute("/llms/txt")({
	server: {
		handlers: {
			GET: () => {
				return new Response(llmsContent, {
					headers: {
						"Content-Type": "text/plain; charset=utf-8",
					},
				});
			},
		},
	},
});
