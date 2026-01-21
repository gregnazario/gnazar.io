import { memo, useState } from "react";

import { siteConfig } from "@/lib/site";

type ShareButtonsProps = {
	title: string;
	slug: string;
	type?: "blog" | "projects";
};

export default memo(function ShareButtons({
	title,
	slug,
	type = "blog",
}: ShareButtonsProps) {
	const [copied, setCopied] = useState(false);
	const url = `${siteConfig.url}/${type}/${slug}`;
	const encodedUrl = encodeURIComponent(url);
	const encodedTitle = encodeURIComponent(title);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Fallback for older browsers
			let textArea: HTMLTextAreaElement | null = null;
			try {
				textArea = document.createElement("textarea");
				textArea.value = url;
				textArea.style.position = "fixed";
				textArea.style.opacity = "0";
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand("copy");
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} catch {
				// If both methods fail, show an alert
				if (typeof window !== "undefined") {
					window.alert(
						"Unable to copy the link. Please copy it manually from the address bar.",
					);
				}
			} finally {
				if (textArea && document.body.contains(textArea)) {
					document.body.removeChild(textArea);
				}
			}
		}
	};

	return (
		<div className="share-buttons">
			<span className="share-label">Share:</span>
			{/* biome-ignore lint/a11y/useAnchorContent: aria-label provides accessible name */}
			<a
				href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
				target="_blank"
				rel="noopener noreferrer"
				className="share-button"
				aria-label="Share on Twitter"
				title="Share on Twitter"
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" className="share-icon">
					<path d="M18.9 2H22l-7.2 8.24L23.5 22h-6.7l-5.2-6.84L5.9 22H2.8l7.7-8.8L0.5 2h6.9l4.7 6.2L18.9 2Zm-1.2 18h1.9L7.3 3.8H5.3L17.7 20Z" />
				</svg>
			</a>
			{/* biome-ignore lint/a11y/useAnchorContent: aria-label provides accessible name */}
			<a
				href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
				target="_blank"
				rel="noopener noreferrer"
				className="share-button"
				aria-label="Share on LinkedIn"
				title="Share on LinkedIn"
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" className="share-icon">
					<path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM0.5 8h4V23h-4V8Zm7.5 0h3.8v2.05h.06c.53-1 1.82-2.05 3.74-2.05 4 0 4.74 2.64 4.74 6.08V23h-4v-6.74c0-1.61-.03-3.68-2.24-3.68-2.24 0-2.58 1.75-2.58 3.56V23h-4V8Z" />
				</svg>
			</a>
			<button
				type="button"
				onClick={handleCopy}
				className="share-button"
				aria-label={copied ? "Link copied!" : "Copy link"}
				title={copied ? "Link copied!" : "Copy link"}
			>
				{copied ? (
					<svg viewBox="0 0 24 24" aria-hidden="true" className="share-icon">
						<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
					</svg>
				) : (
					<svg viewBox="0 0 24 24" aria-hidden="true" className="share-icon">
						<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
					</svg>
				)}
			</button>
		</div>
	);
});
