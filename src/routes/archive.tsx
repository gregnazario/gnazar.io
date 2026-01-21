import { createFileRoute, Link } from "@tanstack/react-router";

import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import type { BlogPost } from "@/lib/content-i18n";
import { defaultLocale } from "@/lib/i18n";
import { fetchBlogPosts } from "@/server/content";

type YearGroup = {
	year: string;
	months: MonthGroup[];
};

type MonthGroup = {
	month: string;
	monthName: string;
	posts: BlogPost[];
};

const MONTH_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function groupPostsByYearAndMonth(posts: BlogPost[]): YearGroup[] {
	const groups = new Map<string, Map<string, BlogPost[]>>();

	for (const post of posts) {
		const date = new Date(post.date);
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
			monthName: MONTH_NAMES[Number.parseInt(month, 10) - 1],
			posts: (yearGroup.get(month) ?? []).sort(
				(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
			),
		}));

		result.push({ year, months });
	}

	return result;
}

export const Route = createFileRoute("/archive")({
	loader: async () => {
		const posts = await fetchBlogPosts({ data: { locale: defaultLocale } });
		const groups = groupPostsByYearAndMonth(posts);
		return { groups, totalPosts: posts.length };
	},
	component: ArchivePage,
	head: () => ({
		meta: [
			{ title: "Archive | Greg Nazario" },
			{ name: "description", content: "Browse all blog posts by date." },
		],
	}),
});

function ArchivePage() {
	const { groups, totalPosts } = Route.useLoaderData();

	const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Archive" }];

	return (
		<section className="section">
			<div className="container">
				<Breadcrumbs items={breadcrumbItems} />
				<SectionHeading title="Archive" subtitle={`${totalPosts} posts`} />
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
												<time className="archive-date">
													{new Date(post.date)
														.getDate()
														.toString()
														.padStart(2, "0")}
												</time>
												<Link to="/blog/$slug" params={{ slug: post.slug }}>
													{post.title}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					))}
					{groups.length === 0 && (
						<div className="card">
							<p>No posts yet.</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
