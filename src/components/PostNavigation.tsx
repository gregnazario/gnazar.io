import { Link } from "@tanstack/react-router";
import React from "react";

import type { BlogPost } from "@/lib/content-i18n";

interface PostNavigationProps {
	previousPost: BlogPost | null;
	nextPost: BlogPost | null;
	locale?: string;
}

function PostNavigation({
	previousPost,
	nextPost,
	locale,
}: PostNavigationProps) {
	if (!previousPost && !nextPost) {
		return null;
	}

	const isDefaultLocale = !locale || locale === "en";

	return (
		<nav className="post-navigation" aria-label="Post navigation">
			<div className="post-nav-item post-nav-prev">
				{previousPost && (
					<>
						<span className="post-nav-label">Previous</span>
						{isDefaultLocale ? (
							<Link
								to="/blog/$slug"
								params={{ slug: previousPost.slug }}
								className="post-nav-link"
							>
								<svg
									className="post-nav-arrow"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									aria-hidden="true"
								>
									<path d="M19 12H5M12 19l-7-7 7-7" />
								</svg>
								<span className="post-nav-title">{previousPost.title}</span>
							</Link>
						) : (
							<Link
								to="/$locale/blog/$slug"
								params={{ locale, slug: previousPost.slug }}
								className="post-nav-link"
							>
								<svg
									className="post-nav-arrow"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									aria-hidden="true"
								>
									<path d="M19 12H5M12 19l-7-7 7-7" />
								</svg>
								<span className="post-nav-title">{previousPost.title}</span>
							</Link>
						)}
					</>
				)}
			</div>
			<div className="post-nav-item post-nav-next">
				{nextPost && (
					<>
						<span className="post-nav-label">Next</span>
						{isDefaultLocale ? (
							<Link
								to="/blog/$slug"
								params={{ slug: nextPost.slug }}
								className="post-nav-link"
							>
								<span className="post-nav-title">{nextPost.title}</span>
								<svg
									className="post-nav-arrow"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									aria-hidden="true"
								>
									<path d="M5 12h14M12 5l7 7-7 7" />
								</svg>
							</Link>
						) : (
							<Link
								to="/$locale/blog/$slug"
								params={{ locale, slug: nextPost.slug }}
								className="post-nav-link"
							>
								<span className="post-nav-title">{nextPost.title}</span>
								<svg
									className="post-nav-arrow"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									aria-hidden="true"
								>
									<path d="M5 12h14M12 5l7 7-7 7" />
								</svg>
							</Link>
						)}
					</>
				)}
			</div>
		</nav>
	);
}

export default React.memo(PostNavigation);
