import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "@/lib/site";

const body = {
	issuer: siteConfig.url,
	error: "not_configured",
	error_description:
		"gnazar.io is a static site and does not expose an OAuth 2.0 authorization server on this origin.",
};

export const Route = createFileRoute("/.well-known/oauth-authorization-server")(
	{
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
	},
);
