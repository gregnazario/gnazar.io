import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "@/lib/site";

const contentSignals = "Content-Signal: ai-train=no, search=yes, ai-input=no";

const aiUserAgents = [
	"GPTBot",
	"OAI-SearchBot",
	"Claude-Web",
	"Google-Extended",
	"Amazonbot",
	"anthropic-ai",
	"Bytespider",
	"CCBot",
	"Applebot-Extended",
] as const;

function blockForAgent(userAgent: string): string {
	return `User-agent: ${userAgent}
Allow: /
Disallow: /500
${contentSignals}

`;
}

export const Route = createFileRoute("/robots.txt")({
	server: {
		handlers: {
			GET: () => {
				const body = `${blockForAgent("*")}${aiUserAgents.map(blockForAgent).join("")}Sitemap: ${siteConfig.url}/sitemap.xml

# LLM/AI assistant overview (see https://llmstxt.org)
# LLMs-Txt: ${siteConfig.url}/llms.txt
`;

				return new Response(body, {
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
