import { useEffect } from "react";

/**
 * Component that adds line numbers to code blocks
 * Should be included once in the blog post component
 */
export default function CodeLineNumbers() {
	useEffect(() => {
		// Find all code blocks
		const codeBlocks = document.querySelectorAll("pre > code");

		for (const code of codeBlocks) {
			const pre = code.parentElement;
			if (!pre) continue;

			// Skip if already has line numbers
			if (pre.classList.contains("has-line-numbers")) continue;

			// Get code content and split into lines
			const content = code.textContent || "";
			const lines = content.split("\n");

			// Skip if only one line or empty
			if (lines.length <= 1) continue;

			// Remove trailing empty line (common in code blocks)
			if (lines[lines.length - 1] === "") {
				lines.pop();
			}

			// Create line numbers element
			const lineNumbers = document.createElement("div");
			lineNumbers.className = "line-numbers";
			lineNumbers.setAttribute("aria-hidden", "true");

			for (let i = 1; i <= lines.length; i++) {
				const lineNumber = document.createElement("span");
				lineNumber.className = "line-number";
				lineNumber.textContent = i.toString();
				lineNumbers.appendChild(lineNumber);
			}

			// Mark pre as having line numbers
			pre.classList.add("has-line-numbers");
			pre.insertBefore(lineNumbers, pre.firstChild);
		}
	}, []);

	return null;
}
