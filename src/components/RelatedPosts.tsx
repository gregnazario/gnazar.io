import { Link } from "@tanstack/react-router";
import { memo } from "react";

import type { BlogPost } from "@/lib/content-i18n";
import { defaultLocale, type Locale } from "@/lib/i18n";

type RelatedPostsProps = {
	currentSlug: string;
	currentTags: string[];
	allPosts: BlogPost[];
	locale?: Locale;
	maxPosts?: number;
};

function getRelatedPosts(
	currentSlug: string,
	currentTags: string[],
	allPosts: BlogPost[],
	maxPosts: number,
): BlogPost[] {
	// Score posts by number of matching tags
	const scored = allPosts
		.filter((post) => post.slug !== currentSlug)
		.map((post) => {
			const matchingTags = post.tags.filter((tag) =>
				currentTags.includes(tag),
			).length;
			return { post, score: matchingTags };
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score);

	return scored.slice(0, maxPosts).map((item) => item.post);
}

export default memo(function RelatedPosts({
	currentSlug,
	currentTags,
	allPosts,
	locale = defaultLocale,
	maxPosts = 3,
}: RelatedPostsProps) {
	const related = getRelatedPosts(currentSlug, currentTags, allPosts, maxPosts);

	if (related.length === 0) {
		return null;
	}

	return (
		<aside className="related-posts">
			<h3 className="related-posts-title">Related Posts</h3>
			<ul className="related-posts-list">
				{related.map((post) => (
					<li key={post.slug}>
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
		</aside>
	);
});
