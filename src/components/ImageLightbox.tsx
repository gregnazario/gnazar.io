import { memo, useCallback, useEffect, useRef, useState } from "react";

type ImageLightboxProps = {
	containerSelector?: string;
};

export default memo(function ImageLightbox({
	containerSelector = ".prose",
}: ImageLightboxProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentSrc, setCurrentSrc] = useState("");
	const [currentAlt, setCurrentAlt] = useState("");
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const returnFocusRef = useRef<HTMLElement | null>(null);

	const openLightbox = useCallback((image: HTMLImageElement) => {
		returnFocusRef.current = image;
		setCurrentSrc(image.src);
		setCurrentAlt(image.alt || "");
		setIsOpen(true);
	}, []);

	const closeLightbox = useCallback(() => {
		setIsOpen(false);
		requestAnimationFrame(() => returnFocusRef.current?.focus());
	}, []);

	// Handle body overflow when lightbox is open
	useEffect(() => {
		if (!isOpen) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isOpen]);

	useEffect(() => {
		if (isOpen) {
			closeButtonRef.current?.focus();
		}
	}, [isOpen]);

	useEffect(() => {
		const container = document.querySelector(containerSelector);
		if (!container) return;

		const images = container.querySelectorAll("img");

		const handleClick = (e: Event) => {
			const img = e.currentTarget as HTMLImageElement;
			openLightbox(img);
		};
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				openLightbox(e.currentTarget as HTMLImageElement);
			}
		};
		const previousAttributes = new Map<
			HTMLImageElement,
			{
				ariaHasPopup: string | null;
				ariaLabel: string | null;
				role: string | null;
				tabIndex: number;
			}
		>();

		for (const img of images) {
			previousAttributes.set(img, {
				ariaHasPopup: img.getAttribute("aria-haspopup"),
				ariaLabel: img.getAttribute("aria-label"),
				role: img.getAttribute("role"),
				tabIndex: img.tabIndex,
			});
			img.style.cursor = "zoom-in";
			img.tabIndex = 0;
			img.setAttribute("role", "button");
			img.setAttribute("aria-haspopup", "dialog");
			img.setAttribute(
				"aria-label",
				img.alt ? `Open ${img.alt} in a lightbox` : "Open image in a lightbox",
			);
			img.addEventListener("click", handleClick);
			img.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			for (const img of images) {
				const previous = previousAttributes.get(img);
				if (previous) {
					img.tabIndex = previous.tabIndex;
					for (const [name, value] of Object.entries({
						"aria-haspopup": previous.ariaHasPopup,
						"aria-label": previous.ariaLabel,
						role: previous.role,
					})) {
						if (value === null) img.removeAttribute(name);
						else img.setAttribute(name, value);
					}
				}
				img.removeEventListener("click", handleClick);
				img.removeEventListener("keydown", handleKeyDown);
			}
		};
	}, [containerSelector, openLightbox]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				closeLightbox();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, closeLightbox]);

	if (!isOpen) return null;

	return (
		<div className="lightbox-overlay">
			<button
				type="button"
				className="lightbox-backdrop"
				onClick={closeLightbox}
				aria-label="Close lightbox"
			/>
			<div
				className="lightbox-dialog"
				role="dialog"
				aria-modal="true"
				aria-label={
					currentAlt ? `Expanded image: ${currentAlt}` : "Expanded image"
				}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					if (e.key === "Tab") {
						e.preventDefault();
						closeButtonRef.current?.focus();
					}
				}}
			>
				<button
					ref={closeButtonRef}
					type="button"
					className="lightbox-close"
					onClick={closeLightbox}
					aria-label="Close lightbox"
				>
					×
				</button>
				<img src={currentSrc} alt={currentAlt} className="lightbox-image" />
			</div>
		</div>
	);
});
