import { Link } from "@tanstack/react-router";
import { memo } from "react";

import Badge from "@/components/Badge";
import type { BlogPost } from "@/lib/content-i18n";
import { formatDate } from "@/lib/format";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { calculateReadingTime, formatReadingTime } from "@/lib/reading-time";

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
	const readingTime = formatReadingTime(
		calculateReadingTime(post.content),
		locale,
	);
	const isDefaultLocale = locale === defaultLocale;

	return (
		<article className="card">
			<div className="card-meta">
				<span>{formatDate(post.date, locale)}</span>
				<span className="reading-time">{readingTime}</span>
				{tags.map((tag) =>
					isDefaultLocale ? (
						<Link key={tag} to="/tags/$tag" params={{ tag }}>
							<Badge>{tag}</Badge>
						</Link>
					) : (
						<Link key={tag} to="/$locale/tags/$tag" params={{ locale, tag }}>
							<Badge>{tag}</Badge>
						</Link>
					),
				)}
			</div>
			<h3>
				{isDefaultLocale ? (
					<Link to="/blog/$slug" params={{ slug: post.slug }}>
						{post.title}
					</Link>
				) : (
					<Link to="/$locale/blog/$slug" params={{ locale, slug: post.slug }}>
						{post.title}
					</Link>
				)}
			</h3>
			<p>{post.summary}</p>
		</article>
	);
});
