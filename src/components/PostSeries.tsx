import { Link } from "@tanstack/react-router";
import { memo } from "react";

import { defaultLocale, type Locale } from "@/lib/i18n";

type SeriesPost = {
	slug: string;
	title: string;
	part?: number;
};

type PostSeriesProps = {
	seriesName: string;
	posts: SeriesPost[];
	currentSlug: string;
	locale?: Locale;
};

export default memo(function PostSeries({
	seriesName,
	posts,
	currentSlug,
	locale = defaultLocale,
}: PostSeriesProps) {
	if (posts.length <= 1) {
		return null;
	}

	const currentIndex = posts.findIndex((p) => p.slug === currentSlug);

	return (
		<nav className="post-series" aria-label={`${seriesName} series`}>
			<div className="post-series-header">
				<span className="post-series-label">Series</span>
				<h4 className="post-series-name">{seriesName}</h4>
			</div>
			<ol className="post-series-list">
				{posts.map((post, index) => {
					const isCurrent = post.slug === currentSlug;
					return (
						<li
							key={post.slug}
							className={`post-series-item ${isCurrent ? "post-series-current" : ""}`}
						>
							{isCurrent ? (
								<span aria-current="page">
									<span className="post-series-part">Part {index + 1}:</span>{" "}
									{post.title}
								</span>
							) : locale === defaultLocale ? (
								<Link to="/blog/$slug" params={{ slug: post.slug }}>
									<span className="post-series-part">Part {index + 1}:</span>{" "}
									{post.title}
								</Link>
							) : (
								<Link
									to="/$locale/blog/$slug"
									params={{ locale, slug: post.slug }}
								>
									<span className="post-series-part">Part {index + 1}:</span>{" "}
									{post.title}
								</Link>
							)}
						</li>
					);
				})}
			</ol>
			{currentIndex < posts.length - 1 && (
				<div className="post-series-next">
					{locale === defaultLocale ? (
						<Link
							to="/blog/$slug"
							params={{ slug: posts[currentIndex + 1].slug }}
							className="button ghost"
						>
							Next in series →
						</Link>
					) : (
						<Link
							to="/$locale/blog/$slug"
							params={{ locale, slug: posts[currentIndex + 1].slug }}
							className="button ghost"
						>
							Next in series →
						</Link>
					)}
				</div>
			)}
		</nav>
	);
});
