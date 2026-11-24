import { useEffect, useState } from "react";
import { type Locale, t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

type ThemeMode = "light" | "dark";

const storageKey = "theme";

function getPreferredTheme(): ThemeMode {
	if (typeof window === "undefined") {
		return "light";
	}

	const stored = window.localStorage.getItem(storageKey) as ThemeMode | null;
	if (stored === "light" || stored === "dark") {
		return stored;
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

// The meta tags ship prefers-color-scheme variants, but a persisted
// data-theme override should also recolor the browser/PWA chrome.
function syncThemeColor(theme: ThemeMode) {
	const color = theme === "dark" ? "#0b1510" : "#f6f9f4";
	for (const meta of document.querySelectorAll<HTMLMetaElement>(
		'meta[name="theme-color"]',
	)) {
		meta.content = color;
	}
}

function SunIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
		</svg>
	);
}

function MoonIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	);
}

function toggleLabel(locale: Locale, theme: ThemeMode | null): string {
	if (theme === null) {
		return t(locale, "toggleTheme");
	}
	const mode = t(locale, theme === "dark" ? "light" : "dark");
	return t(locale, "switchToMode").replace("{mode}", mode);
}

export default function ThemeToggle() {
	const locale = useLocale();
	// null until the saved theme is read: server-rendered markup reaches light
	// and dark visitors alike, so it can't say which way it would switch
	const [theme, setTheme] = useState<ThemeMode | null>(null);

	useEffect(() => {
		const preferred = getPreferredTheme();
		setTheme(preferred);
		document.documentElement.dataset.theme = preferred;
		syncThemeColor(preferred);
	}, []);

	const toggleTheme = () => {
		const next: ThemeMode = theme === "dark" ? "light" : "dark";
		setTheme(next);
		document.documentElement.dataset.theme = next;
		window.localStorage.setItem(storageKey, next);
		syncThemeColor(next);
	};

	const label = toggleLabel(locale, theme);

	return (
		<button
			className="theme-toggle"
			type="button"
			onClick={toggleTheme}
			aria-label={label}
			title={label}
		>
			<span className="theme-toggle-icon" aria-hidden>
				{theme === "dark" ? <SunIcon /> : <MoonIcon />}
			</span>
		</button>
	);
}
