import { useEffect, useState } from "react";

/**
 * Component that adds anchor links to headings
 * Shows a link icon on hover that copies the heading URL
 */
export default function HeadingAnchors() {
	const [copiedId, setCopiedId] = useState<string | null>(null);

	useEffect(() => {
		// Find all headings with IDs in prose content
		const headings = document.querySelectorAll(
			".prose h1[id], .prose h2[id], .prose h3[id], .prose h4[id], .prose h5[id], .prose h6[id]",
		);

		for (const heading of headings) {
			// Skip if already has anchor
			if (heading.querySelector(".heading-anchor")) continue;

			const id = heading.getAttribute("id");
			if (!id) continue;

			// Create anchor link
			const anchor = document.createElement("a");
			anchor.href = `#${id}`;
			anchor.className = "heading-anchor";
			anchor.setAttribute("aria-label", `Link to ${heading.textContent}`);
			anchor.innerHTML = `
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
					<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
				</svg>
			`;

			// Handle click to copy
			anchor.addEventListener("click", async (e) => {
				e.preventDefault();
				const url = `${window.location.origin}${window.location.pathname}#${id}`;

				try {
					await navigator.clipboard.writeText(url);
					setCopiedId(id);
					setTimeout(() => setCopiedId(null), 2000);
				} catch {
					// Fallback: just navigate to the anchor
					window.location.hash = id;
				}
			});

			// Make heading position relative for anchor positioning
			(heading as HTMLElement).style.position = "relative";
			heading.insertBefore(anchor, heading.firstChild);
		}
	}, []);

	// Show toast when copied
	useEffect(() => {
		if (!copiedId) return;

		// Create or update toast
		let toast = document.querySelector(".anchor-toast");
		if (!toast) {
			toast = document.createElement("div");
			toast.className = "anchor-toast";
			document.body.appendChild(toast);
		}

		toast.textContent = "Link copied!";
		toast.classList.add("visible");

		const timer = setTimeout(() => {
			toast?.classList.remove("visible");
		}, 2000);

		return () => clearTimeout(timer);
	}, [copiedId]);

	return null;
}
