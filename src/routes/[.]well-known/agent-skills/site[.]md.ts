import { createFileRoute } from "@tanstack/react-router";

import { SITE_AGENT_SKILL_MD } from "@/lib/agent-discovery";

export const Route = createFileRoute("/.well-known/agent-skills/site.md")({
	server: {
		handlers: {
			GET: () =>
				new Response(SITE_AGENT_SKILL_MD, {
					status: 200,
					headers: {
						"Content-Type": "text/markdown; charset=utf-8",
						"Cache-Control": "public, max-age=3600",
					},
				}),
		},
	},
});
