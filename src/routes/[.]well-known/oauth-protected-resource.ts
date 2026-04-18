import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "@/lib/site";

const body = {
	resource: `${siteConfig.url}/`,
	authorization_servers: [] as string[],
	scopes_supported: [] as string[],
};

export const Route = createFileRoute("/.well-known/oauth-protected-resource")({
	server: {
		handlers: {
			GET: () =>
				new Response(JSON.stringify(body), {
					status: 200,
					headers: {
						"Content-Type": "application/json; charset=utf-8",
						"Cache-Control": "public, max-age=86400",
					},
				}),
		},
	},
});
