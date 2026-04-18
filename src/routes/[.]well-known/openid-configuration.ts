import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "@/lib/site";

const body = {
	issuer: siteConfig.url,
	error: "not_configured",
	error_description:
		"gnazar.io is a static site and does not expose an OpenID Connect provider on this origin.",
};

export const Route = createFileRoute("/.well-known/openid-configuration")({
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
