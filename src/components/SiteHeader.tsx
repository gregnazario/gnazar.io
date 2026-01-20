import { Link } from "@tanstack/react-router";

import ThemeToggle from "@/components/ThemeToggle";
import { siteConfig } from "@/lib/site";

const navItems = [
	{ to: "/", label: "Home" },
	{ to: "/blog", label: "Blog" },
	{ to: "/projects", label: "Projects" },
];

export default function SiteHeader() {
	return (
		<header className="site-header">
			<div className="container header-inner">
				<Link className="logo" to="/">
					{siteConfig.title}
				</Link>
				<nav className="nav" aria-label="Primary">
					{navItems.map((item) => (
						<Link key={item.to} to={item.to}>
							{item.label}
						</Link>
					))}
					<a className="button ghost" href={siteConfig.social.github}>
						GitHub
					</a>
					<ThemeToggle />
				</nav>
			</div>
		</header>
	);
}
