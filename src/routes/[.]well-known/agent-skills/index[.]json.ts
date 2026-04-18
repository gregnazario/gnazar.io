import { createFileRoute } from "@tanstack/react-router";

import { SITE_AGENT_SKILL_MD, sha256HexOfString } from "@/lib/agent-discovery";
import { siteConfig } from "@/lib/site";

const skillUrl = `${siteConfig.url}/.well-known/agent-skills/site.md`;
const digest = `sha256:${sha256HexOfString(SITE_AGENT_SKILL_MD)}`;

const body = {
	$schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
	skills: [
		{
			name: "gnazar-site-overview",
			type: "skill-md",
			description:
				"Canonical URLs, content policy, and discovery pointers for gnazar.io (static personal site).",
			url: skillUrl,
			digest,
		},
	],
};

export const Route = createFileRoute("/.well-known/agent-skills/index.json")({
	server: {
		handlers: {
			GET: () =>
				new Response(JSON.stringify(body), {
					status: 200,
					headers: {
						"Content-Type": "application/json; charset=utf-8",
						"Cache-Control": "public, max-age=3600",
					},
				}),
		},
	},
});
