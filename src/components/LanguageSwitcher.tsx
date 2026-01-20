import { useRouterState } from "@tanstack/react-router";
import {
	addLocaleToPath,
	defaultLocale,
	type Locale,
	localeNativeNames,
	locales,
	removeLocaleFromPath,
} from "@/lib/i18n";

type LanguageSwitcherProps = {
	currentLocale: Locale;
};

export default function LanguageSwitcher({
	currentLocale,
}: LanguageSwitcherProps) {
	const routerState = useRouterState();
	const currentPath = routerState.location.pathname;
	const basePath = removeLocaleFromPath(currentPath);

	return (
		<div className="language-switcher">
			<select
				value={currentLocale}
				onChange={(e) => {
					const newLocale = e.target.value as Locale;
					const newPath =
						newLocale === defaultLocale
							? basePath || "/"
							: addLocaleToPath(basePath || "/", newLocale);
					window.location.href = newPath;
				}}
				aria-label="Select language"
				className="language-select"
			>
				{locales.map((locale) => (
					<option key={locale} value={locale}>
						{localeNativeNames[locale]}
					</option>
				))}
			</select>
		</div>
	);
}
