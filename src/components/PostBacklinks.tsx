import { Link } from "@tanstack/react-router";
import { memo } from "react";

import type { BlogPost } from "@/lib/content-i18n";
import { defaultLocale, type Locale } from "@/lib/i18n";

type PostBacklinksProps = {
	currentSlug: string;
	allPosts: BlogPost[];
	locale?: Locale;
};

function findBacklinks(currentSlug: string, allPosts: BlogPost[]): BlogPost[] {
	return allPosts.filter((post) => {
		if (post.slug === currentSlug) return false;
		// Check if post content contains a link to current slug
		const linkPattern = new RegExp(
			`\\(/blog/${currentSlug}\\)|\\[.*\\]\\(.*${currentSlug}.*\\)`,
			"i",
		);
		return linkPattern.test(post.content);
	});
}

export default memo(function PostBacklinks({
	currentSlug,
	allPosts,
	locale = defaultLocale,
}: PostBacklinksProps) {
	const backlinks = findBacklinks(currentSlug, allPosts);

	if (backlinks.length === 0) {
		return null;
	}

	return (
		<aside className="post-backlinks">
			<h4 className="backlinks-title">
				<svg viewBox="0 0 24 24" aria-hidden="true" className="backlinks-icon">
					<path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
				</svg>
				Linked from
			</h4>
			<ul className="backlinks-list">
				{backlinks.map((post) => (
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
