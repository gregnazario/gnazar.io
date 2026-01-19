import { Link } from "@tanstack/react-router";

import Badge from "@/components/Badge";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/lib/content";

type PostCardProps = {
	post: BlogPost;
	maxTags?: number;
};

export default function PostCard({ post, maxTags }: PostCardProps) {
	const tags = maxTags ? post.tags.slice(0, maxTags) : post.tags;

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
