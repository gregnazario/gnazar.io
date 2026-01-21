import { useEffect } from "react";

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

			mermaid.default.initialize({
				startOnLoad: false,
				theme:
					document.documentElement.dataset.theme === "dark"
						? "dark"
						: "default",
				securityLevel: "loose",
			});

			for (const block of mermaidBlocks) {
				const pre = block.parentElement;
				if (!pre) continue;

				// Skip if already rendered
				if (pre.dataset.mermaidRendered === "true") continue;

				const code = block.textContent || "";

				try {
					// Create a container for the diagram
					const container = document.createElement("div");
					container.className = "mermaid-diagram";

					// Generate unique ID
					const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;

					// Render the diagram
					const { svg } = await mermaid.default.render(id, code);
					container.innerHTML = svg;

					// Replace the pre element with the rendered diagram
					pre.parentElement?.replaceChild(container, pre);
				} catch (error) {
					console.error("Failed to render mermaid diagram:", error);
					// Keep the code block visible on error
					pre.dataset.mermaidRendered = "error";
				}
			}
		};

		renderDiagrams();
	}, []);

	return null;
}
