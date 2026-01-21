import { memo, useEffect, useState } from "react";

import { siteConfig } from "@/lib/site";

type WebmentionAuthor = {
	name: string;
	photo?: string;
	url?: string;
};

type Webmention = {
	id: number;
	source: string;
	verified: boolean;
	verified_date: string;
	private: boolean;
	data: {
		author?: WebmentionAuthor;
		url?: string;
		name?: string;
		content?: string;
		published?: string;
		published_ts?: number;
	};
	activity: {
		type: "link" | "reply" | "repost" | "like" | "bookmark" | "mention";
		sentence?: string;
		sentence_html?: string;
	};
	target: string;
};

type WebmentionsProps = {
	slug: string;
	type?: "blog" | "projects";
};

type GroupedMentions = {
	likes: Webmention[];
	reposts: Webmention[];
	replies: Webmention[];
	mentions: Webmention[];
};

function groupMentions(mentions: Webmention[]): GroupedMentions {
	return mentions.reduce<GroupedMentions>(
		(acc, mention) => {
			switch (mention.activity.type) {
				case "like":
					acc.likes.push(mention);
					break;
				case "repost":
					acc.reposts.push(mention);
					break;
				case "reply":
					acc.replies.push(mention);
					break;
				default:
					acc.mentions.push(mention);
			}
			return acc;
		},
		{ likes: [], reposts: [], replies: [], mentions: [] },
	);
}

function formatDate(dateString?: string): string {
	if (!dateString) return "";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export default memo(function Webmentions({
	slug,
	type = "blog",
}: WebmentionsProps) {
	const [mentions, setMentions] = useState<Webmention[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const targetUrl = `${siteConfig.url}/${type}/${slug}`;
		const apiUrl = `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(targetUrl)}&per-page=100`;

		fetch(apiUrl)
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch");
				return res.json();
			})
			.then((data) => {
				// webmention.io returns { children: [...] } in jf2 format
				const items = data.children || [];
				// Convert jf2 format to our format
				const formatted: Webmention[] = items.map(
					// biome-ignore lint/suspicious/noExplicitAny: webmention.io API response structure
					(item: any, index: number) => {
						const content = item.content;
						const wmProperty = item["wm-property"];
						return {
							id: index,
							source: item.url || item["wm-source"],
							verified: true,
							verified_date: item.published || item["wm-received"],
							private: false,
							data: {
								author: item.author,
								url: item.url,
								content: content?.text || content?.html || content,
								published: item.published,
							},
							activity: {
								type: wmProperty ? wmProperty.replace("in-", "") : "mention",
							},
							target: item["wm-target"],
						};
					},
				);
				setMentions(formatted);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, [slug, type]);

	if (loading) {
		return (
			<div className="webmentions">
				<h3 className="webmentions-title">Webmentions</h3>
				<p className="webmentions-loading">Loading mentions...</p>
			</div>
		);
	}

	if (error) {
		return null; // Silently fail - webmentions are optional
	}

	if (mentions.length === 0) {
		return (
			<div className="webmentions">
				<h3 className="webmentions-title">Webmentions</h3>
				<p className="webmentions-empty">
					No webmentions yet. Be the first to{" "}
					<a
						href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${siteConfig.url}/${type}/${slug}`)}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						share this post
					</a>
					!
				</p>
			</div>
		);
	}

	const grouped = groupMentions(mentions);
	const hasInteractions =
		grouped.likes.length > 0 || grouped.reposts.length > 0;
	const hasReplies = grouped.replies.length > 0 || grouped.mentions.length > 0;

	return (
		<div className="webmentions">
			<h3 className="webmentions-title">Webmentions</h3>

			{hasInteractions && (
				<div className="webmentions-interactions">
					{grouped.likes.length > 0 && (
						<div className="webmentions-likes">
							<span className="webmentions-count">
								❤️ {grouped.likes.length}{" "}
								{grouped.likes.length === 1 ? "like" : "likes"}
							</span>
							<div className="webmentions-avatars">
								{grouped.likes.slice(0, 10).map((mention) => (
									<a
										key={mention.id}
										href={mention.data.author?.url || mention.source}
										target="_blank"
										rel="noopener noreferrer"
										title={mention.data.author?.name || "Anonymous"}
									>
										{mention.data.author?.photo ? (
											<img
												src={mention.data.author.photo}
												alt={mention.data.author.name || ""}
												className="webmentions-avatar"
												loading="lazy"
											/>
										) : (
											<span className="webmentions-avatar-placeholder">
												{mention.data.author?.name?.[0] || "?"}
											</span>
										)}
									</a>
								))}
								{grouped.likes.length > 10 && (
									<span className="webmentions-more">
										+{grouped.likes.length - 10}
									</span>
								)}
							</div>
						</div>
					)}

					{grouped.reposts.length > 0 && (
						<div className="webmentions-reposts">
							<span className="webmentions-count">
								🔁 {grouped.reposts.length}{" "}
								{grouped.reposts.length === 1 ? "repost" : "reposts"}
							</span>
							<div className="webmentions-avatars">
								{grouped.reposts.slice(0, 10).map((mention) => (
									<a
										key={mention.id}
										href={mention.data.author?.url || mention.source}
										target="_blank"
										rel="noopener noreferrer"
										title={mention.data.author?.name || "Anonymous"}
									>
										{mention.data.author?.photo ? (
											<img
												src={mention.data.author.photo}
												alt={mention.data.author.name || ""}
												className="webmentions-avatar"
												loading="lazy"
											/>
										) : (
											<span className="webmentions-avatar-placeholder">
												{mention.data.author?.name?.[0] || "?"}
											</span>
										)}
									</a>
								))}
								{grouped.reposts.length > 10 && (
									<span className="webmentions-more">
										+{grouped.reposts.length - 10}
									</span>
								)}
							</div>
						</div>
					)}
				</div>
			)}

			{hasReplies && (
				<div className="webmentions-replies">
					{[...grouped.replies, ...grouped.mentions].map((mention) => (
						<div key={mention.id} className="webmentions-reply">
							<div className="webmentions-reply-header">
								<a
									href={mention.data.author?.url || mention.source}
									target="_blank"
									rel="noopener noreferrer"
									className="webmentions-reply-author"
								>
									{mention.data.author?.photo ? (
										<img
											src={mention.data.author.photo}
											alt=""
											className="webmentions-avatar"
											loading="lazy"
										/>
									) : (
										<span className="webmentions-avatar-placeholder">
											{mention.data.author?.name?.[0] || "?"}
										</span>
									)}
									<span>{mention.data.author?.name || "Anonymous"}</span>
								</a>
								<time className="webmentions-reply-date">
									{formatDate(mention.data.published)}
								</time>
							</div>
							{mention.data.content && (
								<p className="webmentions-reply-content">
									{mention.data.content}
								</p>
							)}
							<a
								href={mention.source}
								target="_blank"
								rel="noopener noreferrer"
								className="webmentions-reply-source"
							>
								View original →
							</a>
						</div>
					))}
				</div>
			)}
		</div>
	);
});
