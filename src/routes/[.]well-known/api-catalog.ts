import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "@/lib/site";

const body = {
	linkset: [
		{
			anchor: `${siteConfig.url}/`,
			"service-desc": [{ href: `${siteConfig.url}/.well-known/openapi.json` }],
			"service-doc": [{ href: `${siteConfig.url}/llms.txt` }],
			status: [{ href: `${siteConfig.url}/` }],
		},
	],
};

export const Route = createFileRoute("/.well-known/api-catalog")({
	server: {
		handlers: {
			GET: () =>
				new Response(JSON.stringify(body), {
					status: 200,
					headers: {
						"Content-Type": "application/linkset+json; charset=utf-8",
						"Cache-Control": "public, max-age=86400",
					},
				}),
		},
	},
});
