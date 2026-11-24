/**
 * Policies netlify.toml sets for every path. The CDN only applies them to
 * static files, so server-rendered responses add them here as well.
 * Keep in sync with the `for = "/*"` block in netlify.toml (a test enforces it).
 *
 * HSTS is deliberately absent: enabling it (with includeSubDomains and preload)
 * belongs to the hosting configuration, not to the app server.
 */
export const securityHeaders: Readonly<Record<string, string>> = {
	"X-Content-Type-Options": "nosniff",
	"X-Frame-Options": "DENY",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"Permissions-Policy":
		"camera=(), microphone=(), geolocation=(), interest-cohort=()",
	"Content-Security-Policy":
		"default-src 'self'; script-src 'self' 'unsafe-inline' https://giscus.app https://plausible.io; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https:; connect-src 'self' https://plausible.io https://webmention.io; frame-src https://giscus.app; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
};

export function applySecurityHeaders(headers: Headers): void {
	for (const [name, value] of Object.entries(securityHeaders)) {
		headers.set(name, value);
	}
}
