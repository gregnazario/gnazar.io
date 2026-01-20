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
	const linkTo =
		locale === defaultLocale
			? `/blog/${post.slug}`
			: `/${locale}/blog/${post.slug}`;

	return (
		<article className="card">
			<div className="card-meta">
				<span>{formatDate(post.date)}</span>
				{tags.map((tag) => (
					<Badge key={tag}>{tag}</Badge>
				))}
			</div>
			<h3>
				<Link to={linkTo}>{post.title}</Link>
			</h3>
			<p>{post.summary}</p>
		</article>
	);
});
