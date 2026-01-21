import { useEffect } from "react";

/**
 * Component that enables line highlighting in code blocks
 *
 * Usage in markdown:
 * ```javascript {1,3-5}
 * // Line 1 will be highlighted
 * // Line 2 normal
 * // Lines 3-5 highlighted
 * ```
 *
 * Or use data-line attribute on code element
 */
export default function CodeHighlightLines() {
	useEffect(() => {
		// Find all code blocks
		const codeBlocks = document.querySelectorAll("pre > code");

		for (const code of codeBlocks) {
			const pre = code.parentElement;
			if (!pre) continue;

			// Skip if already processed
			if (pre.dataset.highlightProcessed === "true") continue;
			pre.dataset.highlightProcessed = "true";

			// Check for highlight info in various places
			let highlightLines: number[] = [];

			// Check data-line attribute
			const dataLine =
				code.getAttribute("data-line") || pre.getAttribute("data-line");
			if (dataLine) {
				highlightLines = parseLineNumbers(dataLine);
			}

			// Check for {lines} in class name (e.g., language-js{1,3-5})
			const className = code.className || "";
			const lineMatch = className.match(/\{([^}]+)\}/);
			if (lineMatch) {
				highlightLines = parseLineNumbers(lineMatch[1]);
			}

			// Check for metastring (some markdown processors add this)
			const metastring = code.getAttribute("metastring");
			if (metastring) {
				const metaMatch = metastring.match(/\{([^}]+)\}/);
				if (metaMatch) {
					highlightLines = parseLineNumbers(metaMatch[1]);
				}
			}

			if (highlightLines.length === 0) continue;

			// Get code content and split into lines
			const content = code.innerHTML;
			const lines = content.split("\n");

			// Remove trailing empty line
			if (lines[lines.length - 1] === "") {
				lines.pop();
			}

			// Wrap each line in a span
			const wrappedLines = lines.map((line, index) => {
				const lineNumber = index + 1;
				const isHighlighted = highlightLines.includes(lineNumber);
				const lineClass = isHighlighted ? "code-line highlighted" : "code-line";
				return `<span class="${lineClass}">${line}</span>`;
			});

			code.innerHTML = wrappedLines.join("\n");
			pre.classList.add("has-line-highlights");
		}
	}, []);

	return null;
}

/**
 * Parse line numbers from a string like "1,3-5,7"
 * Returns an array of individual line numbers
 */
function parseLineNumbers(str: string): number[] {
	const lines: number[] = [];
	const parts = str.split(",");

	for (const part of parts) {
		const trimmed = part.trim();
		if (trimmed.includes("-")) {
			const [start, end] = trimmed
				.split("-")
				.map((n) => Number.parseInt(n.trim(), 10));
			if (!Number.isNaN(start) && !Number.isNaN(end)) {
				for (let i = start; i <= end; i++) {
					lines.push(i);
				}
			}
		} else {
			const num = Number.parseInt(trimmed, 10);
			if (!Number.isNaN(num)) {
				lines.push(num);
			}
		}
	}

	return lines;
}
