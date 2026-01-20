import { useEffect, useRef, useState } from "react";

type AllowedTags =
	| "p"
	| "span"
	| "div"
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6";

type TypewriterProps = {
	text: string;
	as?: AllowedTags;
	className?: string;
	speed?: number;
	delay?: number;
	cursor?: boolean;
	startOnView?: boolean;
};

export default function Typewriter({
	text,
	as = "p",
	className,
	speed = 16,
	delay = 0,
	cursor = true,
	startOnView = true,
}: TypewriterProps) {
	const Tag = as;
	const ref = useRef<HTMLElement>(null);
	const [shouldType, setShouldType] = useState(!startOnView);
	const [displayText, setDisplayText] = useState(text);
	const [isTyping, setIsTyping] = useState(false);
	const [done, setDone] = useState(false);
	const [reduceMotion, setReduceMotion] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReduceMotion(media.matches);
		update();

		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);

	useEffect(() => {
		if (!startOnView || reduceMotion) {
			setShouldType(true);
			return;
		}

		const element = ref.current;
		if (!element) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShouldType(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, [startOnView, reduceMotion]);

	useEffect(() => {
		if (!shouldType || done) {
			return;
		}

		if (reduceMotion) {
			setDisplayText(text);
			setDone(true);
			setIsTyping(false);
			return;
		}

		let index = 0;
		let interval: number | undefined;

		const start = window.setTimeout(() => {
			index = 1;
			setIsTyping(true);
			setDisplayText(text.slice(0, index));
			interval = window.setInterval(() => {
				index += 1;
				setDisplayText(text.slice(0, index));
				if (index >= text.length) {
					if (interval) {
						window.clearInterval(interval);
					}
					setDone(true);
					setIsTyping(false);
				}
			}, speed);
		}, delay);

		return () => {
			window.clearTimeout(start);
			if (interval) {
				window.clearInterval(interval);
			}
		};
	}, [shouldType, text, speed, delay, reduceMotion, done]);

	return (
		<Tag
			ref={ref as React.RefObject<never>}
			className={["typewriter", className].filter(Boolean).join(" ")}
			data-typing={isTyping ? "true" : "false"}
			data-done={done ? "true" : "false"}
		>
			<span className="typewriter-base">{text}</span>
			<span className="typewriter-overlay" aria-hidden>
				{displayText}
			</span>
			{cursor ? (
				<span className="typewriter-cursor" aria-hidden>
					█
				</span>
			) : null}
		</Tag>
	);
}
