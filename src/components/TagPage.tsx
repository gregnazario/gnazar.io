import { Link } from "@tanstack/react-router";

import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import SectionHeading from "@/components/SectionHeading";
import type { BlogPost } from "@/lib/content-i18n";
import { pluralize } from "@/lib/format";
import { defaultLocale, type Locale, t } from "@/lib/i18n";

export function filterPostsByTag(
	posts: BlogPost[],
	tag: string,
): { posts: BlogPost[]; tag: string } {
	const filteredPosts = posts.filter((post) =>
		post.tags.some(
			(candidate) => candidate.toLowerCase() === tag.toLowerCase(),
		),
	);

	// Keep the tag's own capitalisation in headings and links
	const actualTag =
		filteredPosts[0]?.tags.find(
			(candidate) => candidate.toLowerCase() === tag.toLowerCase(),
		) || tag;

	return { posts: filteredPosts, tag: actualTag };
}

type TagPageProps = {
	posts: BlogPost[];
	tag: string;
	locale?: Locale;
};

export default function TagPage({
	posts,
	tag,
	locale = defaultLocale,
}: TagPageProps) {
	const breadcrumbItems = [
		{ label: t(locale, "home"), href: "/" },
		{ label: t(locale, "tags"), href: "/tags" },
		{ label: tag },
	];

	return (
		<section className="section">
			<div className="container">
				<Breadcrumbs items={breadcrumbItems} locale={locale} />
				<SectionHeading
					as="h1"
					title={`#${tag}`}
					subtitle={`${posts.length} ${pluralize(
						posts.length,
						t(locale, "postOne"),
						t(locale, "postMany"),
					)}`}
				/>
				<div className="stack">
					{posts.map((post) => (
						<PostCard key={post.slug} post={post} locale={locale} />
					))}
					{posts.length === 0 && (
						<div className="card">
							<p>{t(locale, "noPostsWithTag")}</p>
							{locale === defaultLocale ? (
								<Link className="button ghost" to="/tags">
									{t(locale, "viewAllTags")}
								</Link>
							) : (
								<Link
									className="button ghost"
									to="/$locale/tags"
									params={{ locale }}
								>
									{t(locale, "viewAllTags")}
								</Link>
							)}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
