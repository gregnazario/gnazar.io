import { Link } from "@tanstack/react-router";

import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import type { BlogPost } from "@/lib/content-i18n";
import { monthName, parseDate, pluralize } from "@/lib/format";
import { defaultLocale, type Locale, t } from "@/lib/i18n";

export type YearGroup = {
	year: string;
	months: MonthGroup[];
};

export type MonthGroup = {
	month: string;
	monthName: string;
	posts: BlogPost[];
};

export function groupPostsByYearAndMonth(
	posts: BlogPost[],
	locale: Locale = defaultLocale,
): YearGroup[] {
	const groups = new Map<string, Map<string, BlogPost[]>>();

	for (const post of posts) {
		const date = parseDate(post.date);
		if (Number.isNaN(date.getTime())) {
			continue;
		}

		const year = date.getFullYear().toString();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");

		if (!groups.has(year)) {
			groups.set(year, new Map());
		}
		const yearGroup = groups.get(year);
		if (yearGroup && !yearGroup.has(month)) {
			yearGroup.set(month, []);
		}
		yearGroup?.get(month)?.push(post);
	}

	// Convert to array and sort
	const result: YearGroup[] = [];
	const sortedYears = Array.from(groups.keys()).sort((a, b) =>
		b.localeCompare(a),
	);

	for (const year of sortedYears) {
		const yearGroup = groups.get(year);
		if (!yearGroup) continue;

		const sortedMonths = Array.from(yearGroup.keys()).sort((a, b) =>
			b.localeCompare(a),
		);

		const months: MonthGroup[] = sortedMonths.map((month) => ({
			month,
			monthName: monthName(Number.parseInt(month, 10), locale),
			posts: (yearGroup.get(month) ?? []).sort(
				(a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
			),
		}));

		result.push({ year, months });
	}

	return result;
}

type ArchivePageProps = {
	groups: YearGroup[];
	totalPosts: number;
	locale?: Locale;
};

export default function ArchivePage({
	groups,
	totalPosts,
	locale = defaultLocale,
}: ArchivePageProps) {
	const breadcrumbItems = [
		{ label: t(locale, "home"), href: "/" },
		{ label: t(locale, "archive") },
	];

	return (
		<section className="section">
			<div className="container">
				<Breadcrumbs items={breadcrumbItems} locale={locale} />
				<SectionHeading
					as="h1"
					title={t(locale, "archive")}
					subtitle={`${totalPosts} ${pluralize(
						totalPosts,
						t(locale, "postOne"),
						t(locale, "postMany"),
					)}`}
				/>
				<div className="archive">
					{groups.map((yearGroup) => (
						<div key={yearGroup.year} className="archive-year">
							<h2 className="archive-year-title">{yearGroup.year}</h2>
							{yearGroup.months.map((monthGroup) => (
								<div key={monthGroup.month} className="archive-month">
									<h3 className="archive-month-title">
										{monthGroup.monthName}
									</h3>
									<ul className="archive-posts">
										{monthGroup.posts.map((post) => (
											<li key={post.slug} className="archive-post">
												<time className="archive-date" dateTime={post.date}>
													{parseDate(post.date)
														.getDate()
														.toString()
														.padStart(2, "0")}
												</time>
												{locale === defaultLocale ? (
													<Link to="/blog/$slug" params={{ slug: post.slug }}>
														{post.title}
													</Link>
												) : (
													<Link
														to="/$locale/blog/$slug"
														params={{ locale, slug: post.slug }}
													>
														{post.title}
													</Link>
												)}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					))}
					{groups.length === 0 && (
						<div className="card">
							<p>{t(locale, "noPostsYet")}</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
