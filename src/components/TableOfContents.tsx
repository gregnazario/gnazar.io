import { memo, useEffect, useMemo, useState } from "react";

import { stripHtmlTags } from "@/lib/html-utils";

type Heading = {
	id: string;
	text: string;
	level: number;
};

type TableOfContentsProps = {
	html: string;
	minHeadings?: number;
};

function extractHeadings(html: string): Heading[] {
	// Match h2 and h3 headings with id attributes
	const regex =
		/<h([23])[^>]*id="([^"]*)"[^>]*>([^<]*(?:<[^/][^>]*>[^<]*)*)<\/h[23]>/gi;
	const headings: Heading[] = [];
	let match: RegExpExecArray | null;

	while (true) {
		match = regex.exec(html);
		if (match === null) break;
		const level = Number.parseInt(match[1], 10);
		const id = match[2];
		// Strip any remaining HTML tags from the text
		const text = stripHtmlTags(match[3]).trim();

		if (id && text) {
			headings.push({ id, text, level });
		}
	}

	return headings;
}

export default memo(function TableOfContents({
	html,
	minHeadings = 3,
}: TableOfContentsProps) {
	const [activeId, setActiveId] = useState<string>("");

	// Memoize headings to avoid recreating IntersectionObserver on every render
	const headings = useMemo(() => extractHeadings(html), [html]);

	useEffect(() => {
		if (headings.length < minHeadings) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{
				rootMargin: "-80px 0px -80% 0px",
				threshold: 0,
			},
		);

		for (const heading of headings) {
			const element = document.getElementById(heading.id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => observer.disconnect();
	}, [headings, minHeadings]);

	if (headings.length < minHeadings) {
		return null;
	}

	return (
		<nav className="toc" aria-label="Table of contents">
			<h2 className="toc-title">Contents</h2>
			<ul className="toc-list">
				{headings.map((heading) => (
					<li
						key={heading.id}
						className={`toc-item toc-level-${heading.level}`}
					>
						<a
							href={`#${heading.id}`}
							className={activeId === heading.id ? "toc-active" : ""}
							onClick={(e) => {
								e.preventDefault();
								const element = document.getElementById(heading.id);
								if (element) {
									element.scrollIntoView({ behavior: "smooth" });
									history.pushState(null, "", `#${heading.id}`);
								}
							}}
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
});
