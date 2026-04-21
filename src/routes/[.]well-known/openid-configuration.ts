import { createFileRoute } from "@tanstack/react-router";

/** No OIDC provider on this origin — avoid a non-conformant 200 discovery document. */
const body = {
	error: "not_found",
	error_description:
		"gnazar.io is a static site and does not expose an OpenID Connect provider on this origin.",
};

export const Route = createFileRoute("/.well-known/openid-configuration")({
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
});
