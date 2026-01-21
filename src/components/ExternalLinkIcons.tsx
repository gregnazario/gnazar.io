import { useEffect } from "react";

/**
 * Component that adds external link icons to all external links in prose content
 * Should be included once in the blog post component
 */
export default function ExternalLinkIcons() {
	useEffect(() => {
		// Find all links in prose content
		const proseLinks = document.querySelectorAll(".prose a[href]");

		for (const link of proseLinks) {
			const href = link.getAttribute("href");
			if (!href) continue;

			// Skip internal links, anchors, and mailto/tel
			if (
				href.startsWith("/") ||
				href.startsWith("#") ||
				href.startsWith("mailto:") ||
				href.startsWith("tel:") ||
				href.startsWith(window.location.origin)
			) {
				continue;
			}

			// Skip if already has an icon
			if (link.querySelector(".external-link-icon")) continue;

			// Skip if link contains only an image
			if (link.querySelector("img") && link.textContent?.trim() === "") {
				continue;
			}

			// Add external link attributes if not present
			if (!link.hasAttribute("target")) {
				link.setAttribute("target", "_blank");
			}
			if (!link.hasAttribute("rel")) {
				link.setAttribute("rel", "noopener noreferrer");
			}

			// Add class for styling
			link.classList.add("external-link");

			// Create icon
			const icon = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"svg",
			);
			icon.setAttribute("class", "external-link-icon");
			icon.setAttribute("viewBox", "0 0 24 24");
			icon.setAttribute("aria-hidden", "true");
			icon.innerHTML = `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>`;

			link.appendChild(icon);
		}
	}, []);

	return null;
}
