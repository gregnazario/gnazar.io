import { useEffect, useState } from "react";

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

export default function ThemeToggle() {
	const [theme, setTheme] = useState<ThemeMode>("light");

	useEffect(() => {
		const preferred = getPreferredTheme();
		setTheme(preferred);
		document.documentElement.dataset.theme = preferred;
	}, []);

	const toggleTheme = () => {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		document.documentElement.dataset.theme = next;
		window.localStorage.setItem(storageKey, next);
	};

	return (
		<button
			className="theme-toggle"
			type="button"
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
			title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
		>
			<span className="theme-toggle-icon" aria-hidden>
				{theme === "dark" ? "☀" : "◐"}
			</span>
		</button>
	);
}
