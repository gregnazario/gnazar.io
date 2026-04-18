import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "@/lib/site";

const card = {
	serverInfo: {
		name: siteConfig.title,
		version: "1.0.0",
	},
	description:
		"Personal static site. No Model Context Protocol streamable HTTP server is hosted on this origin; this card is for discovery metadata only.",
	endpoint: `${siteConfig.url}/`,
	capabilities: {
		tools: {},
		resources: {},
		prompts: {},
	},
};

export const Route = createFileRoute("/.well-known/mcp/server-card.json")({
	server: {
		handlers: {
			GET: () =>
				new Response(JSON.stringify(card), {
					status: 200,
					headers: {
						"Content-Type": "application/json; charset=utf-8",
						"Cache-Control": "public, max-age=86400",
					},
				}),
		},
	},
});
