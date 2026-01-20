import {
	createRootRoute,
	HeadContent,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";

import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/components/NotFound";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
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
			{ rel: "stylesheet", href: appCss },
			{ rel: "canonical", href: siteConfig.url },
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
			{ rel: "icon", href: "/favicon.ico" },
			{ rel: "alternate", type: "application/rss+xml", href: "/rss.xml" },
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
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const routerState = useRouterState();
	const locale = getLocaleFromPath(routerState.location.pathname);

	useEffect(() => {
		registerServiceWorker();
	}, []);

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
					<SiteHeader />
					<ErrorBoundary>
						<main id="main-content">{children}</main>
					</ErrorBoundary>
					<SiteFooter />
				</LocaleProvider>
				<Scripts />
			</body>
		</html>
	);
}
