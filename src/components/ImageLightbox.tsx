import { memo, useCallback, useEffect, useState } from "react";

type ImageLightboxProps = {
	containerSelector?: string;
};

export default memo(function ImageLightbox({
	containerSelector = ".prose",
}: ImageLightboxProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentSrc, setCurrentSrc] = useState("");
	const [currentAlt, setCurrentAlt] = useState("");

	const openLightbox = useCallback((src: string, alt: string) => {
		setCurrentSrc(src);
		setCurrentAlt(alt);
		setIsOpen(true);
	}, []);

	const closeLightbox = useCallback(() => {
		setIsOpen(false);
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
		const container = document.querySelector(containerSelector);
		if (!container) return;

		const images = container.querySelectorAll("img");

		const handleClick = (e: Event) => {
			const img = e.currentTarget as HTMLImageElement;
			openLightbox(img.src, img.alt || "");
		};

		for (const img of images) {
			img.style.cursor = "zoom-in";
			img.addEventListener("click", handleClick);
		}

		return () => {
			for (const img of images) {
				img.removeEventListener("click", handleClick);
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
		// biome-ignore lint/a11y/noStaticElementInteractions: Backdrop click to close is intentional UX
		<div
			className="lightbox-overlay"
			onClick={closeLightbox}
			onKeyDown={(e) => e.key === "Escape" && closeLightbox()}
		>
			<button
				type="button"
				className="lightbox-close"
				onClick={closeLightbox}
				aria-label="Close lightbox"
			>
				×
			</button>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: Image is non-interactive, click stops propagation */}
			<img
				src={currentSrc}
				alt={currentAlt}
				className="lightbox-image"
				onClick={(e) => e.stopPropagation()}
			/>
		</div>
	);
});
