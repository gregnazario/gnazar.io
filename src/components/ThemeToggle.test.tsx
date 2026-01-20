import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
	beforeEach(() => {
		// Reset document theme
		document.documentElement.dataset.theme = undefined;
		// Clear localStorage
		localStorage.clear();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("renders a button", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("has accessible label", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("aria-label");
		expect(button.getAttribute("aria-label")).toMatch(/switch to .* mode/i);
	});

	it("toggles theme on click", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button");

		// Initial state should be light
		expect(button.getAttribute("aria-label")).toContain("dark");

		// Click to toggle to dark
		fireEvent.click(button);
		expect(document.documentElement.dataset.theme).toBe("dark");
		expect(button.getAttribute("aria-label")).toContain("light");

		// Click to toggle back to light
		fireEvent.click(button);
		expect(document.documentElement.dataset.theme).toBe("light");
	});

	it("persists theme to localStorage", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button");

		fireEvent.click(button);
		expect(localStorage.getItem("theme")).toBe("dark");

		fireEvent.click(button);
		expect(localStorage.getItem("theme")).toBe("light");
	});

	it("has theme-toggle class", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("theme-toggle");
	});
});
