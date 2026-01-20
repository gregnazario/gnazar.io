import { Link, useRouterState } from "@tanstack/react-router";

import ThemeToggle from "@/components/ThemeToggle";
import { siteConfig } from "@/lib/site";

const navItems = [
	{ to: "/", label: "Home" },
	{ to: "/blog", label: "Blog" },
	{ to: "/projects", label: "Projects" },
] as const;

export default function SiteHeader() {
	const routerState = useRouterState();
	const currentPath = routerState.location.pathname;

	const isActive = (to: string) => {
		if (to === "/") {
			return currentPath === "/";
		}
		return currentPath.startsWith(to);
	};

	return (
		<header className="site-header">
			<div className="container header-inner">
				<Link className="logo" to="/">
					{siteConfig.title}
				</Link>
				<nav className="nav" aria-label="Primary">
					{navItems.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							aria-current={isActive(item.to) ? "page" : undefined}
						>
							{item.label}
						</Link>
					))}
					<a
						className="button ghost"
						href={siteConfig.social.github}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub (opens in new tab)"
					>
						GitHub
						<span className="external-icon" aria-hidden="true">
							↗
						</span>
					</a>
					<ThemeToggle />
				</nav>
			</div>
		</header>
	);
}
