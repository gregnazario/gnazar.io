import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "@/lib/site";

const spec = {
	openapi: "3.1.0",
	info: {
		title: siteConfig.title,
		version: "1.0.0",
		description:
			"This origin is a static personal website. There is no authenticated HTTP API on gnazar.io.",
	},
	servers: [{ url: siteConfig.url }],
	paths: {},
} as const;

export const Route = createFileRoute("/.well-known/openapi.json")({
	server: {
		handlers: {
			GET: () =>
				new Response(JSON.stringify(spec), {
					status: 200,
					headers: {
						"Content-Type": "application/json; charset=utf-8",
						"Cache-Control": "public, max-age=86400",
					},
				}),
		},
	},
});
