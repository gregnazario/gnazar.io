import { useState } from "react";

import { useReadingHistory } from "@/hooks/useReadingHistory";

interface ExportReadingListProps {
	className?: string;
}

export default function ExportReadingList({
	className = "",
}: ExportReadingListProps) {
	const { history } = useReadingHistory();
	const [copied, setCopied] = useState(false);

	const exportAsMarkdown = () => {
		if (history.length === 0) {
			alert("No reading history to export.");
			return;
		}

		const lines = [
			"# Reading History",
			"",
			`Exported on ${new Date().toLocaleDateString()}`,
			"",
			"## Posts Read",
			"",
		];

		const sortedHistory = [...history].sort(
			(a, b) =>
				new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime(),
		);

		for (const entry of sortedHistory) {
			const date = new Date(entry.visitedAt).toLocaleDateString();
			lines.push(`- [${entry.slug}](/blog/${entry.slug}) - Read on ${date}`);
		}

		const content = lines.join("\n");
		downloadFile(content, "reading-history.md", "text/markdown");
	};

	const exportAsJson = () => {
		if (history.length === 0) {
			alert("No reading history to export.");
			return;
		}

		const data = {
			exportedAt: new Date().toISOString(),
			totalPosts: history.length,
			history: history.map((entry) => ({
				slug: entry.slug,
				url: `/blog/${entry.slug}`,
				visitedAt: entry.visitedAt,
			})),
		};

		const content = JSON.stringify(data, null, 2);
		downloadFile(content, "reading-history.json", "application/json");
	};

	const copyToClipboard = async () => {
		if (history.length === 0) {
			alert("No reading history to export.");
			return;
		}

		const lines = history.map((entry) => {
			const date = new Date(entry.visitedAt).toLocaleDateString();
			return `${entry.slug} (${date})`;
		});

		try {
			await navigator.clipboard.writeText(lines.join("\n"));
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Fallback for older browsers
			const textarea = document.createElement("textarea");
			textarea.value = lines.join("\n");
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			document.body.removeChild(textarea);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	const clearHistory = () => {
		if (
			history.length > 0 &&
			window.confirm("Are you sure you want to clear your reading history?")
		) {
			localStorage.removeItem("reading-history");
			window.location.reload();
		}
	};

	return (
		<div className={`export-reading-list ${className}`}>
			<h3 className="export-title">Reading History</h3>
			<p className="export-count">
				{history.length} post{history.length !== 1 ? "s" : ""} read
			</p>
			<div className="export-actions">
				<button
					type="button"
					className="button ghost small"
					onClick={exportAsMarkdown}
					disabled={history.length === 0}
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						aria-hidden="true"
					>
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
						<polyline points="14,2 14,8 20,8" />
						<line x1="16" y1="13" x2="8" y2="13" />
						<line x1="16" y1="17" x2="8" y2="17" />
						<polyline points="10,9 9,9 8,9" />
					</svg>
					Export MD
				</button>
				<button
					type="button"
					className="button ghost small"
					onClick={exportAsJson}
					disabled={history.length === 0}
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						aria-hidden="true"
					>
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
						<polyline points="14,2 14,8 20,8" />
						<line x1="16" y1="13" x2="8" y2="13" />
						<line x1="16" y1="17" x2="8" y2="17" />
					</svg>
					Export JSON
				</button>
				<button
					type="button"
					className="button ghost small"
					onClick={copyToClipboard}
					disabled={history.length === 0}
				>
					{copied ? (
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							<polyline points="20,6 9,17 4,12" />
						</svg>
					) : (
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
						</svg>
					)}
					{copied ? "Copied!" : "Copy"}
				</button>
				<button
					type="button"
					className="button ghost small danger"
					onClick={clearHistory}
					disabled={history.length === 0}
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						aria-hidden="true"
					>
						<polyline points="3,6 5,6 21,6" />
						<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
					</svg>
					Clear
				</button>
			</div>
		</div>
	);
}

function downloadFile(content: string, filename: string, mimeType: string) {
	const blob = new Blob([content], { type: mimeType });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
