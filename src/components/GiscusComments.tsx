import { memo, useEffect, useRef } from "react";

type GiscusCommentsProps = {
	repo: string; // e.g., "username/repo"
	repoId: string;
	category: string;
	categoryId: string;
	mapping?: "pathname" | "url" | "title" | "og:title";
	theme?: "light" | "dark" | "preferred_color_scheme";
	lang?: string;
};

export default memo(function GiscusComments({
	repo,
	repoId,
	category,
	categoryId,
	mapping = "pathname",
	theme = "preferred_color_scheme",
	lang = "en",
}: GiscusCommentsProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		// Clear existing giscus if any
		containerRef.current.innerHTML = "";

		const script = document.createElement("script");
		script.src = "https://giscus.app/client.js";
		script.async = true;
		script.crossOrigin = "anonymous";
		script.setAttribute("data-repo", repo);
		script.setAttribute("data-repo-id", repoId);
		script.setAttribute("data-category", category);
		script.setAttribute("data-category-id", categoryId);
		script.setAttribute("data-mapping", mapping);
		script.setAttribute("data-strict", "0");
		script.setAttribute("data-reactions-enabled", "1");
		script.setAttribute("data-emit-metadata", "0");
		script.setAttribute("data-input-position", "top");
		script.setAttribute("data-theme", theme);
		script.setAttribute("data-lang", lang);
		script.setAttribute("data-loading", "lazy");

		containerRef.current.appendChild(script);

		return () => {
			if (containerRef.current) {
				containerRef.current.innerHTML = "";
			}
		};
	}, [repo, repoId, category, categoryId, mapping, theme, lang]);

	return (
		<div className="giscus-comments">
			<h3 className="giscus-title">Comments</h3>
			<div ref={containerRef} className="giscus-container" />
		</div>
	);
});
