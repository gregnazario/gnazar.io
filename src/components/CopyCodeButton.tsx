import { useEffect, useRef } from "react";

/**
 * Component that adds copy buttons to all code blocks on the page
 * Should be included once in the layout or blog post component
 */
export default function CopyCodeButton() {
	const wrappersRef = useRef<HTMLDivElement[]>([]);
	const buttonsRef = useRef<HTMLButtonElement[]>([]);

	useEffect(() => {
		// Find all pre elements (code blocks)
		const codeBlocks = document.querySelectorAll("pre");
		const addedWrappers: HTMLDivElement[] = [];
		const addedButtons: HTMLButtonElement[] = [];

		for (const pre of codeBlocks) {
			// Skip if already has a copy button
			if (pre.querySelector(".copy-code-button")) continue;

			// Create wrapper if needed
			if (!pre.parentElement?.classList.contains("code-block-wrapper")) {
				const wrapper = document.createElement("div");
				wrapper.className = "code-block-wrapper";
				pre.parentElement?.insertBefore(wrapper, pre);
				wrapper.appendChild(pre);
				addedWrappers.push(wrapper);
			}

			// Create copy button
			const button = document.createElement("button");
			button.className = "copy-code-button";
			button.type = "button";
			button.setAttribute("aria-label", "Copy code");
			button.innerHTML = `
				<svg class="copy-icon" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
				</svg>
				<svg class="check-icon" viewBox="0 0 24 24" aria-hidden="true" style="display:none">
					<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
				</svg>
			`;

			button.addEventListener("click", async () => {
				const code =
					pre.querySelector("code")?.textContent || pre.textContent || "";

				try {
					await navigator.clipboard.writeText(code);

					// Show success state
					const copyIcon = button.querySelector(".copy-icon") as HTMLElement;
					const checkIcon = button.querySelector(".check-icon") as HTMLElement;

					if (copyIcon && checkIcon) {
						copyIcon.style.display = "none";
						checkIcon.style.display = "block";
						button.classList.add("copied");

						setTimeout(() => {
							copyIcon.style.display = "block";
							checkIcon.style.display = "none";
							button.classList.remove("copied");
						}, 2000);
					}
				} catch {
					// Fallback for older browsers
					const textArea = document.createElement("textarea");
					textArea.value = code;
					textArea.style.position = "fixed";
					textArea.style.opacity = "0";
					document.body.appendChild(textArea);
					textArea.select();
					document.execCommand("copy");
					document.body.removeChild(textArea);
				}
			});

			pre.parentElement?.appendChild(button);
			addedButtons.push(button);
		}

		// Store refs for cleanup
		wrappersRef.current = addedWrappers;
		buttonsRef.current = addedButtons;

		// Cleanup function to remove added DOM elements
		return () => {
			for (const button of buttonsRef.current) {
				button.remove();
			}
			for (const wrapper of wrappersRef.current) {
				// Move pre back out of wrapper before removing wrapper
				const pre = wrapper.querySelector("pre");
				if (pre && wrapper.parentElement) {
					wrapper.parentElement.insertBefore(pre, wrapper);
					wrapper.remove();
				}
			}
		};
	}, []);

	return null;
}
