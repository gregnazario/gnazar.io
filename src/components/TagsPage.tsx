import { Link } from "@tanstack/react-router";

import SectionHeading from "@/components/SectionHeading";
import type { BlogPost } from "@/lib/content-i18n";
import { pluralize } from "@/lib/format";
import { defaultLocale, type Locale, t, tf } from "@/lib/i18n";

export type TagWithCount = {
	tag: string;
	count: number;
};

/** Tags ordered by how many posts carry them, then alphabetically. */
export function countTags(posts: BlogPost[]): TagWithCount[] {
	const tagCounts = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.tags) {
			tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
		}
	}

	return Array.from(tagCounts.entries())
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => {
			if (b.count !== a.count) return b.count - a.count;
			return a.tag.localeCompare(b.tag);
		});
}

type TagsPageProps = {
	tags: TagWithCount[];
	totalPosts: number;
	locale?: Locale;
};

export default function TagsPage({
	tags,
	totalPosts,
	locale = defaultLocale,
}: TagsPageProps) {
	const count = (n: number, one: string, many: string) =>
		`${n} ${pluralize(n, one, many)}`;

	return (
		<section className="section">
			<div className="container">
				<SectionHeading
					as="h1"
					title={t(locale, "tags")}
					subtitle={tf(locale, "tagsAcross", {
						tags: count(tags.length, t(locale, "tagOne"), t(locale, "tagMany")),
						posts: count(
							totalPosts,
							t(locale, "postOne"),
							t(locale, "postMany"),
						),
					})}
				/>
				<div className="tags-cloud">
					{tags.map(({ tag, count: tagCount }) => (
						<Link
							key={tag}
							to={
								locale === defaultLocale ? "/tags/$tag" : "/$locale/tags/$tag"
							}
							params={locale === defaultLocale ? { tag } : { locale, tag }}
							className="tag-link"
						>
							<span className="tag-name">{tag}</span>
							<span className="tag-count">{tagCount}</span>
						</Link>
					))}
				</div>
				{tags.length === 0 && (
					<div className="card">
						<p>{t(locale, "noTagsYet")}</p>
					</div>
				)}
			</div>
		</section>
	);
}
