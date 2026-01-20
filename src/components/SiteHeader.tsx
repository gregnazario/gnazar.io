import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import {
	addLocaleToPath,
	defaultLocale,
	removeLocaleFromPath,
	t,
} from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { siteConfig } from "@/lib/site";

export default function SiteHeader() {
	const locale = useLocale();
	const routerState = useRouterState();
	const currentPath = routerState.location.pathname;
	const basePath = removeLocaleFromPath(currentPath);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navItems = [
		{ to: "/", label: t(locale, "home") },
		{ to: "/blog", label: t(locale, "blog") },
		{ to: "/projects", label: t(locale, "projects") },
	];

	const getLocalizedPath = (path: string) => {
		return locale === defaultLocale ? path : addLocaleToPath(path, locale);
	};

	const isActive = (to: string) => {
		if (to === "/") {
			return basePath === "/" || basePath === "";
		}
		return basePath.startsWith(to);
	};

	// Close menu on route change
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally trigger on path change
	useEffect(() => {
		setIsMenuOpen(false);
	}, [currentPath]);

	// Close menu on escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, []);

	return (
		<header className="site-header">
			<div className="container header-inner">
				<Link className="logo" to={getLocalizedPath("/")}>
					<img
						src="/favicon.svg"
						alt={siteConfig.title}
						className="logo-icon"
						width={32}
						height={32}
					/>
				</Link>

				<button
					type="button"
					className="menu-toggle"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-expanded={isMenuOpen}
					aria-controls="primary-nav"
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				>
					<span className="menu-icon" aria-hidden="true">
						{isMenuOpen ? "✕" : "☰"}
					</span>
				</button>

				<nav
					id="primary-nav"
					className={`nav ${isMenuOpen ? "nav-open" : ""}`}
					aria-label="Primary"
				>
					{navItems.map((item) => (
						<Link
							key={item.to}
							to={getLocalizedPath(item.to)}
							aria-current={isActive(item.to) ? "page" : undefined}
						>
							{item.label}
						</Link>
					))}
					<LanguageSwitcher currentLocale={locale} />
					<ThemeToggle />
				</nav>
			</div>
		</header>
	);
}
