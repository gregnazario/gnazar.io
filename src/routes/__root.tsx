import {
	createRootRoute,
	HeadContent,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/components/NotFound";
import Search from "@/components/Search";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import {
	addLocaleToPath,
	defaultLocale,
	getLocaleFromPath,
	locales,
	localeToHreflang,
	t,
} from "@/lib/i18n";
import { LocaleProvider } from "@/lib/locale-context";
import { registerServiceWorker } from "@/lib/pwa";
import { siteConfig } from "@/lib/site";
import { fetchSearchIndex, type SearchItem } from "@/server/search";

import appCss from "@/styles.css?url";

// JSON-LD structured data for SEO
const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebSite",
			"@id": `${siteConfig.url}/#website`,
			url: siteConfig.url,
			name: siteConfig.title,
			description: siteConfig.description,
			inLanguage: "en-US",
		},
		{
			"@type": "Person",
			"@id": `${siteConfig.url}/#person`,
			name: siteConfig.title,
			url: siteConfig.url,
			description: siteConfig.description,
			jobTitle: "Founding Senior Software Engineer",
			worksFor: {
				"@type": "Organization",
				name: "Aptos Labs",
			},
			sameAs: [
				siteConfig.social.github,
				siteConfig.social.linkedin,
				siteConfig.social.twitter,
			],
		},
	],
};

// Generate hreflang links for all locales
function getHreflangLinks(currentPath: string) {
	const links = locales.map((locale) => ({
		rel: "alternate",
		hrefLang: localeToHreflang[locale],
		href:
			locale === defaultLocale
				? `${siteConfig.url}${currentPath === "/" ? "" : currentPath}`
				: `${siteConfig.url}${addLocaleToPath(currentPath, locale)}`,
	}));

	// Add x-default pointing to English version
	links.push({
		rel: "alternate",
		hrefLang: "x-default",
		href: `${siteConfig.url}${currentPath === "/" ? "" : currentPath}`,
	});

	return links;
}

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: siteConfig.title },
			{ name: "description", content: siteConfig.description },
			// Open Graph
			{ property: "og:title", content: siteConfig.title },
			{ property: "og:description", content: siteConfig.description },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: siteConfig.url },
			{ property: "og:site_name", content: siteConfig.title },
			{ property: "og:locale", content: siteConfig.locale },
			{ property: "og:image", content: `${siteConfig.url}/og-image.png` },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ property: "og:image:alt", content: siteConfig.title },
			// Twitter
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:site", content: siteConfig.twitterHandle },
			{ name: "twitter:creator", content: siteConfig.twitterHandle },
			{ name: "twitter:title", content: siteConfig.title },
			{ name: "twitter:description", content: siteConfig.description },
			{ name: "twitter:image", content: `${siteConfig.url}/og-image.png` },
			{ name: "twitter:image:alt", content: siteConfig.title },
			// PWA meta tags
			{ name: "theme-color", content: "#45d38a" },
			{ name: "mobile-web-app-capable", content: "yes" },
			{ name: "apple-mobile-web-app-capable", content: "yes" },
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent",
			},
			{ name: "apple-mobile-web-app-title", content: siteConfig.title },
		],
		links: [
			// Performance: Preconnect to external resources
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			// DNS prefetch for external resources
			{ rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
			{ rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
			{ rel: "stylesheet", href: appCss },
			// Fonts loaded after critical CSS - display: swap ensures no FOIT
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
			},
			// Prefetch critical routes for faster navigation
			{ rel: "prefetch", href: "/blog" },
			{ rel: "prefetch", href: "/projects" },
			{ rel: "canonical", href: siteConfig.url },
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
			{ rel: "icon", href: "/favicon.ico" },
			// RSS feed autodiscovery
			{
				rel: "alternate",
				type: "application/rss+xml",
				title: `${siteConfig.title} RSS Feed`,
				href: "/rss.xml",
			},
			// Webmention endpoints for IndieWeb support (webmention.io)
			{ rel: "webmention", href: "https://webmention.io/gnazar.io/webmention" },
			{ rel: "pingback", href: "https://webmention.io/gnazar.io/xmlrpc" },
			// i18n - hreflang for all locales
			...getHreflangLinks("/"),
			// PWA manifest
			{ rel: "manifest", href: "/manifest.json" },
			{ rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(jsonLd),
			},
			// Plausible Analytics (privacy-friendly, no cookies)
			{
				defer: true,
				"data-domain": "gnazar.io",
				src: "https://plausible.io/js/script.js",
			},
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const routerState = useRouterState();
	const locale = getLocaleFromPath(routerState.location.pathname);
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchItems, setSearchItems] = useState<SearchItem[]>([]);

	useEffect(() => {
		registerServiceWorker();
	}, []);

	useEffect(() => {
		type ModelContextApi = {
			registerTool?: (tool: {
				name: string;
				description: string;
				inputSchema: Record<string, unknown>;
				execute: (args: unknown, options?: { signal?: AbortSignal }) => unknown;
			}) => { unregister?: () => void } | undefined;
		};
		const modelContext = (
			navigator as Navigator & { modelContext?: ModelContextApi }
		).modelContext;
		if (!modelContext?.registerTool) return;

		const cleanups: Array<() => void> = [];

		const navTool = modelContext.registerTool({
			name: "navigate",
			description:
				"Go to a path on gnazar.io (same-origin), for example /blog or /projects.",
			inputSchema: {
				type: "object",
				additionalProperties: false,
				properties: {
					path: {
						type: "string",
						description: "Absolute path on this site, starting with /",
					},
				},
				required: ["path"],
			},
			execute: (args) => {
				const raw =
					args &&
					typeof args === "object" &&
					"path" in args &&
					typeof (args as { path?: unknown }).path === "string"
						? (args as { path: string }).path
						: "/";
				// Reject protocol-relative URLs and other off-origin targets.
				if (
					raw.startsWith("//") ||
					raw.includes(":\\") ||
					raw.includes("%5c")
				) {
					return { ok: false, error: "invalid_path" };
				}
				const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
				let resolved: URL;
				try {
					resolved = new URL(withSlash, window.location.origin);
				} catch {
					return { ok: false, error: "invalid_path" };
				}
				if (resolved.origin !== window.location.origin) {
					return { ok: false, error: "cross_origin" };
				}
				const path = `${resolved.pathname}${resolved.search}${resolved.hash}`;
				window.location.assign(path);
				return { ok: true, path };
			},
		});
		if (
			navTool &&
			typeof navTool === "object" &&
			typeof navTool.unregister === "function"
		) {
			cleanups.push(() => navTool.unregister?.());
		}

		const searchTool = modelContext.registerTool({
			name: "open_site_search",
			description:
				"Open the in-site search overlay (keyboard shortcut overlay).",
			inputSchema: {
				type: "object",
				additionalProperties: false,
				properties: {},
			},
			execute: () => {
				window.dispatchEvent(new CustomEvent("gnazar:open-search"));
				return { ok: true };
			},
		});
		if (
			searchTool &&
			typeof searchTool === "object" &&
			typeof searchTool.unregister === "function"
		) {
			cleanups.push(() => searchTool.unregister?.());
		}

		return () => {
			for (const fn of cleanups) fn();
		};
	}, []);

	// Load search index on first open
	useEffect(() => {
		if (searchOpen && searchItems.length === 0) {
			fetchSearchIndex()
				.then(setSearchItems)
				.catch((error) => {
					console.error("Failed to load search index:", error);
					// Search will still open but with empty results
					// User can retry by closing and reopening search
				});
		}
	}, [searchOpen, searchItems.length]);

	const handleSearchOpen = useCallback(() => {
		setSearchOpen(true);
	}, []);

	const handleSearchClose = useCallback(() => {
		setSearchOpen(false);
	}, []);

	// Keyboard shortcuts
	useKeyboardShortcuts({
		onSearch: handleSearchOpen,
	});

	return (
		<html lang={locale}>
			<head>
				<HeadContent />
			</head>
			<body className="site-body">
				<LocaleProvider locale={locale}>
					<a className="skip-link" href="#main-content">
						{t(locale, "skipToContent")}
					</a>
					<SiteHeader onSearchOpen={handleSearchOpen} />
					<ErrorBoundary>
						<main id="main-content">{children}</main>
					</ErrorBoundary>
					<SiteFooter />
					<Search
						items={searchItems}
						isOpen={searchOpen}
						onClose={handleSearchClose}
					/>
				</LocaleProvider>
				<Scripts />
			</body>
		</html>
	);
}
