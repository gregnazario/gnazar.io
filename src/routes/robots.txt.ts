import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "@/lib/site";

export const Route = createFileRoute("/robots/txt")({
	server: {
		handlers: {
			GET: () => {
				const body = `User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml

# LLM/AI Assistant information
# See https://llmstxt.org for the llms.txt specification
LLMs-Txt: ${siteConfig.url}/llms.txt
`;

				return new Response(body, {
					headers: {
						"Content-Type": "text/plain; charset=utf-8",
					},
				});
			},
		},
	},
});
