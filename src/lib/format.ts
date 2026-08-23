import { defaultLocale, type Locale } from "./i18n";

const INTL_LOCALES: Record<Locale, string> = {
	en: "en-US",
	es: "es-ES",
	fr: "fr-FR",
	zh: "zh-Hans",
	ko: "ko-KR",
};

export function formatDate(
	value: string,
	locale: Locale = defaultLocale,
): string {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat(INTL_LOCALES[locale] ?? "en-US", {
		year: "numeric",
		month: "short",
		day: "2-digit",
	}).format(date);
}
