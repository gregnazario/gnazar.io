import { defaultLocale, type Locale } from "./i18n";

const INTL_LOCALES: Record<Locale, string> = {
	en: "en-US",
	es: "es-ES",
	fr: "fr-FR",
	zh: "zh-Hans",
	ko: "ko-KR",
};

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Parse a content date. Date-only values ("2026-01-17") are calendar dates:
 * `new Date` would read them as midnight UTC, which is still the previous day
 * for anyone west of UTC.
 */
export function parseDate(value: string): Date {
	const match = DATE_ONLY.exec(value);
	if (!match) {
		return new Date(value);
	}

	const year = Number(match[1]);
	const month = Number(match[2]);
	const day = Number(match[3]);
	const date = new Date(year, month - 1, day);
	// `new Date` rolls impossible dates into the next month; keep those invalid
	const isSameDay =
		date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day;

	return isSameDay ? date : new Date(Number.NaN);
}

export function formatDate(
	value: string,
	locale: Locale = defaultLocale,
): string {
	const date = parseDate(value);
	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat(INTL_LOCALES[locale] ?? "en-US", {
		year: "numeric",
		month: "short",
		day: "2-digit",
	}).format(date);
}

export function monthName(
	month: number,
	locale: Locale = defaultLocale,
): string {
	return new Intl.DateTimeFormat(INTL_LOCALES[locale] ?? "en-US", {
		month: "long",
	}).format(new Date(2026, month - 1, 1));
}

export function pluralize(
	count: number,
	singular: string,
	plural = `${singular}s`,
): string {
	return count === 1 ? singular : plural;
}

/** Role listed on almost every project, so showing it everywhere is only noise. */
const DEFAULT_PROJECT_ROLE = "Design + Engineering";

export function isDefaultProjectRole(role: string): boolean {
	return role === DEFAULT_PROJECT_ROLE;
}
