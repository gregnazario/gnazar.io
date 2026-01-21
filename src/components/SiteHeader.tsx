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

type SiteHeaderProps = {
	onSearchOpen?: () => void;
};

export default function SiteHeader({ onSearchOpen }: SiteHeaderProps) {
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
					<button
						type="button"
						className="search-trigger"
						onClick={onSearchOpen}
						aria-label="Search"
					>
						<svg
							className="search-trigger-icon"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
						</svg>
						<kbd>/</kbd>
					</button>
					<LanguageSwitcher currentLocale={locale} />
					<ThemeToggle />
				</nav>
			</div>
		</header>
	);
}
