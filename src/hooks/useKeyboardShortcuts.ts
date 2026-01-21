import { useEffect } from "react";

type KeyboardShortcuts = {
	onSearch?: () => void;
	onNextPost?: () => void;
	onPrevPost?: () => void;
};

export function useKeyboardShortcuts({
	onSearch,
	onNextPost,
	onPrevPost,
}: KeyboardShortcuts) {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Ignore if user is typing in an input/textarea
			const target = e.target as HTMLElement;
			if (
				target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.isContentEditable
			) {
				return;
			}

			// "/" or "Cmd+K" / "Ctrl+K" to open search
			if (
				(e.key === "/" && !e.metaKey && !e.ctrlKey) ||
				((e.metaKey || e.ctrlKey) && e.key === "k")
			) {
				e.preventDefault();
				onSearch?.();
				return;
			}

			// "j" for next post (vim-style)
			if (e.key === "j" && !e.metaKey && !e.ctrlKey && !e.altKey) {
				e.preventDefault();
				onNextPost?.();
				return;
			}

			// "k" for previous post (vim-style)
			if (e.key === "k" && !e.metaKey && !e.ctrlKey && !e.altKey) {
				e.preventDefault();
				onPrevPost?.();
				return;
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onSearch, onNextPost, onPrevPost]);
}
