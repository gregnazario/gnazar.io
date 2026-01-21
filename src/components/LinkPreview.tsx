import { useEffect, useRef, useState } from "react";

interface PreviewData {
	title: string;
	description: string;
	image?: string;
	url: string;
}

// Cache for preview data
const previewCache = new Map<string, PreviewData | null>();

/**
 * Component that adds hover previews to external links
 * Shows a tooltip with title and description
 */
export default function LinkPreview() {
	const [preview, setPreview] = useState<PreviewData | null>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [visible, setVisible] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const currentLinkRef = useRef<HTMLAnchorElement | null>(null);

	useEffect(() => {
		const handleMouseEnter = (e: Event) => {
			const mouseEvent = e as MouseEvent;
			const target = mouseEvent.target as HTMLElement;
			const link = target.closest("a") as HTMLAnchorElement | null;

			if (!link) return;

			const href = link.href;

			// Only show preview for external links
			if (!href.startsWith("http") || href.includes(window.location.hostname)) {
				return;
			}

			// Skip links that already have preview disabled
			if (link.dataset.noPreview === "true") {
				return;
			}

			currentLinkRef.current = link;

			// Delay before showing preview
			timeoutRef.current = setTimeout(() => {
				// Check cache first
				if (previewCache.has(href)) {
					const cached = previewCache.get(href);
					if (cached) {
						setPreview(cached);
						updatePosition(link);
						setVisible(true);
					}
					return;
				}

				// For now, create a simple preview from the link text and URL
				// In production, you'd fetch Open Graph data from a server endpoint
				const data: PreviewData = {
					title: link.textContent || new URL(href).hostname,
					description: `Visit ${new URL(href).hostname}`,
					url: href,
				};

				previewCache.set(href, data);
				setPreview(data);
				updatePosition(link);
				setVisible(true);
			}, 500);
		};

		const handleMouseLeave = (e: Event) => {
			const mouseEvent = e as MouseEvent;
			const target = mouseEvent.target as HTMLElement;
			const relatedTarget = mouseEvent.relatedTarget as HTMLElement | null;

			// Check if we're moving to the preview tooltip
			if (relatedTarget?.closest(".link-preview-tooltip")) {
				return;
			}

			if (target.closest("a") === currentLinkRef.current) {
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
				}
				setVisible(false);
				currentLinkRef.current = null;
			}
		};

		const updatePosition = (link: HTMLAnchorElement) => {
			const rect = link.getBoundingClientRect();
			const scrollY = window.scrollY;

			setPosition({
				x: rect.left + rect.width / 2,
				y: rect.top + scrollY - 10,
			});
		};

		// Add listeners to prose content
		const proseContent = document.querySelector(".prose");
		if (proseContent) {
			proseContent.addEventListener("mouseenter", handleMouseEnter, true);
			proseContent.addEventListener("mouseleave", handleMouseLeave, true);
		}

		return () => {
			if (proseContent) {
				proseContent.removeEventListener("mouseenter", handleMouseEnter, true);
				proseContent.removeEventListener("mouseleave", handleMouseLeave, true);
			}
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleTooltipLeave = () => {
		setVisible(false);
		currentLinkRef.current = null;
	};

	if (!visible || !preview) {
		return null;
	}

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: tooltip uses mouse events for UX
		<div
			className="link-preview-tooltip"
			style={{
				position: "absolute",
				left: `${position.x}px`,
				top: `${position.y}px`,
				transform: "translate(-50%, -100%)",
			}}
			onMouseLeave={handleTooltipLeave}
		>
			<div className="link-preview-content">
				<div className="link-preview-title">{preview.title}</div>
				<div className="link-preview-description">{preview.description}</div>
				<div className="link-preview-url">{new URL(preview.url).hostname}</div>
			</div>
		</div>
	);
}
