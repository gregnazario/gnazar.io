import { useEffect } from "react";

import { stripHtmlTags } from "@/lib/html-utils";

/**
 * Component that adds diff-style highlighting to code blocks
 *
 * Supports:
 * - Lines starting with + are highlighted green (additions)
 * - Lines starting with - are highlighted red (deletions)
 * - Works with language-diff code blocks automatically
 * - Can also be triggered with data-diff="true" attribute
 */
export default function DiffHighlight() {
	useEffect(() => {
		// Find diff code blocks
		const codeBlocks = document.querySelectorAll(
			'pre > code.language-diff, pre[data-diff="true"] > code',
		);

		for (const code of codeBlocks) {
			const pre = code.parentElement;
			if (!pre) continue;

			// Skip if already processed
			if (pre.dataset.diffProcessed === "true") continue;
			pre.dataset.diffProcessed = "true";

			// Get content and process
			const content = code.innerHTML;
			const lines = content.split("\n");

			// Remove trailing empty line
			if (lines[lines.length - 1] === "") {
				lines.pop();
			}

			// Process each line
			const processedLines = lines.map((line) => {
				// Check the actual text content (strip HTML tags for checking)
				const textContent = stripHtmlTags(line);

				if (textContent.startsWith("+") && !textContent.startsWith("+++")) {
					return `<span class="diff-line diff-add">${line}</span>`;
				}
				if (textContent.startsWith("-") && !textContent.startsWith("---")) {
					return `<span class="diff-line diff-remove">${line}</span>`;
				}
				if (textContent.startsWith("@@")) {
					return `<span class="diff-line diff-info">${line}</span>`;
				}
				return `<span class="diff-line">${line}</span>`;
			});

			code.innerHTML = processedLines.join("\n");
			pre.classList.add("has-diff-highlight");
		}
	}, []);

	return null;
}
