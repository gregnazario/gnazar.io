import { Link } from "@tanstack/react-router";
import { memo } from "react";

import Badge from "@/components/Badge";
import type { BlogPost } from "@/lib/content-i18n";
import { formatDate } from "@/lib/format";
import { defaultLocale, type Locale } from "@/lib/i18n";

type PostCardProps = {
	post: BlogPost;
	maxTags?: number;
	locale?: Locale;
};

export default memo(function PostCard({
	post,
	maxTags,
	locale = defaultLocale,
}: PostCardProps) {
	const tags = maxTags ? post.tags.slice(0, maxTags) : post.tags;

	// For default locale, use /blog/$slug route
	// For other locales, use /$locale/blog/$slug route
	if (locale === defaultLocale) {
		return (
			<article className="card">
				<div className="card-meta">
					<span>{formatDate(post.date)}</span>
					{tags.map((tag) => (
						<Badge key={tag}>{tag}</Badge>
					))}
				</div>
				<h3>
					<Link to="/blog/$slug" params={{ slug: post.slug }}>
						{post.title}
					</Link>
				</h3>
				<p>{post.summary}</p>
			</article>
		);
	}

	return (
		<article className="card">
			<div className="card-meta">
				<span>{formatDate(post.date)}</span>
				{tags.map((tag) => (
					<Badge key={tag}>{tag}</Badge>
				))}
			</div>
			<h3>
				<Link to="/$locale/blog/$slug" params={{ locale, slug: post.slug }}>
					{post.title}
				</Link>
			</h3>
			<p>{post.summary}</p>
		</article>
	);
});
