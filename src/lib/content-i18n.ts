import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { defaultLocale, type Locale } from "./i18n";

const contentRoot = path.join(process.cwd(), "content");

export type BlogPost = {
	slug: string;
	title: string;
	date: string;
	summary: string;
	tags: string[];
	published: boolean;
	content: string;
	locale: Locale;
	isTranslated: boolean;
};

export type ProjectLink = {
	label: string;
	href: string;
};

export type Project = {
	slug: string;
	title: string;
	summary: string;
	role?: string;
	year?: string;
	featured: boolean;
	links: ProjectLink[];
	content: string;
	locale: Locale;
	isTranslated: boolean;
};

function getContentPath(folder: "blog" | "projects", locale: Locale): string {
	if (locale === defaultLocale) {
		return path.join(contentRoot, folder);
	}
	return path.join(contentRoot, locale, folder);
}

async function getSlugs(
	folder: "blog" | "projects",
	locale: Locale,
): Promise<string[]> {
	const directory = getContentPath(folder, locale);
	try {
		const entries = await fs.readdir(directory);
		return entries
			.filter((entry) => entry.endsWith(".mdx"))
			.map((entry) => entry.replace(/\.mdx$/, ""));
	} catch {
		// If locale folder doesn't exist, fall back to default locale
		if (locale !== defaultLocale) {
			return getSlugs(folder, defaultLocale);
		}
		return [];
	}
}

function normalizeString(value: unknown, fallback: string): string {
	if (typeof value === "string" && value.trim().length > 0) {
		return value.trim();
	}
	return fallback;
}

function normalizeStringArray(value: unknown): string[] {
	if (!Array.isArray(value)) {
		return [];
	}
	return value.filter((item): item is string => typeof item === "string");
}

function normalizeBoolean(value: unknown, fallback: boolean): boolean {
	return typeof value === "boolean" ? value : fallback;
}

function normalizeLinks(value: unknown): ProjectLink[] {
	if (!Array.isArray(value)) {
		return [];
	}

	return value
		.map((item) => {
			if (!item || typeof item !== "object") {
				return null;
			}
			const record = item as Record<string, unknown>;
			const label = normalizeString(record.label, "");
			const href = normalizeString(record.href, "");
			if (!label || !href) {
				return null;
			}
			return { label, href };
		})
		.filter((item): item is ProjectLink => item !== null);
}

async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

export async function getBlogPostBySlug(
	slug: string,
	locale: Locale = defaultLocale,
): Promise<BlogPost | null> {
	// Try locale-specific path first
	let filePath = path.join(getContentPath("blog", locale), `${slug}.mdx`);
	let isTranslated = locale !== defaultLocale;

	// Fall back to default locale if translation doesn't exist
	if (locale !== defaultLocale && !(await fileExists(filePath))) {
		filePath = path.join(getContentPath("blog", defaultLocale), `${slug}.mdx`);
		isTranslated = false;
	}

	try {
		const raw = await fs.readFile(filePath, "utf-8");
		const { data, content } = matter(raw);
		const title = normalizeString(data.title, slug);
		const summary = normalizeString(data.summary, "");
		const date = normalizeString(data.date, "");
		const tags = normalizeStringArray(data.tags);
		const published = normalizeBoolean(data.published, true);

		return {
			slug,
			title,
			summary,
			date,
			tags,
			published,
			content,
			locale,
			isTranslated,
		};
	} catch {
		return null;
	}
}

export async function getAllBlogPosts(
	locale: Locale = defaultLocale,
): Promise<BlogPost[]> {
	// Always get slugs from default locale to ensure consistency
	const slugs = await getSlugs("blog", defaultLocale);
	const posts = await Promise.all(
		slugs.map((slug) => getBlogPostBySlug(slug, locale)),
	);
	return posts
		.filter((post): post is BlogPost => Boolean(post))
		.filter((post) => post.published)
		.sort((a, b) => {
			const left = new Date(a.date).getTime();
			const right = new Date(b.date).getTime();
			return right - left;
		});
}

export async function getProjectBySlug(
	slug: string,
	locale: Locale = defaultLocale,
): Promise<Project | null> {
	// Try locale-specific path first
	let filePath = path.join(getContentPath("projects", locale), `${slug}.mdx`);
	let isTranslated = locale !== defaultLocale;

	// Fall back to default locale if translation doesn't exist
	if (locale !== defaultLocale && !(await fileExists(filePath))) {
		filePath = path.join(
			getContentPath("projects", defaultLocale),
			`${slug}.mdx`,
		);
		isTranslated = false;
	}

	try {
		const raw = await fs.readFile(filePath, "utf-8");
		const { data, content } = matter(raw);
		const title = normalizeString(data.title, slug);
		const summary = normalizeString(data.summary, "");
		const role = normalizeString(data.role, "");
		const year = normalizeString(data.year, "");
		const featured = normalizeBoolean(data.featured, false);
		const links = normalizeLinks(data.links);

		return {
			slug,
			title,
			summary,
			role: role || undefined,
			year: year || undefined,
			featured,
			links,
			content,
			locale,
			isTranslated,
		};
	} catch {
		return null;
	}
}

export async function getAllProjects(
	locale: Locale = defaultLocale,
): Promise<Project[]> {
	// Always get slugs from default locale to ensure consistency
	const slugs = await getSlugs("projects", defaultLocale);
	const projects = await Promise.all(
		slugs.map((slug) => getProjectBySlug(slug, locale)),
	);
	return projects
		.filter((project): project is Project => Boolean(project))
		.sort((a, b) => {
			if (a.featured !== b.featured) {
				return a.featured ? -1 : 1;
			}
			return a.title.localeCompare(b.title);
		});
}
