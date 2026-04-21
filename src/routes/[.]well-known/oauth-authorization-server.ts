import { createFileRoute } from "@tanstack/react-router";

/** No OAuth authorization server on this origin — avoid misleading RFC 8414-style 200 responses. */
const body = {
	error: "not_found",
	error_description:
		"gnazar.io is a static site and does not expose an OAuth 2.0 authorization server on this origin.",
};

export const Route = createFileRoute("/.well-known/oauth-authorization-server")(
	{
		server: {
			handlers: {
				GET: () =>
					new Response(JSON.stringify(body), {
						status: 404,
						headers: {
							"Content-Type": "application/json; charset=utf-8",
							"Cache-Control": "public, max-age=86400",
						},
					}),
			},
		},
	},
);
