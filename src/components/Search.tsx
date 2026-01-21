import Fuse from "fuse.js";
import { memo, useCallback, useEffect, useRef, useState } from "react";

type SearchItem = {
	type: "blog" | "project";
	slug: string;
	title: string;
	summary: string;
	tags?: string[];
};

type SearchProps = {
	items: SearchItem[];
	isOpen: boolean;
	onClose: () => void;
};

export default memo(function Search({ items, isOpen, onClose }: SearchProps) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchItem[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const resultsRef = useRef<HTMLDivElement>(null);

	const fuse = useRef(
		new Fuse(items, {
			keys: [
				{ name: "title", weight: 2 },
				{ name: "summary", weight: 1 },
				{ name: "tags", weight: 1.5 },
			],
			threshold: 0.3,
			includeScore: true,
		}),
	);

	// Update fuse index when items change
	useEffect(() => {
		fuse.current = new Fuse(items, {
			keys: [
				{ name: "title", weight: 2 },
				{ name: "summary", weight: 1 },
				{ name: "tags", weight: 1.5 },
			],
			threshold: 0.3,
			includeScore: true,
		});
	}, [items]);

	// Focus input when opened
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
			setQuery("");
			setResults([]);
			setSelectedIndex(0);
		}
	}, [isOpen]);

	// Handle search
	useEffect(() => {
		if (!query.trim()) {
			setResults([]);
			setSelectedIndex(0);
			return;
		}

		const searchResults = fuse.current.search(query).slice(0, 8);
		setResults(searchResults.map((r) => r.item));
		setSelectedIndex(0);
	}, [query]);

	// Scroll selected item into view
	useEffect(() => {
		if (resultsRef.current && results.length > 0) {
			const selectedElement = resultsRef.current.children[
				selectedIndex
			] as HTMLElement;
			if (selectedElement) {
				selectedElement.scrollIntoView({ block: "nearest" });
			}
		}
	}, [selectedIndex, results.length]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault();
					setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
					break;
				case "ArrowUp":
					e.preventDefault();
					setSelectedIndex((i) => Math.max(i - 1, 0));
					break;
				case "Enter":
					e.preventDefault();
					if (results[selectedIndex]) {
						const item = results[selectedIndex];
						const path =
							item.type === "blog"
								? `/blog/${item.slug}`
								: `/projects/${item.slug}`;
						window.location.href = path;
					}
					break;
				case "Escape":
					e.preventDefault();
					onClose();
					break;
			}
		},
		[results, selectedIndex, onClose],
	);

	if (!isOpen) return null;

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: Escape key handled in input
		// biome-ignore lint/a11y/noStaticElementInteractions: Backdrop click to close
		<div className="search-overlay" onClick={onClose}>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape key handled in input */}
			<div
				className="search-modal"
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-label="Search"
			>
				<div className="search-input-wrapper">
					<svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
					</svg>
					<input
						ref={inputRef}
						type="text"
						className="search-input"
						placeholder="Search posts and projects..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleKeyDown}
						aria-label="Search"
						autoComplete="off"
					/>
					<kbd className="search-kbd">ESC</kbd>
				</div>

				{results.length > 0 && (
					<div className="search-results" ref={resultsRef}>
						{results.map((item, index) => (
							<a
								key={`${item.type}-${item.slug}`}
								href={
									item.type === "blog"
										? `/blog/${item.slug}`
										: `/projects/${item.slug}`
								}
								className={`search-result ${index === selectedIndex ? "search-result-selected" : ""}`}
								onMouseEnter={() => setSelectedIndex(index)}
							>
								<span className="search-result-type">
									{item.type === "blog" ? "📝" : "🚀"}
								</span>
								<div className="search-result-content">
									<span className="search-result-title">{item.title}</span>
									<span className="search-result-summary">
										{item.summary.slice(0, 100)}
										{item.summary.length > 100 ? "..." : ""}
									</span>
								</div>
							</a>
						))}
					</div>
				)}

				{query && results.length === 0 && (
					<div className="search-empty">No results found for "{query}"</div>
				)}

				<div className="search-footer">
					<span>
						<kbd>↑</kbd> <kbd>↓</kbd> to navigate
					</span>
					<span>
						<kbd>↵</kbd> to select
					</span>
					<span>
						<kbd>esc</kbd> to close
					</span>
				</div>
			</div>
		</div>
	);
});
