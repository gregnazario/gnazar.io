import { useEffect } from "react";

// Track if mermaid has been initialized to avoid re-initialization
let mermaidInitialized = false;

/**
 * Client-side Mermaid diagram renderer
 * Finds code blocks with class "language-mermaid" and renders them as diagrams
 *
 * Usage in markdown:
 * ```mermaid
 * graph TD
 *   A --> B
 * ```
 */
export default function MermaidDiagrams() {
	useEffect(() => {
		const renderDiagrams = async () => {
			// Find all mermaid code blocks that haven't been processed
			const mermaidBlocks = document.querySelectorAll(
				"pre > code.language-mermaid",
			);

			if (mermaidBlocks.length === 0) return;

			// Dynamically import mermaid only on client side
			const mermaid = await import("mermaid");

			// Only initialize once per page load
			if (!mermaidInitialized) {
				mermaid.default.initialize({
					startOnLoad: false,
					theme:
						document.documentElement.dataset.theme === "dark"
							? "dark"
							: "default",
					// Use strict mode for security - disables click events and sanitizes content
					securityLevel: "strict",
				});
				mermaidInitialized = true;
			}

			// Process each mermaid block
			for (const block of mermaidBlocks) {
				const pre = block.parentElement;
				if (!pre || !pre.parentElement) continue;

				// Skip if already processed
				if (pre.dataset.mermaidProcessed) continue;
				pre.dataset.mermaidProcessed = "true";

				try {
					// Create a container with the mermaid class for mermaid.run()
					const container = document.createElement("div");
					container.className = "mermaid mermaid-diagram";
					// Copy the text content - mermaid.run() will handle it safely
					container.textContent = block.textContent;

					// Replace the pre with our container
					pre.parentElement.replaceChild(container, pre);

					// Let mermaid render this specific element
					// mermaid.run() handles the SVG generation and insertion safely
					await mermaid.default.run({
						nodes: [container],
					});
				} catch (error) {
					console.error("Failed to render mermaid diagram:", error);
				}
			}
		};

		renderDiagrams().catch((error) => {
			console.error("Failed to initialize mermaid diagrams:", error);
		});
	}, []);

	return null;
}
