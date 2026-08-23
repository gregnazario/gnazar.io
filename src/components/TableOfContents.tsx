import { memo, useEffect, useMemo, useRef, useState } from "react";

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
	// Headings are autolink-wrapped (nested <a>/<span> markup), so match the
	// full element non-greedily and strip tags from the content afterwards.
	// The previous pattern could not consume nested closing tags and silently
	// dropped every autolinked heading, so the TOC never rendered.
	const regex = /<h([23])[^>]*\sid="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/gi;
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
	const [isDesktop, setIsDesktop] = useState(false);
	const detailsRef = useRef<HTMLDetailsElement>(null);

	// Memoize headings to avoid recreating IntersectionObserver on every render
	const headings = useMemo(() => extractHeadings(html), [html]);

	// Desktop keeps the TOC expanded; small viewports collapse it so the
	// article title stays above the fold.
	useEffect(() => {
		const mq = window.matchMedia("(min-width: 768px)");
		const apply = () => {
			setIsDesktop(mq.matches);
			if (detailsRef.current) detailsRef.current.open = mq.matches;
		};
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);

	// The summary is pointer-disabled and untabbable on desktop; if a toggle
	// still sneaks through (e.g. an AT form control), keep the TOC open.
	const handleToggle = () => {
		if (isDesktop && detailsRef.current && !detailsRef.current.open) {
			detailsRef.current.open = true;
		}
	};

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
		<nav aria-label="Table of contents">
			<details className="toc" ref={detailsRef} onToggle={handleToggle}>
				<summary className="toc-title" tabIndex={isDesktop ? -1 : undefined}>
					<h2>Contents</h2>
				</summary>
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
			</details>
		</nav>
	);
});
