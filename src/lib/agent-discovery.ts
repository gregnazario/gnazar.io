import { createHash } from "node:crypto";

import { siteConfig } from "@/lib/site";

/** Markdown body for the Agent Skills index `url` and digest source. */
export const SITE_AGENT_SKILL_MD = `# ${siteConfig.title} — agent skill

## Summary

${siteConfig.description}

## Canonical URLs

- Homepage: ${siteConfig.url}/
- Blog index: ${siteConfig.url}/blog
- Projects: ${siteConfig.url}/projects
- RSS: ${siteConfig.url}/rss.xml
- Sitemap: ${siteConfig.url}/sitemap.xml
- LLMs overview: ${siteConfig.url}/llms.txt
- API catalog (RFC 9727): ${siteConfig.url}/.well-known/api-catalog

## Policy

Public pages may be indexed. This is a static personal site; there is no authenticated API on this origin.
`;

export function sha256HexOfString(value: string): string {
	return createHash("sha256").update(value, "utf8").digest("hex");
}

export function approximateTokenCount(text: string): number {
	if (!text) return 0;
	return Math.max(1, Math.ceil(text.length / 4));
}
