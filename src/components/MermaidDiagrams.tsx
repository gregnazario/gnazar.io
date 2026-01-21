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
		// Dynamically import mermaid only on client side
		const renderDiagrams = async () => {
			const mermaidBlocks = document.querySelectorAll(
				"pre > code.language-mermaid",
			);

			if (mermaidBlocks.length === 0) return;

			// Dynamically import mermaid
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
					// This is appropriate for static blog content we control
					securityLevel: "strict",
				});
				mermaidInitialized = true;
			}

			for (const block of mermaidBlocks) {
				const pre = block.parentElement;
				if (!pre) continue;

				// Skip if already rendered or errored
				if (pre.dataset.mermaidRendered) continue;

				const code = block.textContent || "";

				try {
					// Create a container for the diagram
					const container = document.createElement("div");
					container.className = "mermaid-diagram";

					// Generate unique ID using crypto for security
					const id = `mermaid-${crypto.randomUUID().slice(0, 8)}`;

					// Render the diagram
					const { svg } = await mermaid.default.render(id, code);

					// Safely parse and insert the SVG using DOMParser
					// This is safer than innerHTML as it properly parses the SVG
					const parser = new DOMParser();
					const svgDoc = parser.parseFromString(svg, "image/svg+xml");
					const svgElement = svgDoc.documentElement;

					// Check for parsing errors
					const parserError = svgDoc.querySelector("parsererror");
					if (parserError || svgElement.tagName !== "svg") {
						throw new Error("Invalid SVG output from mermaid");
					}

					container.appendChild(document.importNode(svgElement, true));

					// Replace the pre element with the rendered diagram
					pre.parentElement?.replaceChild(container, pre);
				} catch (error) {
					console.error("Failed to render mermaid diagram:", error);
					// Mark as errored to avoid retry loops
					pre.dataset.mermaidRendered = "error";
				}
			}
		};

		renderDiagrams().catch((error) => {
			console.error("Failed to initialize mermaid diagrams:", error);
		});
	}, []);

	return null;
}
