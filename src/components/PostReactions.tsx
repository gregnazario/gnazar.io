import { memo, useEffect, useState } from "react";

type Reaction = "like" | "bookmark";

type PostReactionsProps = {
	slug: string;
};

const STORAGE_KEY = "post-reactions";

function getReactions(): Record<string, Reaction[]> {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : {};
	} catch {
		return {};
	}
}

function saveReactions(reactions: Record<string, Reaction[]>) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(reactions));
}

export default memo(function PostReactions({ slug }: PostReactionsProps) {
	const [reactions, setReactions] = useState<Reaction[]>([]);

	useEffect(() => {
		const allReactions = getReactions();
		setReactions(allReactions[slug] || []);
	}, [slug]);

	const toggleReaction = (reaction: Reaction) => {
		const allReactions = getReactions();
		const postReactions = allReactions[slug] || [];

		let newReactions: Reaction[];
		if (postReactions.includes(reaction)) {
			newReactions = postReactions.filter((r) => r !== reaction);
		} else {
			newReactions = [...postReactions, reaction];
		}

		allReactions[slug] = newReactions;
		saveReactions(allReactions);
		setReactions(newReactions);
	};

	const hasLiked = reactions.includes("like");
	const hasBookmarked = reactions.includes("bookmark");

	return (
		<div className="post-reactions">
			<button
				type="button"
				className={`reaction-button ${hasLiked ? "reaction-active" : ""}`}
				onClick={() => toggleReaction("like")}
				aria-pressed={hasLiked}
				title={hasLiked ? "Unlike" : "Like"}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" className="reaction-icon">
					{hasLiked ? (
						<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
					) : (
						<path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
					)}
				</svg>
				<span>{hasLiked ? "Liked" : "Like"}</span>
			</button>
			<button
				type="button"
				className={`reaction-button ${hasBookmarked ? "reaction-active" : ""}`}
				onClick={() => toggleReaction("bookmark")}
				aria-pressed={hasBookmarked}
				title={hasBookmarked ? "Remove bookmark" : "Bookmark"}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" className="reaction-icon">
					{hasBookmarked ? (
						<path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
					) : (
						<path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
					)}
				</svg>
				<span>{hasBookmarked ? "Saved" : "Save"}</span>
			</button>
		</div>
	);
});
