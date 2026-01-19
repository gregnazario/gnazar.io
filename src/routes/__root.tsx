import {
	HeadContent,
	Link,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/lib/site";

import appCss from "@/styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: siteConfig.title },
			{ name: "description", content: siteConfig.description },
			{ property: "og:title", content: siteConfig.title },
			{ property: "og:description", content: siteConfig.description },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: siteConfig.url },
			{ name: "twitter:card", content: "summary_large_image" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
			{ rel: "icon", href: "/favicon.ico" },
			{ rel: "alternate", type: "application/rss+xml", href: "/rss.xml" },
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="site-body">
				<a className="skip-link" href="#main-content">
					Skip to content
				</a>
				<SiteHeader />
				<main id="main-content">{children}</main>
				<SiteFooter />
				<Scripts />
			</body>
		</html>
	);
}

function NotFound() {
	return (
		<section className="section">
			<div className="container">
				<div className="card">
					<h2>Page not found</h2>
					<p>That page does not exist. Head back to the homepage.</p>
					<Link className="button ghost" to="/">
						Go home
					</Link>
				</div>
			</div>
		</section>
	);
}
