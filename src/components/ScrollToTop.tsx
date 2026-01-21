import { useEffect, useState } from "react";

/**
 * Scroll to top button that appears after scrolling down
 */
export default function ScrollToTop() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// Show button after scrolling 400px
			setVisible(window.scrollY > 400);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	if (!visible) {
		return null;
	}

	return (
		<button
			type="button"
			className="scroll-to-top"
			onClick={scrollToTop}
			aria-label="Scroll to top"
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				aria-hidden="true"
			>
				<path d="M18 15l-6-6-6 6" />
			</svg>
		</button>
	);
}
