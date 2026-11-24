import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { applySecurityHeaders, securityHeaders } from "./security-headers";

/** The header values netlify.toml sets on `/*`, which the CDN only applies to static files. */
function headersFromNetlifyConfig(): Record<string, string> {
	const toml = readFileSync(path.join(process.cwd(), "netlify.toml"), "utf-8");
	const block =
		toml.match(
			/for = "\/\*"\s*\n\s*\[headers\.values\]\s*\n((?:\s*[#\w][^\n]*\n)+)/,
		)?.[1] ?? "";
	const values: Record<string, string> = {};
	for (const [, key, value] of block.matchAll(/^\s*([\w-]+) = "(.*)"\s*$/gm)) {
		values[key] = value;
	}
	return values;
}

describe("security headers for server-rendered responses", () => {
	it("match the policies netlify.toml defines", () => {
		const netlify = headersFromNetlifyConfig();
		expect(Object.keys(netlify).length).toBeGreaterThan(0);
		for (const [name, value] of Object.entries(securityHeaders)) {
			expect(netlify[name], name).toBe(value);
		}
	});

	it("leave HSTS to the hosting configuration", () => {
		// Enabling HSTS (with includeSubDomains and preload) is a hosting-level
		// decision, not something the app server should switch on.
		expect(securityHeaders).not.toHaveProperty("Strict-Transport-Security");
	});

	it("are added to a response without disturbing its own headers", () => {
		const headers = new Headers({
			"Content-Type": "text/html",
			"Content-Signal": "ai-train=no",
		});
		applySecurityHeaders(headers);
		expect(headers.get("content-type")).toBe("text/html");
		expect(headers.get("content-signal")).toBe("ai-train=no");
		expect(headers.get("x-frame-options")).toBe("DENY");
		expect(headers.get("content-security-policy")).toContain(
			"frame-ancestors 'none'",
		);
	});
});
