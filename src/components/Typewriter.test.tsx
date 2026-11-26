import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Typewriter from "./Typewriter";

const TEXT = "Designing dependable platforms";

/** The typed text so far, without the caret that follows it. */
function typed(container: HTMLElement): string {
	const overlay = container.querySelector(".typewriter-overlay");
	return (overlay?.textContent ?? "").replaceAll("█", "");
}

describe("Typewriter", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("starts blank so text is never shown and then erased", () => {
		const { container } = render(<Typewriter text={TEXT} />);
		expect(typed(container)).toBe("");
	});

	it("keeps the full text in the document for no-script visitors", () => {
		const { container } = render(<Typewriter text={TEXT} />);
		expect(container.querySelector(".typewriter-base")?.textContent).toBe(TEXT);
	});

	it("types the text in once and then marks itself done", () => {
		const { container } = render(<Typewriter text={TEXT} speed={10} />);
		act(() => {
			vi.advanceTimersByTime(45);
		});
		expect(typed(container).length).toBeGreaterThan(1);
		expect(typed(container)).not.toContain(TEXT.slice(-4));
		act(() => {
			vi.advanceTimersByTime(TEXT.length * 10);
		});
		expect(typed(container)).toContain(TEXT);
		expect(container.querySelector(".typewriter")).toHaveAttribute(
			"data-done",
			"true",
		);
	});

	it("renders the caret right after the typed text", () => {
		const { container } = render(<Typewriter text={TEXT} speed={10} />);
		act(() => {
			vi.advanceTimersByTime(40);
		});
		const overlay = container.querySelector(".typewriter-overlay");
		expect(overlay?.querySelector(".typewriter-cursor")).not.toBeNull();
		expect(overlay?.textContent).toMatch(/^[A-Za-z ]{1,8}█$/);
	});

	it("starts over when its text changes", () => {
		const { container, rerender } = render(
			<Typewriter text="Old sentence" speed={10} />,
		);
		act(() => {
			vi.advanceTimersByTime(500);
		});
		expect(typed(container)).toContain("Old sentence");

		rerender(<Typewriter text="New sentence" speed={10} />);
		// The old sentence must not linger on top of the new one
		expect(typed(container)).toBe("");

		act(() => {
			vi.advanceTimersByTime(500);
		});
		expect(typed(container)).toContain("New sentence");
	});

	it("shows the whole text at once when motion is reduced", () => {
		vi.mocked(window.matchMedia).mockImplementation(
			(query: string) =>
				({
					matches: true,
					media: query,
					addEventListener: vi.fn(),
					removeEventListener: vi.fn(),
				}) as unknown as MediaQueryList,
		);
		const { container } = render(<Typewriter text={TEXT} />);
		expect(container.querySelector(".typewriter")).toHaveAttribute(
			"data-done",
			"true",
		);
		expect(typed(container)).toContain(TEXT);
	});
});
